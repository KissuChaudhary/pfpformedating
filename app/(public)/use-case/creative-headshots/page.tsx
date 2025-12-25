
import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar';
import { UseCaseHero } from '@/components/pfplanding/UseCaseHero';
import { UseCaseFeature } from '@/components/pfplanding/UseCaseFeature';
import { SocialProof } from '@/components/pfplanding/SocialProof';
import { Pricing } from '@/components/pfplanding/Pricing';
import { FAQ } from '@/components/pfplanding/FAQ';
import { Footer } from '@/components/pfplanding/Footer';
import { commonPageMetadata } from '@/lib/seo'

// Temporary metadata, ideally specific for this page
export const metadata: Metadata = {
    ...commonPageMetadata.home(),
    title: "Creative & Founder Headshots AI | Non-Corporate Styles",
    description: "Stop looking like a banker. Generate gritty, cinematic, and flash-lit headshots for your Twitter, Substack, or Portfolio using AI.",
}

export default function CreativeHeadshotsPage() {
    return (
        <div className="relative min-h-screen bg-transparent text-foreground">
            <Navbar />
            <main className="pt-16">
                <UseCaseHero
                    headline={
                        <>
                            Non-Corporate <br />
                            <span className="text-transparent stroke-text">Headshots</span> <br />
                            for Founders & Creatives.
                        </>
                    }
                    hook={`Stop looking like a banker. Get gritty, flash-lit, or cinematic headshots for your Twitter, Substack, or Portfolio.`}
                    image1="/showcase10.png"
                    image2="/profile.png"
                    subheadline="Your 'About Page' sucks. Let's fix it."
                    badgeText="// DESIGNED FOR FOUNDERS"
                />

                <UseCaseFeature
                    title="The 'Anti-LinkedIn' Look"
                    subtitle="Investors judge you by your profile picture. Don't look like you just graduated business school."
                    image="/showcase5.png"
                    imageCaption="// FLASH MODE"
                    features={[
                        {
                            title: "Flash Mode",
                            description: "High-contrast, direct flash photography. Ideal for Substack writers, indie hackers, and Twitter thought leaders."
                        },
                        {
                            title: "Gritty Mode",
                            description: "Adds film grain, texture, and imperfections. Shows you've been in the trenches."
                        },
                        {
                            title: "Studio B&W",
                            description: "Timeless black and white portraits that look like they belong in a magazine feature."
                        }
                    ]}
                />

                <SocialProof />
                <Pricing />
                <FAQ />
            </main>
            <Footer />
        </div>
    )
}
