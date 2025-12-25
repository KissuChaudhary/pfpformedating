
import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar';
import { UseCaseHero } from '@/components/pfplanding/UseCaseHero';
import { UseCaseFeature } from '@/components/pfplanding/UseCaseFeature';
import { SocialProof } from '@/components/pfplanding/SocialProof';
import { HowItWorks } from '@/components/pfplanding/HowItWorks';
import { Pricing } from '@/components/pfplanding/Pricing';
import { FAQ } from '@/components/pfplanding/FAQ';
import { Footer } from '@/components/pfplanding/Footer';
import { commonPageMetadata } from '@/lib/seo'

// Temporary metadata, ideally specific for this page
export const metadata: Metadata = {
    ...commonPageMetadata.home(),
    title: "AI Dating Photos for Hinge & Tinder | Unrealshot AI",
    description: "Generate candid, aesthetic AI photos for your dating profile. No fake headshots. Get matches with 'friend-took-this' vibes.",
}

export default function DatingPhotosPage() {
    return (
        <div className="relative min-h-screen bg-transparent text-foreground">
            <Navbar />
            <main className="pt-16">
                <UseCaseHero
                    headline={
                        <>
                            The Best AI Photos for <br />
                            <span className="text-transparent stroke-text">Hinge & Tinder</span> <br />
                            (That Get Matches).
                        </>
                    }
                    hook={`Dating apps ban fake photos. Use Unrealshot to generate candid, messy, 'friend-took-this' photos that pass the vibe check.`}
                    image1="/hero3.png"
                    image2="/candid-solo.png"
                    subheadline="Stop getting left-swiped."
                />

                <UseCaseFeature
                    title="The 'Golden Hour' Glitch"
                    subtitle="Most AI photos look like LinkedIn headshots. We trained our model on 35mm film during sunset."
                    image="/hinge.png"
                    imageCaption="// REAL RESULTS ON HINGE"
                    features={[
                        {
                            title: "Golden Hour Mode",
                            description: "Simulates warm, low-angle sunlight hitting your face. instant main character energy."
                        },
                        {
                            title: "Cine Mode",
                            description: "Adds cinematic color grading and subtle motion blur. Makes you look like a movie still, not a generated avatar."
                        },
                        {
                            title: "Anti-Ban Technology",
                            description: "Our messy, imperfect texture passes dating app 'real person' filters."
                        }
                    ]}
                />

                <SocialProof />
                <HowItWorks />
                <Pricing />
                <FAQ />
            </main>
            <Footer />
        </div>
    )
}
