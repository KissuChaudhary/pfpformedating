import { Metadata } from 'next'
import { Navbar } from '@/components/pfplanding/Navbar'
import { Footer } from '@/components/pfplanding/Footer'
import { generateBreadcrumbJsonLd, generateMetadata } from '@/lib/seo'
import { MultipleStructuredData } from '@/components/seo/StructuredData'
import { seoUtils } from '@/config/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'Learn how PFPforME collects, uses, and protects your personal data.',
  canonical: '/privacy-policy',
})

export default function PrivacyPolicy() {
  return (
    <div className="theme-public min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20 md:pt-24">
        {/* Hero */}
        <section className="border-b border-foreground/10">
          <div className="max-w-5xl mx-auto px-4 py-12 text-center">
            <div className="font-mono text-xs text-foreground/40 mb-4">
              LEGAL // PRIVACY_POLICY
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95] mb-3">
              Privacy<br />
              <span className="text-foreground/30">Policy.</span>
            </h1>
            <p className="font-mono text-foreground/60 text-sm">
              Learn how PFPforME collects, uses, and protects your personal data.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <p className="text-foreground/50 font-mono text-sm mb-6">Effective Date: 01 Jan 2025</p>

          <div className="space-y-8 bg-[#0a0a0a] border border-foreground/10 rounded-lg p-6 md:p-8">
            <div>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                At <strong className="text-foreground">PFPforME</strong>, accessible from{' '}
                <a href="https://pfpfor.me" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  pfpfor.me
                </a>
                , we are committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, how we process user data, and your rights under <strong className="text-foreground">applicable privacy laws, including the General Data Protection Regulation (GDPR)</strong>. By using our services, you agree to the practices described in this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">1. Information We Collect</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-4">We collect and process the following types of personal data:</p>
              <h3 className="text-foreground font-bold text-sm mb-2">1.1 Personal Information (Provided by You)</h3>
              <ul className="space-y-2 font-mono text-sm text-foreground/70 mb-4">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Email Address</strong> (for account creation and communication).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Uploaded Images & Media</strong> (used for AI model training and image generation).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Payment Information</strong> (processed securely via third-party payment providers).</span>
                </li>
              </ul>
              <h3 className="text-foreground font-bold text-sm mb-2">1.2 Automatically Collected Data</h3>
              <ul className="space-y-2 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Device Information</strong> (browser type, operating system, and device details).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">IP Address & Location Data</strong> (to ensure service functionality and security).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Usage Data</strong> (features used, session duration, and interactions).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Cookies & Tracking Technologies</strong> (see Section 7).</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">2. How We Use Your Information</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-4">We process your data for the following purposes:</p>
              <ul className="space-y-2 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Service Provision:</strong> To generate AI photos, store user models for 7-14 days, and improve accuracy.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Account Management:</strong> To enable login, profile settings, and service customization.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Payment Processing:</strong> To process transactions securely (via Stripe, PayPal, or others).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Customer Support:</strong> To address inquiries and technical issues.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Security & Fraud Prevention:</strong> To prevent misuse, unauthorized access, or data breaches.</span>
                </li>
              </ul>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mt-4">We <strong className="text-foreground">do not</strong> sell or misuse your data.</p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">3. Data Storage & Retention</h2>
              <ul className="space-y-2 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Email Data:</strong> Stored in Supabase until account deletion.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Uploaded Images:</strong> Retained for <strong className="text-foreground">14 days</strong> before automatic deletion.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Payment Data:</strong> Not stored by us; processed by secure third-party payment providers.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Logs & Analytics:</strong> Retained for performance monitoring but anonymized after 30 days.</span>
                </li>
              </ul>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mt-4">If you request deletion of your account, we will permanently erase all stored personal data.</p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">4. Your Rights (GDPR & Global Compliance)</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-4">If you are an <strong className="text-foreground">EU/EEA resident</strong>, you have additional GDPR rights:</p>
              <ul className="space-y-2 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Right to Access:</strong> Request a copy of your personal data.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Right to Rectification:</strong> Correct inaccurate or incomplete data.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal data.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Right to Restrict Processing:</strong> Limit how we use your data.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Right to Data Portability:</strong> Request your data in a structured format.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Right to Object:</strong> Stop processing for marketing purposes.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Right to Withdraw Consent:</strong> If data processing is based on consent, you can withdraw it at any time.</span>
                </li>
              </ul>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mt-4">
                <strong className="text-foreground">To exercise your rights, contact us at:</strong>{' '}
                <a href="mailto:support@pfpfor.me" className="text-accent hover:underline">support@pfpfor.me</a>. We will respond within <strong className="text-foreground">14 days</strong> as per GDPR guidelines.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">5. Data Sharing & Third-Party Services</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-4">We <strong className="text-foreground">do not sell</strong> your personal data. However, we may share data with:</p>
              <ul className="space-y-2 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Cloud Storage & AI Processing:</strong> Cloudflare (for storage), FAL.ai (for AI image generation).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Payment Processors:</strong> <a href="https://dodopayments.com" className="text-accent hover:underline">Dodopayemnts</a> (for secure transactions).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Analytics & Performance Monitoring:</strong> Google Analytics (to improve user experience).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Legal & Compliance Reasons:</strong> If required by law or court order.</span>
                </li>
              </ul>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mt-4">Each provider follows <strong className="text-foreground">industry-standard security measures</strong> and <strong className="text-foreground">GDPR compliance policies</strong>.</p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">6. Data Security Measures</h2>
              <ul className="space-y-2 font-mono text-sm text-foreground/70">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Encryption:</strong> Data is encrypted in transit and at rest.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Access Control:</strong> Limited access to authorized personnel only.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-accent mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Regular Security Audits:</strong> To prevent unauthorized data access.</span>
                </li>
              </ul>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mt-4">However, no system is <strong className="text-foreground">100% secure</strong>, and we encourage users to take necessary precautions.</p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">7. Cookies & Tracking Technologies</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed mb-4">We use cookies and similar tracking technologies to improve your experience on PFPforME.</p>
              <h3 className="text-foreground font-bold text-sm mb-2">7.1 What Cookies Do We Use?</h3>
              <ul className="space-y-2 font-mono text-sm text-foreground/70 mb-4">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Authentication Cookies:</strong> Used by Supabase to keep you logged in after signing in via email or Google login.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Necessary Cookies:</strong> Required for basic website functionality and security.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-foreground/40 mr-3 mt-1.5 flex-shrink-0"></span>
                  <span><strong className="text-foreground">Analytics Cookies:</strong> Help us analyze site usage and improve performance (Google Analytics, Hotjar).</span>
                </li>
              </ul>
              <h3 className="text-foreground font-bold text-sm mb-2">7.2 Managing Cookies</h3>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                You can control or disable cookies through your browser settings. However, disabling authentication cookies may log you out or limit certain features. For any questions regarding our use of cookies, contact us at{' '}
                <a href="mailto:support@pfpfor.me" className="text-accent hover:underline">support@pfpfor.me</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">8. Children's Privacy</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">We <strong className="text-foreground">do not</strong> knowingly collect or process data from users under <strong className="text-foreground">18 years old</strong>. If we discover such data, we will delete it immediately.</p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">9. International Data Transfers</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                Since we operate globally, your data <strong className="text-foreground">may be transferred to servers outside your country</strong> (including the US & EU). We ensure these transfers comply with <strong className="text-foreground">GDPR, SCCs (Standard Contractual Clauses), and other international laws</strong> for secure handling.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">10. Changes to This Privacy Policy</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                We may update this Privacy Policy to reflect <strong className="text-foreground">legal, technical, or business changes</strong>. Any updates will be posted here with an <strong className="text-foreground">effective date</strong>. Continued use of PFPforME signifies your acceptance of the changes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold uppercase mb-3 text-foreground">11. Contact Information</h2>
              <p className="text-foreground/70 font-mono text-sm leading-relaxed">
                For any questions or privacy-related concerns, contact us:<br />
                <strong className="text-foreground">Email:</strong>{' '}
                <a href="mailto:support@pfpfor.me" className="text-accent hover:underline">support@pfpfor.me</a><br />
                <strong className="text-foreground">Website:</strong>{' '}
                <a href="https://pfpfor.me" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">pfpfor.me</a>
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
                { name: 'Privacy Policy', url: seoUtils.generateCanonicalUrl('/privacy-policy') },
              ])
            ),
          },
        ]}
      />
    </div>
  )
}