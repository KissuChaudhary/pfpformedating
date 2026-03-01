import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar'
import { Footer } from '@/components/pfplanding/Footer'
import { Pricing } from '@/components/pfplanding/Pricing'
import { commonPageMetadata, generateBreadcrumbJsonLd, generateFAQJsonLd, generateProductJsonLd } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/StructuredData'
import { seoUtils } from '@/config/seo'
import Link from 'next/link'
import { Button } from '@/components/pfplanding/ui/Button'

export const metadata: Metadata = commonPageMetadata.pricing()

// Pricing feature sets for structured data
const starterFeatures = [
  "20 AI Photos",
  "1 Model Training Included",
  "Optimized for Dating Apps",
  "Commercial License"
]

const proFeatures = [
  "500 Match-Ready Photos",
  "Priority Generation",
  "Commercial License",
  "Anti-Ban Protection"
]

export default function PricingPage() {
  return (
    <div className="theme-public min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20 md:pt-24">
        {/* Pricing Section from Landing */}
        <Pricing asH1={true} />

        {/* How We Compare */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="font-mono text-xs text-foreground/40 mb-4">
            COMPARISON // VS_ALTERNATIVES
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-2">How we compare</h2>
          <p className="text-foreground/60 font-mono text-sm mb-8">See how PFPforME stacks up against traditional photo studios and other AI providers.</p>

          {/* Traditional studio vs PFPforME */}
          <div className="bg-[#0a0a0a] border border-foreground/10 rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-foreground/10">
              <h3 className="font-display text-lg font-bold uppercase">Traditional Photo Studio vs PFPforME</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="text-left px-6 py-3 font-mono text-foreground/60 uppercase text-xs">Aspect</th>
                    <th className="text-left px-6 py-3 font-mono text-foreground/60 uppercase text-xs">Traditional Studio</th>
                    <th className="text-left px-6 py-3 font-mono text-foreground/60 uppercase text-xs">PFPforME</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-foreground/70">
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Cost</td>
                    <td className="px-6 py-3">$150–$600+ per session</td>
                    <td className="px-6 py-3 text-accent font-semibold">$19.00–$150.00 / month</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Setup & Scheduling</td>
                    <td className="px-6 py-3">Book time, travel, prep outfits</td>
                    <td className="px-6 py-3">No scheduling, generate anytime</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Delivery Time</td>
                    <td className="px-6 py-3">2–7 days depending on studio</td>
                    <td className="px-6 py-3">Minutes</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Variety of Looks</td>
                    <td className="px-6 py-3">Limited by wardrobe/backgrounds</td>
                    <td className="px-6 py-3">Unlimited scenes</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Retouching & Revisions</td>
                    <td className="px-6 py-3">Usually extra cost or slower</td>
                    <td className="px-6 py-3">Fast iterations included</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Ownership & License</td>
                    <td className="px-6 py-3">Varies by studio contract</td>
                    <td className="px-6 py-3">Full commercial license</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-foreground">Privacy</td>
                    <td className="px-6 py-3">Photographer retains copies</td>
                    <td className="px-6 py-3">Cancel anytime</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Other AI Providers vs PFPforME */}
          <div className="bg-[#0a0a0a] border border-foreground/10 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-foreground/10">
              <h3 className="font-display text-lg font-bold uppercase">Other AI Providers vs PFPforME</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="text-left px-6 py-3 font-mono text-foreground/60 uppercase text-xs">Aspect</th>
                    <th className="text-left px-6 py-3 font-mono text-foreground/60 uppercase text-xs">Other AI Providers</th>
                    <th className="text-left px-6 py-3 font-mono text-foreground/60 uppercase text-xs">PFPforME</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-foreground/70">
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Pricing Model</td>
                    <td className="px-6 py-3">Often subscription or upsells</td>
                    <td className="px-6 py-3 text-accent font-semibold">Simple monthly subscription</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Quality Consistency</td>
                    <td className="px-6 py-3">Varies by provider</td>
                    <td className="px-6 py-3">Nano-Texture Engine, hyper-realistic</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Output Style</td>
                    <td className="px-6 py-3">Generic AI look</td>
                    <td className="px-6 py-3">Raw, candid, real skin texture</td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 text-foreground">Privacy & Data Usage</td>
                    <td className="px-6 py-3">May use data for training</td>
                    <td className="px-6 py-3">No hidden data usage, auto-wipe</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-foreground">Support</td>
                    <td className="px-6 py-3">Email-only or slow</td>
                    <td className="px-6 py-3">Responsive support</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="font-display text-2xl font-bold uppercase mb-6">FAQs</h2>
          <div className="space-y-3">
            <details className="group bg-[#0a0a0a] border border-foreground/10 rounded-lg p-5">
              <summary className="cursor-pointer font-display font-bold uppercase text-sm">How do credits work?</summary>
              <p className="mt-3 text-foreground/70 font-mono text-sm">Credits are used to generate AI photos. Each photo consumes one credit. Credits don't expire.</p>
            </details>
            <details className="group bg-[#0a0a0a] border border-foreground/10 rounded-lg p-5">
              <summary className="cursor-pointer font-display font-bold uppercase text-sm">Is this a subscription?</summary>
              <p className="mt-3 text-foreground/70 font-mono text-sm">Yes. You can cancel anytime.</p>
            </details>
            <details className="group bg-[#0a0a0a] border border-foreground/10 rounded-lg p-5">
              <summary className="cursor-pointer font-display font-bold uppercase text-sm">Can I get a refund?</summary>
              <p className="mt-3 text-foreground/70 font-mono text-sm">We aim to make you happy. If something goes wrong, check our <Link href="/refund-policy" className="text-accent hover:underline">Refund Policy</Link> for details.</p>
            </details>
            <details className="group bg-[#0a0a0a] border border-foreground/10 rounded-lg p-5">
              <summary className="cursor-pointer font-display font-bold uppercase text-sm">How long does generation take?</summary>
              <p className="mt-3 text-foreground/70 font-mono text-sm">Most generations complete within 30-60 seconds.</p>
            </details>
            <details className="group bg-[#0a0a0a] border border-foreground/10 rounded-lg p-5">
              <summary className="cursor-pointer font-display font-bold uppercase text-sm">Do I own the photos?</summary>
              <p className="mt-3 text-foreground/70 font-mono text-sm">Yes. You get a full commercial license for the generated photos.</p>
            </details>
          </div>
        </section>

        {/* Guarantee & Policies */}
        <section className="max-w-5xl mx-auto px-4 pb-12">
          <div className="bg-[#0a0a0a] border border-foreground/10 rounded-lg p-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-foreground/80 font-mono text-sm font-medium">No hidden fees. Refund-friendly. Transparent terms.</p>
            <div className="flex items-center gap-4 font-mono text-sm">
              <Link href="/refund-policy" className="text-accent hover:underline">Refund Policy</Link>
              <Link href="/terms" className="text-accent hover:underline">Terms</Link>
            </div>
          </div>
        </section>

        {/* Contact / Enterprise CTA */}
        <section className="max-w-5xl mx-auto px-4 py-12 text-center border-t border-foreground/10">
          <h3 className="font-display text-xl font-bold uppercase mb-3">Need a custom plan or invoice?</h3>
          <p className="text-foreground/60 font-mono text-sm mb-6">We're happy to help.</p>
          <Link href="mailto:support@pfpfor.me">
            <Button size="lg" variant="primary">
              Contact us →
            </Button>
          </Link>
          <p className="mt-4 font-mono text-xs text-foreground/30">SECURE PAYMENT // 100% MONEY-BACK GUARANTEE</p>
        </section>
      </main>
      <Footer />

      {/* Structured Data */}
      <MultipleStructuredData
        schemas={[
          {
            id: 'breadcrumb',
            data: JSON.parse(
              generateBreadcrumbJsonLd([
                { name: 'Home', url: seoUtils.generateCanonicalUrl('/') },
                { name: 'Pricing', url: seoUtils.generateCanonicalUrl('/pricing') },
              ])
            ),
          },
          {
            id: 'product-starter',
            data: JSON.parse(
              generateProductJsonLd({
                name: 'Standard Roll',
                description: '15 hyper-realistic AI photos with 4 film modes and commercial license.',
                price: 8.99,
                currency: 'USD',
                features: starterFeatures,
              })
            ),
          },
          {
            id: 'product-pro',
            data: JSON.parse(
              generateProductJsonLd({
                name: 'Pro Roll',
                description: '50 hyper-realistic AI photos including couple shots at best value.',
                price: 18.99,
                currency: 'USD',
                features: proFeatures,
              })
            ),
          },
          {
            id: 'faq',
            data: JSON.parse(
              generateFAQJsonLd([
                {
                  question: 'How do credits work?',
                  answer: "Credits are used to generate AI photos. Each photo consumes one credit. Credits don't expire.",
                },
                {
                  question: 'Is this a subscription?',
                  answer: 'No. Plans are one-time purchases. You can buy more credits whenever you need them.',
                },
                {
                  question: 'Can I get a refund?',
                  answer: 'We aim to make you happy. If something goes wrong, check our Refund Policy for details.',
                },
                {
                  question: 'How long does generation take?',
                  answer: 'Most generations complete within 30-60 seconds.',
                },
                {
                  question: 'Do I own the photos?',
                  answer: 'Yes. You get a full commercial license for the generated photos.',
                },
              ])
            ),
          },
        ]}
      />
    </div>
  )
}