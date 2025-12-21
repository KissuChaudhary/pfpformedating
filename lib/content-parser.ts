interface TOCEntry {
    url: string
    name: string
    position: number
}

interface FAQItem {
    id: string
    question: string
    answer: string
}

interface ParsedContent {
    tocEntries: TOCEntry[]
    faqs: FAQItem[]
    content: string
}

/**
 * Generates a URL-friendly slug from a heading text
 */
function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim()
}

/**
 * Extracts table of contents entries from HTML content
 * Looks for h2 and h3 headings and creates anchor links
 */
function extractTOCEntries(content: string): { entries: TOCEntry[], content: string } {
    const entries: TOCEntry[] = []
    let position = 0

    // Match h2 and h3 headings
    const headingRegex = /<h([23])([^>]*)>(.*?)<\/h\1>/gi

    const processedContent = content.replace(headingRegex, (match, level, attrs, text) => {
        position++
        const slug = generateSlug(text)
        const id = `heading-${slug}`

        entries.push({
            url: `#${id}`,
            name: text,
            position
        })

        // Add id attribute to heading if not already present
        if (!attrs.includes('id=')) {
            return `<h${level}${attrs} id="${id}">${text}</h${level}>`
        }
        return match
    })

    return { entries, content: processedContent }
}

/**
 * Extracts FAQ items from HTML content
 * Looks for FAQ schema markup or common FAQ patterns
 */
function extractFAQs(content: string): FAQItem[] {
    const faqs: FAQItem[] = []

    // Pattern 1: Look for FAQ schema markup (itemtype="https://schema.org/FAQPage")
    const faqSchemaRegex = /<div[^>]*itemtype="https:\/\/schema\.org\/Question"[^>]*>[\s\S]*?<span[^>]*itemprop="name"[^>]*>(.*?)<\/span>[\s\S]*?<div[^>]*itemprop="text"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/div>/gi

    let match
    let index = 0

    while ((match = faqSchemaRegex.exec(content)) !== null) {
        index++
        faqs.push({
            id: `faq-${index}`,
            question: match[1].trim(),
            answer: match[2].trim()
        })
    }

    // Pattern 2: Look for common FAQ section patterns
    // Often structured as <h3>Question?</h3> followed by <p>Answer</p>
    if (faqs.length === 0) {
        // Look for FAQ section
        const faqSectionRegex = /<h[23][^>]*>(?:FAQ|Frequently Asked Questions|Common Questions)[^<]*<\/h[23]>([\s\S]*?)(?=<h[12]|$)/i
        const faqSectionMatch = faqSectionRegex.exec(content)

        if (faqSectionMatch) {
            const faqSection = faqSectionMatch[1]
            // Extract Q&A pairs from the section
            const qaRegex = /<h[34][^>]*>(.*?\?)<\/h[34]>\s*(<p>[\s\S]*?<\/p>)/gi

            while ((match = qaRegex.exec(faqSection)) !== null) {
                index++
                faqs.push({
                    id: `faq-${index}`,
                    question: match[1].trim(),
                    answer: match[2].trim()
                })
            }
        }
    }

    // Pattern 3: Look for <details> based FAQs
    if (faqs.length === 0) {
        const detailsRegex = /<details[^>]*>\s*<summary[^>]*>(.*?)<\/summary>\s*([\s\S]*?)<\/details>/gi

        while ((match = detailsRegex.exec(content)) !== null) {
            // Only include if it looks like a question (ends with ?)
            const question = match[1].trim()
            if (question.endsWith('?')) {
                index++
                faqs.push({
                    id: `faq-${index}`,
                    question,
                    answer: match[2].trim()
                })
            }
        }
    }

    return faqs
}

/**
 * Parses HTML content to extract table of contents entries, FAQs, and process the content
 */
export function parseContent(content: string): ParsedContent {
    // Extract TOC entries and add IDs to headings
    const { entries: tocEntries, content: contentWithIds } = extractTOCEntries(content)

    // Extract FAQ items
    const faqs = extractFAQs(content)

    return {
        tocEntries,
        faqs,
        content: contentWithIds
    }
}

export type { TOCEntry, FAQItem, ParsedContent }
