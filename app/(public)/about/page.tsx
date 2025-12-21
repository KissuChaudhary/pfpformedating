import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar'
import { Footer } from '@/components/pfplanding/Footer'
import { generateBreadcrumbJsonLd, generateMetadata } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/StructuredData'
import { seoUtils } from '@/config/seo'
import Link from 'next/link'
import { Button } from "@/components/pfplanding/ui/Button"

export const metadata: Metadata = generateMetadata({
  title: 'About Us',
  description:
    'Learn more about the journey and team behind Unrealshot AI, the AI headshot generator helping users create professional-grade headshots worldwide.',
  canonical: '/about',
})

export default function AboutUs() {
  return (
    <div className="theme-public min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="border-b border-foreground/10">
          <div className="max-w-5xl mx-auto px-4 py-12 text-center">
            <div className="font-mono text-xs text-foreground/40 mb-4">
              COMPANY // ABOUT_US
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95] mb-3">
              About<br />
              <span className="text-foreground/30">UnrealShot AI.</span>
            </h1>
            <p className="font-mono text-foreground/60 text-sm">
              Our journey, mission, and the people behind the product.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="space-y-8 bg-[#0a0a0a] border border-foreground/10 rounded-lg p-6 md:p-8">
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">Our Journey</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                We are a small team of passionate developers, self-learned, and driven by curiosity. Hailing from India,
                our journey into the tech world started in a rather unconventional way—through blogging. Back then, we were
                just eager to share our thoughts, tips, and insights with the world, covering everything from tech tutorials
                to life hacks. It was our way of staying connected to the ever-evolving world of technology.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">The Spark of AI</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                As with any journey, we soon found ourselves intrigued by something bigger: Artificial Intelligence. AI had
                this magical quality—it was reshaping industries, changing the way people interacted with technology, and making
                the impossible possible. We dove into it headfirst, testing AI tools, tinkering with algorithms, and experimenting
                with different use cases. The more we explored, the more fascinated we became.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">The Birth of UnrealShot AI</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                One evening, after weeks of brainstorming and countless cups of coffee, it hit us—what if AI could make something
                as personal as a headshot? What if you didn't need an expensive photographer or a studio setup to get that
                professional, polished look? That's when UnrealShot AI was born.
              </p>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mt-4">
                We wanted to build something that made it effortless for people to present themselves in the best light, whether
                for their LinkedIn profile, job applications, or business websites. So, we started developing an AI headshot
                generator that could do just that—deliver high-quality, professional-grade images in just a few clicks.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">Empowering People</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                This wasn't just about the tech. It was about empowerment. We believe everyone deserves a professional-looking
                headshot, whether you're starting your career or running a business. Our goal has always been to make AI accessible,
                practical, and—most importantly—beneficial for people.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">Today and Tomorrow</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                Today, UnrealShot AI is serving users worldwide, helping them create stunning and professional AI headshots that
                look like they've been shot in a studio. From freelancers looking to stand out, to business owners crafting a
                professional brand, we're proud to be a part of your journey.
              </p>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mt-4">
                Our story is far from over. We continue to innovate, improve, and grow with every bit of feedback we receive. But
                at the heart of everything we do is the same passion that started it all—an unshakable belief in the power of
                technology to make life a little easier, and a lot more creative.
              </p>
            </div>

            <div className="bg-[#111] border border-foreground/10 rounded-lg p-6">
              <p className="text-foreground/80 font-mono text-sm font-medium">Thank you for trusting us with your image. We look forward to seeing where this adventure takes us next!</p>
              <p className="text-foreground/60 font-mono text-sm mt-4">Warm regards,<br />The UnrealShot AI Team</p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-5xl mx-auto px-4 pb-12 text-center">
          <h3 className="font-display text-xl font-bold uppercase mb-3 text-foreground">Want to talk?</h3>
          <p className="text-foreground/60 font-mono text-sm mb-6">We're happy to answer any questions.</p>
          <Link href="mailto:support@unrealshot.com">
            <Button size="lg" variant="primary">
              Contact us →
            </Button>
          </Link>
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
                { name: 'About', url: seoUtils.generateCanonicalUrl('/about') },
              ])
            ),
          },
        ]}
      />
    </div>
  )
}
