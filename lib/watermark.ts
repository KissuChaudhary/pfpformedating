import sharp from 'sharp';

/**
 * Apply a text watermark to an image buffer.
 * The watermark is burned into the actual pixels - cannot be removed client-side.
 * 
 * Uses SVG path-based text (pre-rendered) to avoid font dependency issues.
 * 
 * @param imageBuffer - The original image as a Buffer
 * @param text - Text to display (default: "PREVIEW")
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

        // Create watermark patterns at multiple positions
        // Using pure SVG shapes that don't require fonts
        const fontSize = Math.min(width, height) * 0.08;
        const strokeWidth = 2;

        // Create "PREVIEW" text as a series of rectangles and shapes
        // This is a simple blocky representation that doesn't need fonts
        const createBlockText = (x: number, y: number, scale: number, rotation: number) => {
            const letterWidth = 12 * scale;
            const letterHeight = 16 * scale;
            const gap = 3 * scale;

            // P R E V I E W - simplified block letters
            // Each letter is made of rectangles
            return `
                <g transform="translate(${x}, ${y}) rotate(${rotation})" opacity="0.35">
                    <!-- P -->
                    <rect x="0" y="0" width="${3 * scale}" height="${letterHeight}" fill="white"/>
                    <rect x="${3 * scale}" y="0" width="${7 * scale}" height="${3 * scale}" fill="white"/>
                    <rect x="${7 * scale}" y="0" width="${3 * scale}" height="${8 * scale}" fill="white"/>
                    <rect x="${3 * scale}" y="${5 * scale}" width="${7 * scale}" height="${3 * scale}" fill="white"/>
                    
                    <!-- R -->
                    <rect x="${letterWidth + gap}" y="0" width="${3 * scale}" height="${letterHeight}" fill="white"/>
                    <rect x="${letterWidth + gap + 3 * scale}" y="0" width="${7 * scale}" height="${3 * scale}" fill="white"/>
                    <rect x="${letterWidth + gap + 7 * scale}" y="0" width="${3 * scale}" height="${8 * scale}" fill="white"/>
                    <rect x="${letterWidth + gap + 3 * scale}" y="${5 * scale}" width="${7 * scale}" height="${3 * scale}" fill="white"/>
                    <rect x="${letterWidth + gap + 7 * scale}" y="${8 * scale}" width="${3 * scale}" height="${8 * scale}" fill="white" transform="rotate(30, ${letterWidth + gap + 8.5 * scale}, ${12 * scale})"/>
                    
                    <!-- E -->
                    <rect x="${2 * (letterWidth + gap)}" y="0" width="${3 * scale}" height="${letterHeight}" fill="white"/>
                    <rect x="${2 * (letterWidth + gap) + 3 * scale}" y="0" width="${7 * scale}" height="${3 * scale}" fill="white"/>
                    <rect x="${2 * (letterWidth + gap) + 3 * scale}" y="${6.5 * scale}" width="${5 * scale}" height="${3 * scale}" fill="white"/>
                    <rect x="${2 * (letterWidth + gap) + 3 * scale}" y="${13 * scale}" width="${7 * scale}" height="${3 * scale}" fill="white"/>
                    
                    <!-- V -->
                    <rect x="${3 * (letterWidth + gap)}" y="0" width="${3 * scale}" height="${12 * scale}" fill="white" transform="rotate(10, ${3 * (letterWidth + gap) + 1.5 * scale}, 0)"/>
                    <rect x="${3 * (letterWidth + gap) + 7 * scale}" y="0" width="${3 * scale}" height="${12 * scale}" fill="white" transform="rotate(-10, ${3 * (letterWidth + gap) + 8.5 * scale}, 0)"/>
                    <rect x="${3 * (letterWidth + gap) + 3 * scale}" y="${12 * scale}" width="${4 * scale}" height="${4 * scale}" fill="white"/>
                    
                    <!-- I -->
                    <rect x="${4 * (letterWidth + gap) + 3 * scale}" y="0" width="${4 * scale}" height="${letterHeight}" fill="white"/>
                    
                    <!-- E -->
                    <rect x="${5 * (letterWidth + gap)}" y="0" width="${3 * scale}" height="${letterHeight}" fill="white"/>
                    <rect x="${5 * (letterWidth + gap) + 3 * scale}" y="0" width="${7 * scale}" height="${3 * scale}" fill="white"/>
                    <rect x="${5 * (letterWidth + gap) + 3 * scale}" y="${6.5 * scale}" width="${5 * scale}" height="${3 * scale}" fill="white"/>
                    <rect x="${5 * (letterWidth + gap) + 3 * scale}" y="${13 * scale}" width="${7 * scale}" height="${3 * scale}" fill="white"/>
                    
                    <!-- W -->
                    <rect x="${6 * (letterWidth + gap)}" y="0" width="${3 * scale}" height="${letterHeight}" fill="white"/>
                    <rect x="${6 * (letterWidth + gap) + 4 * scale}" y="${6 * scale}" width="${3 * scale}" height="${10 * scale}" fill="white"/>
                    <rect x="${6 * (letterWidth + gap) + 8 * scale}" y="0" width="${3 * scale}" height="${letterHeight}" fill="white"/>
                    <rect x="${6 * (letterWidth + gap)}" y="${13 * scale}" width="${11 * scale}" height="${3 * scale}" fill="white"/>
                </g>
            `;
        };

        // Calculate text block dimensions for centering
        const textBlockWidth = 7 * (12 * 3 + 3 * 3); // 7 letters

        // Create watermark SVG with multiple instances
        const watermarkSvg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <!-- Center watermark - large, diagonal -->
                ${createBlockText(width / 2 - textBlockWidth / 2, height / 2 - 24, 3, -25)}
                
                <!-- Top-left corner -->
                ${createBlockText(width * 0.05, height * 0.08, 1.5, -25)}
                
                <!-- Bottom-right corner -->
                ${createBlockText(width * 0.55, height * 0.85, 1.5, -25)}
                
                <!-- Additional diagonal stripe pattern for extra protection -->
                <defs>
                    <pattern id="diagonalStripes" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(-25)">
                        <line x1="0" y1="0" x2="0" y2="40" stroke="white" stroke-width="1" opacity="0.08"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonalStripes)"/>
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

        console.log("Watermark applied successfully");
        return watermarkedImage;
    } catch (error) {
        console.error("Watermark application failed:", error);
        // CRITICAL: Do not return unwatermarked image
        // Instead, throw error so calling code can handle it
        throw new Error(`Watermark failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
