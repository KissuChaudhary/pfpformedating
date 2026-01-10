import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar';
import { DatingHero } from '@/components/dating-page/DatingHero';
import { DatingProblemBlock } from '@/components/dating-page/DatingProblemBlock';
import { DatingFeatures } from '@/components/dating-page/DatingFeatures';
import { DatingTechSpecs } from '@/components/dating-page/DatingTechSpecs';
import { DatingFAQ } from '@/components/dating-page/DatingFAQ';
import { SocialProof } from '@/components/pfplanding/SocialProof';
import { Pricing } from '@/components/pfplanding/Pricing';
import { Footer } from '@/components/pfplanding/Footer';
import { commonPageMetadata, generateWebPageJsonLd } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
    ...commonPageMetadata.home(),
    title: "Best AI Photos for Hinge & Tinder | Candid Dating Profile Generator",
    description: "Dating apps are allergic to 'LinkedIn energy.' Stop using stiff headshots. Use Unrealshot to generate candid, messy, 'friend-took-this' photos.",
    alternates: {
        canonical: "https://www.unrealshot.com/use-case/dating-photos",
    },
}

export default function DatingPhotosPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <MultipleStructuredData
                schemas={[
                    {
                        id: 'webpage-dating-photos',
                        data: JSON.parse(generateWebPageJsonLd({
                            name: 'Best AI Photos for Hinge & Tinder | Candid Dating Profile Generator',
                            description: "Dating apps are allergic to 'LinkedIn energy.' Stop using stiff headshots. Use Unrealshot to generate candid, messy, 'friend-took-this' photos.",
                            url: 'https://www.unrealshot.com/use-case/dating-photos',
                            breadcrumbs: [
                                { name: 'Home', url: 'https://www.unrealshot.com' },
                                { name: 'Dating Photos', url: 'https://www.unrealshot.com/use-case/dating-photos' }
                            ]
                        }))
                    }
                ]}
            />
            <Navbar />
            <main className="pt-16">
                <DatingHero />
                <DatingProblemBlock />
                <DatingFeatures />
                <DatingTechSpecs />
                <SocialProof />
                <Pricing />
                <DatingFAQ />
            </main>
            <Footer />
        </div>
    )
}

