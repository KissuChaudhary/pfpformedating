import sharp from 'sharp';

/**
 * Apply a watermark to an image buffer.
 * Uses diagonal lines pattern instead of text (avoids font dependency issues).
 * The watermark is burned into the actual pixels - cannot be removed client-side.
 * 
 * @param imageBuffer - The original image as a Buffer
 * @param text - Text label (used in simpler approach)
 * @returns The watermarked image as a Buffer
 */
export async function applyWatermark(
    imageBuffer: Buffer,
    text: string = 'PREVIEW'
): Promise<Buffer> {
    try {
        // Get image dimensions
        const metadata = await sharp(imageBuffer).metadata();
        const width = metadata.width || 800;
        const height = metadata.height || 1000;

        // Create a diagonal stripe pattern watermark (no fonts needed!)
        // This creates semi-transparent diagonal lines across the image
        const stripeWidth = 3;
        const stripeGap = 40;
        const stripeOpacity = 0.25;

        // Generate diagonal stripes SVG
        let stripes = '';
        for (let i = -height; i < width + height; i += stripeGap) {
            stripes += `<line x1="${i}" y1="0" x2="${i + height}" y2="${height}" stroke="white" stroke-width="${stripeWidth}" stroke-opacity="${stripeOpacity}"/>`;
        }

        // Add a central "X" mark pattern for extra protection
        const centerX = width / 2;
        const centerY = height / 2;
        const markSize = Math.min(width, height) * 0.3;

        const watermarkSvg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <!-- Diagonal stripes pattern -->
                ${stripes}
                
                <!-- Central X mark -->
                <line 
                    x1="${centerX - markSize}" y1="${centerY - markSize}" 
                    x2="${centerX + markSize}" y2="${centerY + markSize}" 
                    stroke="white" stroke-width="8" stroke-opacity="0.3"
                />
                <line 
                    x1="${centerX + markSize}" y1="${centerY - markSize}" 
                    x2="${centerX - markSize}" y2="${centerY + markSize}" 
                    stroke="white" stroke-width="8" stroke-opacity="0.3"
                />
                
                <!-- Corner marks -->
                <circle cx="${width * 0.15}" cy="${height * 0.15}" r="20" fill="white" fill-opacity="0.2"/>
                <circle cx="${width * 0.85}" cy="${height * 0.15}" r="20" fill="white" fill-opacity="0.2"/>
                <circle cx="${width * 0.15}" cy="${height * 0.85}" r="20" fill="white" fill-opacity="0.2"/>
                <circle cx="${width * 0.85}" cy="${height * 0.85}" r="20" fill="white" fill-opacity="0.2"/>
            </svg>
        `;

        // Composite the watermark onto the image
        const watermarkedImage = await sharp(imageBuffer)
            .composite([
                {
                    input: Buffer.from(watermarkSvg),
                    gravity: 'center',
                },
            ])
            .png()
            .toBuffer();

        return watermarkedImage;
    } catch (error) {
        console.error("Watermark application failed:", error);
        // Return original image if watermarking fails (better than crashing)
        // But log this as a critical issue
        console.error("CRITICAL: Returning unwatermarked image!");
        return imageBuffer;
    }
}
