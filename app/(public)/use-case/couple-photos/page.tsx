
import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar';
import { CouplesHero } from '@/components/couples-page/CouplesHero';
import { CouplesTripodStruggle } from '@/components/couples-page/CouplesTripodStruggle';
import { CouplesTechDiff } from '@/components/couples-page/CouplesTechDiff';
import { CouplesVibeMenu } from '@/components/couples-page/CouplesVibeMenu';
import { CouplesLDRAngle } from '@/components/couples-page/CouplesLDRAngle';
import { CouplesHowItWorks } from '@/components/couples-page/CouplesHowItWorks';
import { CouplesFAQ } from '@/components/couples-page/CouplesFAQ';
import { CouplesCTA } from '@/components/couples-page/CouplesCTA'; // Custom CTA
import { SocialProof } from '@/components/pfplanding/SocialProof';
import { Footer } from '@/components/pfplanding/Footer';
import { commonPageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
    ...commonPageMetadata.home(),
    title: "AI Couple Photo Generator | Cute Aesthetic Photos (No Photographer Needed)",
    description: "Generate cute couple photos with AI. No third wheel needed. Perfect for hard launching your relationship.",
}

export default function CouplePhotosPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="pt-16">
                <CouplesHero />
                <CouplesTripodStruggle />
                <CouplesTechDiff />
                <CouplesVibeMenu />
                <CouplesLDRAngle />
                <CouplesHowItWorks />
                <SocialProof />
                <CouplesFAQ />
                <CouplesCTA />
            </main>
            <Footer />
        </div>
    )
}
