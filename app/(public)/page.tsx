
import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar';
import { Hero } from '@/components/pfplanding/Hero';
import { MoatSection } from '@/components/pfplanding/MoatSection';
import { ConsistencySection } from '@/components/pfplanding/ConsistencySection';
import { LightingLabSection } from '@/components/pfplanding/LightingLabSection';
import { ProductSection } from '@/components/pfplanding/ProductSection';
import { FullFrameSection } from '@/components/pfplanding/FullFrameSection';
import { HowItWorks } from '@/components/pfplanding/HowItWorks';
import { SocialProof } from '@/components/pfplanding/SocialProof';
import { Pricing } from '@/components/pfplanding/Pricing';
import { FAQ } from '@/components/pfplanding/FAQ';
import { Footer } from '@/components/pfplanding/Footer';
import { commonPageMetadata, generateWebApplicationJsonLd } from '@/lib/seo'
import { StructuredData } from '@/components/seo/StructuredData'




export const metadata: Metadata = commonPageMetadata.home()

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-foreground">

      <Navbar />
      <main className="pt-16">
        <Hero />
        <MoatSection />
        <ConsistencySection />
        <LightingLabSection />
        <ProductSection />
        <FullFrameSection />
        <HowItWorks />
        <SocialProof />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      {/* Decorative floating metadata */}
      <div className="fixed bottom-6 right-6 font-mono text-[10px] text-foreground/20 pointer-events-none hidden lg:block z-40">
        SYS_READY <br />
        V2.0.4 <br />
        ANTI-AI KERNEL
      </div>
      {/* WebApplication Schema - Home Page Only */}
      <StructuredData data={JSON.parse(generateWebApplicationJsonLd())} />
    </div>
  )
}