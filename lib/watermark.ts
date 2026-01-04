import sharp from 'sharp';

/**
 * Apply a text watermark to an image buffer.
 * The watermark is burned into the actual pixels - cannot be removed client-side.
 * 
 * @param imageBuffer - The original image as a Buffer
 * @param text - The watermark text (default: "PREVIEW")
 * @returns The watermarked image as a Buffer
 */
export async function applyWatermark(
    imageBuffer: Buffer,
    text: string = 'PREVIEW'
): Promise<Buffer> {
    // Get image dimensions
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 1000;

    // Calculate watermark size based on image dimensions
    const fontSize = Math.max(Math.floor(width / 8), 40);
    const strokeWidth = Math.max(Math.floor(fontSize / 20), 2);

    // Create SVG watermark with semi-transparent text
    // Using multiple instances for better coverage and harder to crop out
    const watermarkSvg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .watermark {
                        font-family: Arial, Helvetica, sans-serif;
                        font-weight: bold;
                        font-size: ${fontSize}px;
                        fill: rgba(255, 255, 255, 0.35);
                        stroke: rgba(0, 0, 0, 0.15);
                        stroke-width: ${strokeWidth}px;
                    }
                </style>
            </defs>
            
            <!-- Center watermark (main) -->
            <text 
                x="50%" 
                y="50%" 
                text-anchor="middle" 
                dominant-baseline="middle"
                class="watermark"
                transform="rotate(-30, ${width / 2}, ${height / 2})"
            >${text}</text>
            
            <!-- Top-left watermark -->
            <text 
                x="15%" 
                y="20%" 
                text-anchor="middle" 
                dominant-baseline="middle"
                class="watermark"
                style="font-size: ${fontSize * 0.6}px; fill: rgba(255, 255, 255, 0.25);"
                transform="rotate(-30, ${width * 0.15}, ${height * 0.2})"
            >${text}</text>
            
            <!-- Bottom-right watermark -->
            <text 
                x="85%" 
                y="80%" 
                text-anchor="middle" 
                dominant-baseline="middle"
                class="watermark"
                style="font-size: ${fontSize * 0.6}px; fill: rgba(255, 255, 255, 0.25);"
                transform="rotate(-30, ${width * 0.85}, ${height * 0.8})"
            >${text}</text>
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
}

/**
 * Apply a diagonal repeating watermark pattern across the entire image.
 * This is even harder to remove as it covers the full image.
 */
export async function applyFullWatermark(
    imageBuffer: Buffer,
    text: string = 'PREVIEW'
): Promise<Buffer> {
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width || 800;
    const height = metadata.height || 1000;

    const fontSize = Math.max(Math.floor(width / 12), 30);
    const spacing = fontSize * 4;

    // Create a repeating diagonal pattern
    let watermarkTexts = '';
    for (let y = -height; y < height * 2; y += spacing) {
        for (let x = -width; x < width * 2; x += spacing * 1.5) {
            watermarkTexts += `
                <text 
                    x="${x}" 
                    y="${y}" 
                    class="watermark"
                    transform="rotate(-30, ${x}, ${y})"
                >${text}</text>
            `;
        }
    }

    const watermarkSvg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .watermark {
                        font-family: Arial, Helvetica, sans-serif;
                        font-weight: bold;
                        font-size: ${fontSize}px;
                        fill: rgba(255, 255, 255, 0.20);
                        stroke: rgba(0, 0, 0, 0.08);
                        stroke-width: 1px;
                    }
                </style>
            </defs>
            ${watermarkTexts}
        </svg>
    `;

    const watermarkedImage = await sharp(imageBuffer)
        .composite([
            {
                input: Buffer.from(watermarkSvg),
                gravity: 'northwest',
            },
        ])
        .png()
        .toBuffer();

    return watermarkedImage;
}
