import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar'
import { Footer } from '@/components/pfplanding/Footer'
import { generateBreadcrumbJsonLd, generateMetadata } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/StructuredData'
import { seoUtils } from '@/config/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Refund Policy',
  description:
    'Read about our refund policy for AI-generated headshots at PFPforME, including eligibility and refund process details.',
  canonical: '/refund-policy',
})

export default function RefundPolicy() {
  return (
    <div className="theme-public min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="border-b border-foreground/10">
          <div className="max-w-5xl mx-auto px-4 py-12 text-center">
            <div className="font-mono text-xs text-foreground/40 mb-4">
              LEGAL // REFUND_POLICY
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95] mb-3">
              Refund<br />
              <span className="text-foreground/30">Policy.</span>
            </h1>
            <p className="font-mono text-foreground/60 text-sm">
              Understand when and how refunds may be issued for PFPforME services.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="space-y-8 bg-[#0a0a0a] border border-foreground/10 rounded-lg p-6 md:p-8">
            <div>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                Thank you for choosing our{' '}
                <a href="https://pfpfor.me" className="text-accent hover:underline">AI Dating Photoshoot generator</a>{' '}
                service. We strive to provide the best experience for our users. Please review our refund policy below to understand the circumstances under which refunds may be issued.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">1. Refund Scenarios</h2>
              <ul className="space-y-3 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Technical Issues or Errors:</strong> If you encounter technical problems that prevent you from receiving our service—such as the AI failing to generate headshots or producing unusable results—you may be eligible for a refund.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Service Not Delivered:</strong> If you have paid for headshots but did not receive them, you are entitled to a refund.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Duplicate Charges:</strong> If you are accidentally charged more than once for the same service, we will issue a refund for the duplicate charge.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Unsatisfactory Results:</strong> Refunds for dissatisfaction with the quality of headshots are handled on a case-by-case basis. As the output is subjective, please contact us to discuss your concerns.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">2. Refund Timeframe</h2>
              <ul className="space-y-3 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Request Period:</strong> You may request a refund within 7 days of your purchase.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Processing Time:</strong> Once a refund is approved, it will be processed within 3 to 7 business days. Please allow additional time for the refund to reflect in your account.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">3. Conditions for Refunds</h2>
              <ul className="space-y-3 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Original Payment Method:</strong> Refunds will be issued to the original payment method used for the purchase.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Partial Refunds:</strong> Partial refunds may be offered if part of the service has been delivered or used.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <div>
                    <strong className="text-foreground">Non-Refundable Situations:</strong>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <span className="w-1 h-1 bg-foreground/30 mr-2 mt-1.5 flex-shrink-0"></span>
                        <span>Changes of mind after the service has been delivered.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1 h-1 bg-foreground/30 mr-2 mt-1.5 flex-shrink-0"></span>
                        <span>Refund requests made outside the 7-day request period.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1 h-1 bg-foreground/30 mr-2 mt-1.5 flex-shrink-0"></span>
                        <span>Issues beyond our control, such as dissatisfaction due to unrealistic expectations or failure to follow guidelines for uploading photos.</span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">4. Handling Abusive Refund Requests</h2>
              <ul className="space-y-3 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Fraud Prevention:</strong> To prevent misuse of our refund policy, we may limit the number of refund requests per user.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Case-by-Case Basis:</strong> Subjective dissatisfaction will be evaluated individually to determine if a refund is justified.</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">5. Alternative Solutions</h2>
              <ul className="space-y-3 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Free Redos:</strong> If you are unhappy with the initial headshots, we offer free redos to ensure you receive a result you are satisfied with.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Discounts or Credits:</strong> As an alternative to a full refund, we may offer a discount or credit towards future services if you have used part of the service.</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                If you have any questions or need to request a refund, please contact our support team at{' '}
                <a href="mailto:support@pfpfor.me" className="text-accent hover:underline">support@pfpfor.me</a>.
                We are here to assist you!
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
                { name: 'Refund Policy', url: seoUtils.generateCanonicalUrl('/refund-policy') },
              ])
            ),
          },
        ]}
      />
    </div>
  )
}
