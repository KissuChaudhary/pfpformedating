import type { Metadata } from "next"
import { Navbar } from "@/components/pfplanding/Navbar"
import { Footer } from "@/components/pfplanding/Footer"
import BlogContentRenderer from "@/components/blog-content-renderer"
import ShareButton from "@/components/share-button"
import { Calendar, Clock, ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import { getPostBySlug, getAllPostSlugs, formatDate, calculateReadingTime, type WordPressPost } from "@/lib/wordpress"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"

// Ensure static generation with ISR for crawler stability
export const dynamic = 'force-static'
export const revalidate = 600 // 10 minutes

// Generate static paths for all blog posts
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await getAllPostSlugs()
    return slugs.map((slug) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const canonicalSlug = slug.replace(/[\s,]+$/g, '')
  try {
    const post = await getPostBySlug(canonicalSlug)

    if (!post) {
      return {
        title: "Post Not Found - Unrealshot Blog",
        description: "The requested blog post could not be found.",
      }
    }

    const seoTitle = post.title
    const seoDescription = post.excerpt || "Read this article on Unrealshot Blog"
    const ogImage = post.featuredImage?.node?.sourceUrl || "/placeholder.svg"

    return {
      title: `${seoTitle} - Unrealshot Blog`,
      description: seoDescription,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: [post.author.node.name],
        images: [{
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.node?.altText || post.title,
        }],
        url: `https://www.unrealshot.com/blog/${post.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [ogImage],
      },
      alternates: {
        canonical: `https://www.unrealshot.com/blog/${post.slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: "Blog Post - The Unrealshot AI Blog",
      description: "Get the latest tips for creating stunning AI headshots, professional photos for LinkedIn, and authentic, high-quality images for your social and dating profiles.",
    }
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const canonicalSlug = slug.replace(/[\s,]+$/g, '')
  if (canonicalSlug !== slug) {
    redirect(`/blog/${canonicalSlug}`)
  }
  try {
    const post = await getPostBySlug(canonicalSlug)

    if (!post) {
      notFound()
    }

    return <BlogPostContent post={post} />
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}

function BlogPostContent({ post }: { post: WordPressPost }) {
  const readTime = calculateReadingTime(post.content)
  // Show modified date instead of published date
  const displayDate = formatDate(post.modified || post.date)
  const category = post.categories.nodes[0]?.name || "General"

  // Format dates with timezone for schema (ISO 8601 with Z suffix)
  const formatDateWithTimezone = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString() // Returns format like 2025-10-23T23:18:19.000Z
  }

  const blogPostJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://www.unrealshot.com/blog/${post.slug}`,
    headline: post.title,
    description: post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '') : post.title,
    image: post.featuredImage?.node?.sourceUrl || 'https://www.unrealshot.com/placeholder.svg',
    datePublished: formatDateWithTimezone(post.date),
    dateModified: formatDateWithTimezone(post.modified || post.date),
    author: {
      '@type': 'Organization',
      name: 'Unrealshot Team',
      url: 'https://www.unrealshot.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Unrealshot AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.unrealshot.com/unrealshot-logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.unrealshot.com/blog/${post.slug}`
    },
    articleSection: category,
    wordCount: post.content.split(' ').length,
    timeRequired: `PT${readTime}M`,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://www.unrealshot.com/blog',
      name: 'The Unrealshot AI Blog'
    }
  }

  return (
    <div className="theme-public min-h-screen flex flex-col text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />

      {/* Film Grain Overlay */}
      <div className="grain"></div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#EBEBEB 1px, transparent 1px), linear-gradient(90deg, #EBEBEB 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <Navbar />

      <main className="flex-1 pt-16 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="border-b border-foreground/10 pt-12 pb-12">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            {/* Back Link */}
            <div className="mb-8">
              <Link href="/blog" className="inline-flex items-center font-mono text-xs uppercase tracking-wider text-foreground/50 hover:text-accent transition-colors">
                <ArrowLeft className="w-3 h-3 mr-2" />
                Back to Blog
              </Link>
            </div>

            <div className="space-y-6">
              {/* Metadata Row */}
              <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-wider">
                <span className="bg-accent text-background px-2 py-1 font-bold">{category}</span>
                <div className="flex items-center gap-2 text-foreground/50">
                  <Calendar className="w-3 h-3" />
                  <span>{displayDate}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/50">
                  <Clock className="w-3 h-3" />
                  <span>{readTime}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-5xl font-bold leading-[0.95] uppercase">{post.title}</h1>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="font-mono text-foreground/60 text-sm leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: post.excerpt }} suppressHydrationWarning />
              )}

              {/* Author & Share */}
              <div className="flex items-center gap-6 pt-4 border-t border-foreground/10">
                <div className="flex items-center gap-3">
                  {post.author.node.avatar?.url ? (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={36}
                      height={36}
                      className="rounded-none border border-foreground/20"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-[#0a0a0a] border border-foreground/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-foreground/50" />
                    </div>
                  )}
                  <div>
                    <p className="font-mono text-xs text-foreground uppercase">{post.author.node.name}</p>
                    <p className="font-mono text-[10px] text-foreground/40">Author</p>
                  </div>
                </div>

                <div className="ml-auto">
                  <ShareButton
                    title={post.title}
                    url={`https://www.unrealshot.com/blog/${post.slug}`}
                    text={post.excerpt || `Check out this article: ${post.title}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="max-w-4xl mx-auto px-6 md:px-12 mt-8">
            <div className="relative border border-foreground/10 overflow-hidden">
              {/* Film Sprocket Left */}
              <div className="absolute left-0 top-0 bottom-0 w-5 bg-black border-r border-foreground/20 flex flex-col justify-between items-center py-3 z-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-3 h-4 bg-[#1a1a1a] rounded-[2px]"></div>
                ))}
              </div>

              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                width={1200}
                height={800}
                className="w-full h-auto aspect-[16/9] object-cover"
                priority
              />

              {/* Film Sprocket Right */}
              <div className="absolute right-0 top-0 bottom-0 w-5 bg-black border-l border-foreground/20 flex flex-col justify-between items-center py-3 z-10">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-3 h-4 bg-[#1a1a1a] rounded-[2px]"></div>
                ))}
              </div>

              {/* Image Label */}
              <div className="absolute bottom-4 left-8 bg-black/80 backdrop-blur border border-foreground/20 px-2 py-1 font-mono text-[10px] uppercase text-foreground/70 z-10">
                // featured_image
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 mt-12">
          <article className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight
            prose-p:font-mono prose-p:text-foreground/70 prose-p:text-sm prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:font-mono prose-ul:text-sm prose-ul:text-foreground/70
            prose-ol:font-mono prose-ol:text-sm prose-ol:text-foreground/70
            prose-li:marker:text-accent
            prose-blockquote:border-l-accent prose-blockquote:font-mono prose-blockquote:text-foreground/60
            prose-code:text-accent prose-code:bg-[#0a0a0a] prose-code:px-1 prose-code:py-0.5
            prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-foreground/10
            prose-img:border prose-img:border-foreground/10
          ">
            <BlogContentRenderer content={post.content} />
          </article>
        </div>

        {/* CTA Section */}
        <div className="mt-20 border-t border-foreground/10 pt-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase leading-[0.95] mb-6">
              Ready To Create<br />
              <span className="text-foreground/30">Your Photos?</span>
            </h2>
            <p className="font-mono text-foreground/60 text-sm max-w-md mx-auto mb-8">
              Turn your selfies into professional, candid photos. No camera required.
            </p>
            <Link href="/login">
              <button className="font-mono uppercase tracking-wider text-sm px-8 py-4 bg-accent text-background hover:bg-white hover:text-black font-bold transition-all duration-200">
                Start Your Roll →
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}