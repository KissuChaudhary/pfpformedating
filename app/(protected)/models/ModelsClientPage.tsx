'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Loader2, User, Calendar, Image as ImageIcon, AlertTriangle } from 'lucide-react';

interface Sample {
    id: number;
    uri: string;
}

interface Model {
    id: number;
    name: string;
    type: string;
    mode?: 'single' | 'couple';
    status: string;
    created_at: string;
    samples: Sample[];
}

export function ModelsClientPage() {
    const router = useRouter();
    const [models, setModels] = useState<Model[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; model: Model | null }>({ open: false, model: null });
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchModels();
    }, []);

    const fetchModels = async () => {
        try {
            const res = await fetch('/api/models');
            if (!res.ok) throw new Error('Failed to fetch models');
            const data = await res.json();
            setModels(data.models || []);
        } catch (err) {
            console.error('Error fetching models:', err);
            setError('Failed to load models');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.model) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/models/${deleteModal.model.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete model');
            }

            setModels(prev => prev.filter(m => m.id !== deleteModal.model!.id));
            setDeleteModal({ open: false, model: null });
        } catch (err) {
            console.error('Error deleting model:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete model');
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white">Your Models</h1>
                        <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">Manage trained AI models</p>
                    </div>
                    <Link href="/models/create">
                        <Button size="sm" className="bg-white text-black hover:bg-zinc-200">
                            <Plus className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">New Model</span>
                        </Button>
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Models Grid - Card layout on mobile */}
                {models.length === 0 ? (
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 sm:p-12 text-center">
                        <div className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ImageIcon className="w-7 h-7 text-zinc-500" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No models yet</h3>
                        <p className="text-zinc-400 text-sm mb-6">Create your first AI model</p>
                        <Link href="/models/create">
                            <Button className="bg-white text-black hover:bg-zinc-200">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Model
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {models.map((model) => (
                            <div
                                key={model.id}
                                className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors group"
                            >
                                {/* Image */}
                                <div className="aspect-square bg-zinc-800 relative">
                                    {model.samples?.[0] ? (
                                        <img
                                            src={model.samples[0].uri}
                                            alt={model.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-10 h-10 text-zinc-600" />
                                        </div>
                                    )}
                                    {/* Status Badge */}
                                    <div className={`absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${model.status === 'ready'
                                        ? 'bg-green-500/90 text-white'
                                        : 'bg-yellow-500/90 text-black'
                                        }`}>
                                        {model.status}
                                    </div>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => setDeleteModal({ open: true, model })}
                                        className="cursor-pointer absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-100"
                                    >
                                        <Trash2 className="w-3.5 h-3.5 text-white" />
                                    </button>
                                </div>

                                {/* Info */}
                                <div className="p-2.5 sm:p-3">
                                    <h3 className="font-medium text-white text-sm truncate">{model.name}</h3>
                                    <div className="flex items-center justify-between mt-1">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[11px] text-zinc-400">{model.type}</span>
                                            <span className="text-zinc-700 text-[10px]">•</span>
                                            <span className="text-[11px] font-medium text-zinc-300 capitalize">
                                                {model.mode || 'single'}
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-zinc-500">{formatDate(model.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.open && deleteModal.model && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 max-w-sm w-full">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                            </div>
                            <h3 className="text-base font-semibold text-white">Delete Model</h3>
                        </div>

                        <p className="text-zinc-400 text-sm mb-1">
                            Delete <span className="text-white font-medium">"{deleteModal.model.name}"</span>?
                        </p>
                        <p className="text-zinc-500 text-xs mb-5">
                            All training and generated images will be permanently removed.
                        </p>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-zinc-700 text-zinc-400 hover:text-white"
                                onClick={() => setDeleteModal({ open: false, model: null })}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    'Delete'
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
