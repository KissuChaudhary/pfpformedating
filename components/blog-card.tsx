import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  readTime: string
  category: string
  image: string
  featured?: boolean
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  publishedAt,
  readTime,
  category,
  image,
  featured = false,
}: BlogCardProps) {
  return (
    <article className="group">
      <Link href={`/blog/${slug}`} className="block">
        <div className="bg-[#0a0a0a] border border-foreground/10 overflow-hidden hover:border-foreground/30 transition-all duration-300">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[16/10]">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-accent text-background px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider">
                {category}
              </span>
            </div>

            {/* Film Sprocket Decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-black/50 flex flex-col justify-between items-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-2 h-3 bg-[#1a1a1a] rounded-[1px]"></div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-5 border-t border-foreground/10">
            {/* Metadata */}
            <div className="flex items-center gap-4 font-mono text-[10px] text-foreground/50 mb-3 uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors mb-3 leading-tight uppercase">
              {title}
            </h2>

            {/* Excerpt - only show if native excerpt exists */}
            {excerpt && (
              <p className="font-mono text-xs text-foreground/60 mb-4 leading-relaxed line-clamp-2">
                {excerpt}
              </p>
            )}

            {/* Read More */}
            <div className="flex items-center font-mono text-xs text-foreground/50 group-hover:text-accent transition-colors uppercase tracking-wider">
              <span>Read Article</span>
              <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}