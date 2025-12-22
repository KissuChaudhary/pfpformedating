'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Loader2, Camera, Sparkles } from 'lucide-react';

const GENDERS = ['Female', 'Male', 'Non-Binary'] as const;
type Gender = typeof GENDERS[number];

export default function CreateModelPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [gender, setGender] = useState<Gender>('Female');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const newFiles = Array.from(e.target.files);
        const remainingSlots = 4 - images.length;
        const filesToAdd = newFiles.slice(0, remainingSlots);

        setImages(prev => [...prev, ...filesToAdd]);

        // Create previews
        filesToAdd.forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setImagePreviews(prev => [...prev, ev.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
    }, [images.length]);

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (images.length < 3) {
            setError('Please upload at least 3 reference photos');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Step 1: Create the model
            const modelRes = await fetch('/api/models', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, type: gender }),
            });

            if (!modelRes.ok) {
                const errorData = await modelRes.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to create model');
            }

            const { model } = await modelRes.json();

            // Step 2: Upload sample images ONE AT A TIME (to bypass Vercel body size limit)
            let uploadedCount = 0;
            const uploadErrors: string[] = [];

            for (const img of images) {
                try {
                    const formData = new FormData();
                    formData.append('file', img);
                    formData.append('filename', img.name);

                    const samplesRes = await fetch(`/api/models/${model.id}/samples`, {
                        method: 'POST',
                        body: formData,
                    });

                    const result = await samplesRes.json().catch(() => ({}));

                    if (!samplesRes.ok) {
                        console.error(`Upload failed for ${img.name}:`, result);
                        uploadErrors.push(result.error || `Failed to upload ${img.name}`);
                    } else {
                        uploadedCount++;
                    }
                } catch (err) {
                    console.error(`Error uploading ${img.name}:`, err);
                    uploadErrors.push(`Error uploading ${img.name}`);
                }
            }

            // Check if we uploaded enough images
            if (uploadedCount < 3) {
                throw new Error(uploadErrors[0] || 'Failed to upload enough images');
            }

            // Success - redirect to dashboard
            router.push('/dashboard');
        } catch (err) {
            console.error('Error creating model:', err);
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-500/20 mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Train Your Model</h1>
                    <p className="text-zinc-400 text-sm">Upload reference photos to create your AI model</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-1.5 rounded-full transition-all ${s <= step ? 'w-12 bg-white' : 'w-6 bg-zinc-700'
                                }`}
                        />
                    ))}
                </div>

                {/* Step 1: Name */}
                {step === 1 && (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 animate-in fade-in">
                        <label className="text-sm font-medium text-zinc-400 mb-2 block">
                            Model Name
                        </label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Summer Vibes"
                            className="bg-zinc-800 border-zinc-700 text-white mb-6"
                        />
                        <Button
                            onClick={() => setStep(2)}
                            disabled={!name.trim()}
                            className="w-full bg-white text-black hover:bg-zinc-200"
                        >
                            Continue
                        </Button>
                    </div>
                )}

                {/* Step 2: Gender */}
                {step === 2 && (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 animate-in fade-in">
                        <label className="text-sm font-medium text-zinc-400 mb-3 block">
                            Subject Identity
                        </label>
                        <div className="flex p-1 bg-zinc-800 rounded-lg border border-zinc-700 mb-6">
                            {GENDERS.map((g) => (
                                <button
                                    key={g}
                                    onClick={() => setGender(g)}
                                    className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${gender === g
                                        ? 'bg-white text-black shadow-sm'
                                        : 'text-zinc-400 hover:text-white'
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setStep(1)}
                                className="flex-1 border-zinc-700 text-zinc-400 hover:text-white"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={() => setStep(3)}
                                className="flex-1 bg-white text-black hover:bg-zinc-200"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Upload Images */}
                {step === 3 && (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 animate-in fade-in">
                        <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-medium text-zinc-400">
                                Reference Photos
                            </label>
                            <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${images.length >= 3 ? 'bg-green-500/10 text-green-500' : 'bg-zinc-800 text-zinc-400'
                                }`}>
                                {images.length}/4
                            </span>
                        </div>

                        {/* Image Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {imagePreviews.map((preview, i) => (
                                <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden group">
                                    <img src={preview} className="w-full h-full object-cover" alt="" />
                                    <button
                                        onClick={() => removeImage(i)}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            ))}
                            {images.length < 4 && (
                                <label className="aspect-[3/4] border border-zinc-700 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-colors bg-zinc-800/50">
                                    <Upload className="w-5 h-5 text-zinc-400 mb-1" />
                                    <span className="text-[10px] text-zinc-500">Add Photo</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            )}
                        </div>

                        <p className="text-xs text-zinc-500 mb-6">
                            Upload 3-4 clear photos of your subject. More variety = better results.
                        </p>

                        {error && (
                            <p className="text-sm text-red-400 mb-4">{error}</p>
                        )}

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setStep(2)}
                                className="flex-1 border-zinc-700 text-zinc-400 hover:text-white"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={images.length < 3 || isLoading}
                                className="flex-1 bg-white text-black hover:bg-zinc-200 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Camera className="w-4 h-4 mr-2" />
                                        Create Model
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
