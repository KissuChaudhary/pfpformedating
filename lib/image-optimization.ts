/**
 * Image Optimization Utilities
 * Uses Cloudflare Image Transformations for on-the-fly resizing/compression
 */

/**
 * Transform an image URL to use Cloudflare's image optimization
 * Only applies to R2-hosted images (pub-xxx.r2.dev or your custom domain)
 * 
 * @param originalUrl - The original full-size image URL
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
    originalUrl: string,
    options: {
        width?: number;
        height?: number;
        quality?: number;
        format?: 'webp' | 'avif' | 'auto';
        fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
    } = {}
): string {
    // Default options for gallery thumbnails
    const {
        width = 600,
        quality = 80,
        format = 'webp',
        fit = 'scale-down'
    } = options;

    // Check if this is an R2 URL that can be transformed
    // R2 public URLs typically look like: https://pub-xxx.r2.dev/path/to/image.png
    // or custom domain: https://cdn.unrealshot.com/path/to/image.png
    const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

    if (!originalUrl || !originalUrl.startsWith('http')) {
        return originalUrl;
    }

    // For Cloudflare-hosted R2, use the /cdn-cgi/image/ transformation endpoint
    // Format: https://domain.com/cdn-cgi/image/width=X,quality=Y,format=Z/path/to/image
    try {
        const url = new URL(originalUrl);

        // Build transformation params
        const params = [
            `width=${width}`,
            `quality=${quality}`,
            `format=${format}`,
            `fit=${fit}`
        ].join(',');

        // Insert the transformation path after the domain
        // Note: This only works if Cloudflare Image Resizing is enabled on the domain
        const transformedUrl = `${url.origin}/cdn-cgi/image/${params}${url.pathname}`;

        return transformedUrl;
    } catch {
        // If URL parsing fails, return original
        return originalUrl;
    }
}

/**
 * Get thumbnail URL for gallery display (smaller, compressed)
 */
export function getThumbnailUrl(originalUrl: string): string {
    return getOptimizedImageUrl(originalUrl, {
        width: 600,
        quality: 75,
        format: 'webp',
        fit: 'scale-down'
    });
}

/**
 * Get medium-sized URL for previews
 */
export function getPreviewUrl(originalUrl: string): string {
    return getOptimizedImageUrl(originalUrl, {
        width: 1200,
        quality: 85,
        format: 'webp',
        fit: 'scale-down'
    });
}
