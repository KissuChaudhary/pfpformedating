
import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar';
import { CouplesHero } from '@/components/couples-page/CouplesHero';
import { CouplesTripodStruggle } from '@/components/couples-page/CouplesTripodStruggle';
import { CouplesTechDiff } from '@/components/couples-page/CouplesTechDiff';
import { CouplesVibeMenu } from '@/components/couples-page/CouplesVibeMenu';
import { CouplesLDRAngle } from '@/components/couples-page/CouplesLDRAngle';
import { CouplesHowItWorks } from '@/components/couples-page/CouplesHowItWorks';
import { CouplesFAQ } from '@/components/couples-page/CouplesFAQ';
import { CouplesCTA } from '@/components/couples-page/CouplesCTA';
import { SocialProof } from '@/components/pfplanding/SocialProof';
import { Footer } from '@/components/pfplanding/Footer';
import { commonPageMetadata, generateWebPageJsonLd } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
    ...commonPageMetadata.home(),
    title: "AI Couple Photo Generator | Cute Aesthetic Photos (No Photographer Needed)",
    description: "Generate cute couple photos with AI. No third wheel needed. Perfect for hard launching your relationship.",
    alternates: {
        canonical: "https://pfpfor.me/use-case/couple-photos",
    },
}

export default function CouplePhotosPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <MultipleStructuredData
                schemas={[
                    {
                        id: 'webpage-couple-photos',
                        data: JSON.parse(generateWebPageJsonLd({
                            name: 'AI Couple Photo Generator | Cute Aesthetic Photos',
                            description: 'Generate cute couple photos with AI. No third wheel needed. Perfect for hard launching your relationship.',
                            url: 'https://pfpfor.me/use-case/couple-photos',
                            breadcrumbs: [
                                { name: 'Home', url: 'https://pfpfor.me' },
                                { name: 'Couple Photos', url: 'https://pfpfor.me/use-case/couple-photos' }
                            ]
                        }))
                    }
                ]}
            />
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
