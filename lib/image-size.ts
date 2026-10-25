import fs from 'node:fs';
import path from 'node:path';

/** Reads a local JPEG or PNG's width and height from its header. Returns null for remote or unreadable images. */
export function readImageSize(publicPath: string): { width: number; height: number } | null {
  if (!publicPath.startsWith('/')) return null;

  try {
    const buffer = fs.readFileSync(path.join(process.cwd(), 'public', publicPath));

    if (buffer.length > 24 && buffer.readUInt32BE(0) === 0x89504e47) {
      return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
    }

    if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

    let offset = 2;

    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }

      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);

      // Start-of-frame markers carry the dimensions; 0xc4, 0xc8 and 0xcc are not frames.
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }

      offset += 2 + length;
    }
  } catch {
    // fall through
  }

  return null;
}
