import sharp from 'sharp';

/**
 * Apply a text watermark to an image buffer.
 * The watermark is burned into the actual pixels - cannot be removed client-side.
 * 
 * Uses SVG path-based text (pre-rendered) to avoid font dependency issues.
 * 
 * @param imageBuffer - The original image as a Buffer
 * @param text - Text to display (default: "Unrealshot")
 * @returns The watermarked image as a Buffer
 */
export async function applyWatermark(
    imageBuffer: Buffer,
    text: string = 'Unrealshot'
): Promise<Buffer> {
    try {
        // Get image dimensions
        const metadata = await sharp(imageBuffer).metadata();
        const width = metadata.width || 800;
        const height = metadata.height || 1000;

        // Scale factor relative to image size
        const scale = Math.min(width, height) / 800;

        // Define letter shapes using SVG paths/rects
        // Base coordinate system: 0,0 is top-left of the letter
        // Standard letter size: 10x14 units (scaled by 's')
        const getLetterPath = (char: string, x: number, y: number, s: number) => {
            const w = 10 * s; // width
            const h = 14 * s; // height
            const t = 2 * s;  // thickness

            // Helper for rect
            const r = (rx: number, ry: number, rw: number, rh: number) =>
                `<rect x="${x + rx * s}" y="${y + ry * s}" width="${rw * s}" height="${rh * s}" fill="white" />`;

            // Helper for path
            const p = (d: string) =>
                `<path d="${d}" fill="white" stroke="none" transform="translate(${x},${y}) scale(${s})" />`;

            switch (char.toUpperCase()) {
                case 'U':
                    return r(0, 0, 2, 14) + r(8, 0, 2, 14) + r(2, 12, 6, 2);
                case 'N':
                    return r(0, 0, 2, 14) + r(8, 0, 2, 14) + `<path d="M ${2 * s} ${2 * s} L ${8 * s} ${12 * s} L ${8 * s} ${14 * s} L ${6 * s} ${14 * s} L ${0} ${4 * s} Z" fill="white" transform="translate(${x},${y})" />`;
                case 'R':
                    return r(0, 0, 2, 14) + r(2, 0, 6, 2) + r(8, 2, 2, 4) + r(2, 6, 6, 2) + `<path d="M ${2 * s} ${8 * s} L ${8 * s} ${14 * s} L ${5 * s} ${14 * s} L ${2 * s} ${8 * s} Z" fill="white" transform="translate(${x},${y})" />`;
                case 'E':
                    return r(0, 0, 2, 14) + r(2, 0, 8, 2) + r(2, 6, 6, 2) + r(2, 12, 8, 2);
                case 'A':
                    return r(0, 2, 2, 12) + r(8, 2, 2, 12) + r(2, 0, 6, 2) + r(2, 6, 6, 2);
                case 'L':
                    return r(0, 0, 2, 14) + r(2, 12, 8, 2);
                case 'S':
                    return r(2, 0, 8, 2) + r(0, 2, 2, 4) + r(2, 6, 6, 2) + r(8, 8, 2, 4) + r(0, 12, 8, 2);
                case 'H':
                    return r(0, 0, 2, 14) + r(8, 0, 2, 14) + r(2, 6, 6, 2);
                case 'O':
                    return r(0, 2, 2, 10) + r(8, 2, 2, 10) + r(2, 0, 6, 2) + r(2, 12, 6, 2);
                case 'T':
                    return r(4, 2, 2, 12) + r(0, 0, 10, 2);
                default:
                    return '';
            }
        };

        const generateText = (str: string, startX: number, startY: number, fontSize: number, rotation: number, opacity: number) => {
            const letterSpacing = 12 * fontSize; // Width + gap
            let svgContent = `<g transform="rotate(${rotation}, ${startX}, ${startY})" opacity="${opacity}">`;

            for (let i = 0; i < str.length; i++) {
                // Determine offset based on rotation? No, we rotate the whole group
                // But rotating around startX, startY means we just place letters linearly
                const lx = startX + (i * letterSpacing);
                const ly = startY;
                svgContent += getLetterPath(str[i], lx, ly, fontSize);
            }
            svgContent += '</g>';
            return svgContent;
        };

        // Create watermark SVG
        // "Unrealshot" has 10 letters.
        // Approx width = 10 * 12 * scale = 120 * scale units

        // Large diagonal from bottom-left to top-right
        // Rotation approx -45 degrees

        const bigTextScale = 4.5 * scale;
        const bigTextWidth = 10 * 12 * bigTextScale;

        // Calculate center position
        const cx = width / 2;
        const cy = height / 2;

        // We want to center the text string at cx, cy, then rotate it
        // The text starts at (cx - width/2), but we need to account for rotation logic in SVG
        // Simplest: render text at 0,0 inside a group, then translate group to center, then rotate group

        const textSvg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <!-- Diagonal Stripes Pattern -->
                <defs>
                    <pattern id="diagonalStripes" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(-45)">
                        <line x1="0" y1="0" x2="0" y2="60" stroke="white" stroke-width="2" opacity="0.1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonalStripes)"/>

                <!-- Main Big Watermark: UNREALSHOT -->
                <!-- Translating to center-bottom, horizontal (no rotation) -->
                <g transform="translate(${width / 2}, ${height * 0.65}) rotate(0)" opacity="0.35">
                    <g transform="translate(-${bigTextWidth / 2}, -${(14 * bigTextScale) / 2})">
                        ${[...'UNREALSHOT'].map((char, i) =>
            getLetterPath(char, i * 12 * bigTextScale, 0, bigTextScale)
        ).join('')}
                    </g>
                </g>

                <!-- Outline effect (duplicate text slightly offset black) for readability? -->
                <!-- SVG filters are better but complex without implementation support testing -->
            </svg>
        `;

        // Composite the watermark onto the image
        const watermarkedImage = await sharp(imageBuffer)
            .composite([
                {
                    input: Buffer.from(textSvg),
                    gravity: 'center', // SVG covers whole image
                },
            ])
            .toBuffer();

        console.log("Watermark applied successfully");
        return watermarkedImage;
    } catch (error) {
        console.error("Watermark application failed:", error);
        throw new Error(`Watermark failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
