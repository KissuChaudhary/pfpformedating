import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar'
import { Footer } from '@/components/pfplanding/Footer'
import { generateBreadcrumbJsonLd, generateMetadata } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/StructuredData'
import { seoUtils } from '@/config/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Terms of Service',
  description: 'Review the terms and conditions for using PFPforME, our AI headshot generator service.',
  canonical: '/terms',
})

export default function TermsOfService() {
  return (
    <div className="theme-public min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="border-b border-foreground/10">
          <div className="max-w-5xl mx-auto px-4 py-12 text-center">
            <div className="font-mono text-xs text-foreground/40 mb-4">
              LEGAL // TERMS_OF_SERVICE
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95] mb-3">
              Terms of<br />
              <span className="text-foreground/30">Service.</span>
            </h1>
            <p className="font-mono text-foreground/60 text-sm">
              Review the terms and conditions for using PFPforME.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="space-y-8 bg-[#0a0a0a] border border-foreground/10 rounded-lg p-6 md:p-8">
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">1. Introduction</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                Welcome to <strong className="text-foreground">PFPforME</strong> ("we," "our," "us"). By accessing or using our website at
                <a href="https://pfpfor.me" className="text-accent hover:underline ml-1">pfpfor.me</a>
                ("Site"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">2. Use of Our Service</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                <strong className="text-foreground">PFPforME</strong> is an AI-powered headshot generator that allows users to create professional images.
                Users must adhere to all applicable laws and agree not to misuse our services. Any violations of these rules can result in the termination of access to the platform.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">3. Account and User Responsibilities</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                To access certain features of the Site, you may need to create an account. You agree to provide accurate and complete information when registering and to keep this information updated.
                Users are responsible for maintaining the confidentiality of their account details and for all activities under their account.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">4. Payment and Credits</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                <strong className="text-foreground">PFPforME</strong> operates on a credit-based system for using our services. All purchases of credits are final and non-refundable, except as specified in our
                <a href="/refund-policy" className="text-accent hover:underline ml-1">Refund Policy</a>.
                We reserve the right to modify pricing and the terms of credits at any time.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">5. Data Retention and Deletion</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                We value your privacy. Data, including photos and generated headshots, is stored for a period of 14 days, after which it is permanently deleted. Users may request the deletion of their data at any time by contacting us at
                <a href="mailto:support@pfpfor.me" className="text-accent hover:underline ml-1">support@pfpfor.me</a>.
                For more information, please review our
                <a href="/privacy-policy" className="text-accent hover:underline ml-1">Privacy Policy</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">6. Third-Party Services</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                <strong className="text-foreground">PFPforME</strong> uses third-party services, including <strong className="text-foreground">FAL.ai</strong> for AI image generation. By using our service, you agree to be bound by the terms and policies of these third parties.
                Please review <strong className="text-foreground">FAL.ai's</strong> terms at
                <a href="https://fal.ai/terms" className="text-accent hover:underline ml-1">FAL.ai Terms of Service</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">7. Limitation of Liability</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                To the maximum extent permitted by law, <strong className="text-foreground">PFPforME</strong> and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">8. Changes to the Terms</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                We reserve the right to update these Terms at any time. Any changes will be posted on this page, with the updated date. Continued use of the Site after any changes constitutes acceptance of those changes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">9. Contact Us</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                If you have any questions about these Terms, please contact us at
                <a href="mailto:support@pfpfor.me" className="text-accent hover:underline ml-1">support@pfpfor.me</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">10. Shipping Policy</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                PFPforME provides a fully digital service. No physical products are shipped as part of our offerings. All generated images and digital assets are delivered directly to the user's dashboard on our platform. Once a photoshoot is complete, users can download their generated images from the dashboard at any time. Since all products are digital, there are no shipping fees, and delivery is instant upon generation completion.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">11. Affiliate Program Disclosure</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-4">
                We offer an affiliate program that allows users to earn rewards by referring others to <strong className="text-foreground">PFPforME</strong>. By participating in the affiliate program, you agree to the following terms:
              </p>
              <ul className="space-y-2 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Referral Tracking:</strong> We may use affiliate tracking cookies to monitor referrals. When someone clicks your referral link and signs up, we track the referral to attribute the reward.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Earnings & Payouts:</strong> Affiliate earnings will be credited to your account according to our program's rules. You can view your earnings and program details in your affiliate dashboard. Payment terms, minimum payout thresholds, and related conditions may apply.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Prohibited Practices:</strong> You agree not to engage in deceptive, fraudulent, or unethical practices (e.g., spamming, misleading claims) to generate referrals. Any violation may result in suspension or termination of your affiliate privileges and forfeiture of any unpaid earnings.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Taxes:</strong> You are responsible for complying with applicable tax laws and regulations on any income earned through the affiliate program.</span>
                </li>
              </ul>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mt-4">
                We reserve the right to modify or terminate the affiliate program at any time. Please contact us at
                <a href="mailto:support@pfpfor.me" className="text-accent hover:underline ml-1">support@pfpfor.me</a> if you have any questions about the affiliate program.
              </p>
            </div>
          </div>
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
                { name: 'Terms', url: seoUtils.generateCanonicalUrl('/terms') },
              ])
            ),
          },
        ]}
      />
    </div>
  )
}
