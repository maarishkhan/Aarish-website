import fs from 'node:fs';
import path from 'node:path';

import { getServiceClient } from '@/lib/supabase-admin';

const BUCKET = 'site-uploads';
// Vercel rejects request bodies over about 4.5 MB, so every upload is limited to 4 MB, locally and live, to behave the same in both.
const MB = 1024 * 1024;
const MAX_BYTES = 4 * MB;
const MAX_PDF_BYTES = 4 * MB;

/** The PDF limit in megabytes, for messages and form hints. */
export const PDF_LIMIT_MB = MAX_PDF_BYTES / MB;
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

/** Stores a file and returns its public URL: Supabase Storage when configured (works on Vercel), otherwise public/uploads locally. */
async function storeUpload(file: File, filename: string, label: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = getServiceClient();

  if (supabase) {
    const { error: bucketError } = await supabase.storage.createBucket(BUCKET, { public: true });

    if (bucketError && !/already exists/i.test(bucketError.message)) {
      throw new Error(`Could not prepare ${label} storage: ${bucketError.message}`);
    }

    const { error } = await supabase.storage.from(BUCKET).upload(filename, buffer, { contentType: file.type, upsert: false });

    if (error) throw new Error(`${label} upload failed: ${error.message}`);

    return supabase.storage.from(BUCKET).getPublicUrl(filename).data.publicUrl;
  }

  if (process.env.VERCEL) {
    throw new Error(`${label} uploads on Vercel need SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL to be configured.`);
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}

/** Saves an uploaded image and returns its public URL. */
export async function saveImageUpload(file: File): Promise<string> {
  const extension = ALLOWED_TYPES[file.type];

  if (!extension || file.size > MAX_BYTES) {
    throw new Error(`Uploads must be JPEG, PNG, WebP or GIF images under ${MAX_BYTES / MB} MB.`);
  }

  return storeUpload(file, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`, 'Image');
}

/** Saves an uploaded PDF (for the downloadable CV) and returns its public URL. */
export async function savePdfUpload(file: File): Promise<string> {
  const header = Buffer.from(await file.slice(0, 5).arrayBuffer()).toString('latin1');

  if (file.type !== 'application/pdf' || header !== '%PDF-' || file.size > MAX_PDF_BYTES) {
    throw new Error(`Upload a PDF file under ${PDF_LIMIT_MB} MB.`);
  }

  return storeUpload(file, `cv-${Date.now()}.pdf`, 'PDF');
}
