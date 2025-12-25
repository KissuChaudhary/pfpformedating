
import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar';
import { FounderHero } from '@/components/founder-page/FounderHero';
import { FounderManifesto } from '@/components/founder-page/FounderManifesto';
import { FounderArchetypes } from '@/components/founder-page/FounderArchetypes';
import { FounderUseCases } from '@/components/founder-page/FounderUseCases';
import { FounderNoSuit } from '@/components/founder-page/FounderNoSuit';
import { FounderFAQ } from '@/components/founder-page/FounderFAQ';
import { FounderCTA } from '@/components/founder-page/FounderCTA';
import { SocialProof } from '@/components/pfplanding/SocialProof';
import { Pricing } from '@/components/pfplanding/Pricing';
import { Footer } from '@/components/pfplanding/Footer';
import { commonPageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
    ...commonPageMetadata.home(),
    title: "Casual AI Headshots for Founders & Creatives | Non-Corporate Styles",
    description: "Stop looking like a banker. Get gritty, flash-lit, or cinematic headshots perfect for your Twitter, Substack, or Portfolio.",
}

export default function CreativeHeadshotsPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-16">
                <FounderHero />
                <FounderManifesto />
                <FounderArchetypes />
                <FounderUseCases />
                <FounderNoSuit />
                <SocialProof />
                <Pricing />
                <FounderFAQ />
                <FounderCTA />
            </main>
            <Footer />
        </div>
    )
}
