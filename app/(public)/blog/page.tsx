import type { Metadata } from "next"
import { Navbar } from "@/components/pfplanding/Navbar"
import { Footer } from "@/components/pfplanding/Footer"
import BlogCard from "@/components/blog-card"
import { OfflineBanner } from "@/components/network-status"
import { getAllPosts, formatDate, calculateReadingTime, cleanWordPressExcerpt, type WordPressPost } from "@/lib/wordpress"
import { Suspense } from "react"
import Link from "next/link"

export const dynamic = 'force-static'
export const revalidate = 600 // 10 minutes

export const metadata: Metadata = {
  title: "The Unrealshot AI Blog",
  description:
    "Actionable guides and insights on AI photography. Get the latest tips for creating stunning AI headshots, professional photos for LinkedIn, and authentic, high-quality images for your social and dating profiles.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.unrealshot.com/blog",
  },
  openGraph: {
    title: "The Unrealshot AI Blog",
    description: "Your definitive guide to mastering your digital identity. In The Studio, we share expert tips, creative inspiration, and deep dives into the art of the perfect AI photoshoot.",
    type: "website",
    url: "https://www.unrealshot.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Unrealshot AI Blog",
    description: "Your definitive guide to mastering your digital identity. In The Studio, we share expert tips, creative inspiration, and deep dives into the art of the perfect AI photoshoot.",
  },
}

// Transform WordPress post to blog card format
function transformWordPressPost(post: WordPressPost, index: number) {
  // Only use native WordPress excerpt (cleaned of "Read more" etc.)
  // If no native excerpt exists, don't show any excerpt
  const excerpt = cleanWordPressExcerpt(post.excerpt || '')

  return {
    title: post.title,
    excerpt, // Will be empty string if no native excerpt
    slug: post.slug,
    publishedAt: formatDate(post.date),
    readTime: calculateReadingTime(post.content),
    category: post.categories.nodes[0]?.name || "General",
    image: post.featuredImage?.node?.sourceUrl || "/placeholder.svg?height=400&width=600&text=Blog+Post",
    featured: index === 0, // First post is featured
    author: post.author.node.name,
  }
}

async function BlogContent() {
  try {
    const { posts } = await getAllPosts(20)
    const blogPosts = posts.map(transformWordPressPost)

    return (
      <BlogPageContent blogPosts={blogPosts} />
    )
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return (
      <BlogPageContent blogPosts={[]} />
    )
  }
}

function BlogPageContent({ blogPosts }: { blogPosts: any[] }) {
  return (
    <div className="theme-public min-h-screen flex flex-col text-foreground">
      {/* Film Grain Overlay */}
      <div className="grain"></div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#EBEBEB 1px, transparent 1px), linear-gradient(90deg, #EBEBEB 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <Navbar />

      <main className="flex-1 pt-24 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Offline Banner */}
          <OfflineBanner />

          {/* Header Section */}
          <div className="border-b border-foreground/10 pb-12 mb-12">
            <div className="font-mono text-[10px] text-foreground/40 mb-4 tracking-widest">
              BLOG_ARCHIVE // ALL_POSTS
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.95] mb-4">
              The<br />
              <span className="text-foreground/30">Studio.</span>
            </h1>
            <p className="font-mono text-foreground/60 max-w-xl text-sm leading-relaxed">
              Your guide to mastering AI photography. Expert tips, creative inspiration, and deep dives into the art of the hyper-realistic photoshoot.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  publishedAt={post.publishedAt}
                  readTime={post.readTime}
                  category={post.category}
                  image={post.image}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16 border border-foreground/10 bg-[#0a0a0a]">
                <p className="font-mono text-foreground/50 text-sm">No blog posts available at the moment.</p>
                <p className="font-mono text-foreground/30 text-xs mt-2">Please check your internet connection and try again.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {blogPosts.length > 8 && (
            <div className="text-center mt-12">
              <button className="cursor-pointer font-mono uppercase tracking-wider text-sm px-8 py-4 bg-accent text-background hover:bg-white hover:text-black font-bold transition-all duration-200 border border-transparent active:scale-95">
                Load More Posts →
              </button>
            </div>
          )}
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

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="theme-public min-h-screen flex flex-col">
        <div className="grain"></div>
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="mb-12">
              <div className="font-mono text-[10px] text-foreground/40 mb-4">LOADING...</div>
              <h1 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.95] mb-4">
                The<br />
                <span className="text-foreground/30">Studio.</span>
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-foreground/10 animate-pulse aspect-[4/3]"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <BlogContent />
    </Suspense>
  )
}