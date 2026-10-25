import { ImageResponse } from 'next/og';
import { getSiteConfig } from '@/data/site-config';

export const alt = 'Biomedical engineering student portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const site = await getSiteConfig();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #13314d 0%, #0b1e32 100%)',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', width: 96, height: 6, background: '#bb7728', marginBottom: 40 }} />
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
        <div style={{ display: 'flex', fontSize: 38, marginTop: 28, color: '#cbd5e1' }}>{site.title}</div>
        <div style={{ display: 'flex', fontSize: 28, marginTop: 14, color: '#94a3b8' }}>University at Buffalo · Honors College</div>
      </div>
    ),
    size,
  );
}
