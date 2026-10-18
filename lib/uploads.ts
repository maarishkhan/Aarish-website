import fs from 'node:fs';
import path from 'node:path';

import { getServiceClient } from '@/lib/supabase-admin';

const BUCKET = 'site-uploads';
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

/**
 * Saves an uploaded image and returns its public URL.
 * Uses Supabase Storage when a service-role key is configured (works on Vercel);
 * otherwise writes to public/uploads (local development only).
 */
export async function saveImageUpload(file: File): Promise<string> {
  const extension = ALLOWED_TYPES[file.type];

  if (!extension || file.size > MAX_BYTES) {
    throw new Error('Uploads must be JPEG, PNG, WebP or GIF images under 5 MB.');
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = getServiceClient();

  if (supabase) {
    const { error: bucketError } = await supabase.storage.createBucket(BUCKET, { public: true });

    if (bucketError && !/already exists/i.test(bucketError.message)) {
      throw new Error(`Could not prepare image storage: ${bucketError.message}`);
    }

    const { error } = await supabase.storage.from(BUCKET).upload(filename, buffer, { contentType: file.type, upsert: false });

    if (error) throw new Error(`Image upload failed: ${error.message}`);

    return supabase.storage.from(BUCKET).getPublicUrl(filename).data.publicUrl;
  }

  if (process.env.VERCEL) {
    throw new Error('Image uploads on Vercel need SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL to be configured.');
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  return `/uploads/${filename}`;
}
