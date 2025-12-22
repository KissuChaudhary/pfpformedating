
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
import { faqData } from '@/components/pfplanding/faq-data';
import { Footer } from '@/components/pfplanding/Footer';
import { commonPageMetadata, generateWebApplicationJsonLd, generateFAQJsonLd } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/StructuredData'




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

      <MultipleStructuredData
        schemas={[
          {
            id: 'web-application',
            data: JSON.parse(generateWebApplicationJsonLd()),
          },
          {
            id: 'faq',
            data: JSON.parse(
              generateFAQJsonLd(
                faqData.map((item) => ({
                  question: item.q,
                  answer: item.a,
                }))
              )
            ),
          },
        ]}
      />
    </div>
  )
}