'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Sparkles, Zap } from 'lucide-react';
import DodoCheckoutButton from '@/components/dodopayments/DodoCheckoutButton';
import { ShineBorder } from '@/components/ui/shine-border';

interface PricingPlan {
    id: string;
    name: string;
    price: number;
    credits: number;
    isPopular?: boolean;
}

interface PreviewPaymentCardsProps {
    plans: PricingPlan[];
    userId: string;
}

export function PreviewPaymentCards({ plans, userId }: PreviewPaymentCardsProps) {
    if (plans.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Love it? Unlock your photos!
                </h2>
                <p className="text-muted-foreground">
                    Get this photo + {plans[0]?.credits - 1 || 49} more. No subscriptions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map((plan, index) => {
                    const isStarter = plan.name.toLowerCase().includes('basic') || plan.name.toLowerCase().includes('starter');
                    const isPro = plan.name.toLowerCase().includes('premium') || plan.name.toLowerCase().includes('pro');

                    const displayName = isStarter ? 'Standard Roll' : isPro ? 'Pro Roll' : plan.name;
                    const pricePerPhoto = (plan.price / plan.credits).toFixed(2);

                    const features = isStarter ? [
                        `${plan.credits} Hyper-Realistic Photos`,
                        "4 Film Modes",
                        "Nano-Texture Engine",
                        "Commercial License",
                    ] : [
                        `${plan.credits} Hyper-Realistic Photos`,
                        `Best Value ($${pricePerPhoto}/photo)`,
                        "Perfect for Couples & Solos",
                        "4 Film Modes",
                    ];

                    return (
                        <Card
                            key={plan.id}
                            className={`relative ${index === 1 ? 'border-primary' : ''}`}
                        >
                            {index === 1 && <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />}

                            {/* Badge */}
                            <Badge
                                className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary"
                            >
                                {index === 0 ? (
                                    <>
                                        <Star className="h-3 w-3 mr-1" />
                                        Recommended
                                    </>
                                ) : (
                                    <>
                                        <Zap className="h-3 w-3 mr-1" />
                                        Best Value
                                    </>
                                )}
                            </Badge>

                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-lg">{displayName}</CardTitle>
                                <div className="mt-2">
                                    <span className="text-3xl font-bold">${plan.price}</span>
                                    <span className="text-sm text-muted-foreground ml-1">one-time</span>
                                </div>
                                <p className="text-xs text-muted-foreground">${pricePerPhoto} per photo</p>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <ul className="space-y-2 text-sm">
                                    {features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <DodoCheckoutButton
                                    planId={plan.id}
                                    userId={userId}
                                    amount={plan.price}
                                    credits={plan.credits}
                                    planName={displayName}
                                    className="w-full"
                                >
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Unlock {plan.credits} Photos →
                                </DodoCheckoutButton>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
                Secure payment • Instant access • No subscriptions
            </p>
        </div>
    );
}
