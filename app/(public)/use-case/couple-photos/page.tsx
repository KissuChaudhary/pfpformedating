
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
    title: "AI Couple Photos Generator | Cute Aesthetic Shots",
    description: "Generate romantic, aesthetic couple photos without a photographer. Perfect for your hard launch on Instagram.",
}

export default function CouplePhotosPage() {
    return (
        <div className="relative min-h-screen bg-transparent text-foreground">
            <Navbar />
            <main className="pt-16">
                <UseCaseHero
                    headline={
                        <>
                            Generate Cute <br />
                            <span className="text-transparent stroke-text">Couple Photos</span> <br />
                            Without a Photographer.
                        </>
                    }
                    hook={`No third wheel needed. Upload photos of you and your partner to get aesthetic, romantic shots for your hard launch.`}
                    image1="/hero2.png"
                    image2="/power-couple.jpg"
                    subheadline="Your 'Hard Launch' just got easier."
                    badgeText="// DESIGNED FOR COUPLES"
                />

                <UseCaseFeature
                    title="The Chemistry Engine™"
                    subtitle="Most AI couple generators look like siblings or strangers photoshopped together. We model chemistry."
                    image="/power-couple.jpg"
                    imageCaption="// COUPLE MODE V2"
                    features={[
                        {
                            title: "Couple Mode",
                            description: "Analyzes two separate faces and generates a cohesive, romantic scene where you actually look like you're together."
                        },
                        {
                            title: "No Third Wheel",
                            description: "Get intimate, candid shots without asking an awkward waiter to take your photo."
                        },
                        {
                            title: "The 'Hard Launch' Pack",
                            description: "30+ variations of dates, vacations, and cozy home vibes ready for your Instagram reel."
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
