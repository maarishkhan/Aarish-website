// Notifies IndexNow search engines (Bing, Yandex and others) about every URL in the live sitemap.
// Run after a deploy: npm run indexnow
const KEY = 'b8bc445b300af31a63edd55d30305114';
const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aarishkhan.vercel.app').replace(/\/$/, '');

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(base).host, key: KEY, keyLocation: `${base}/${KEY}.txt`, urlList }),
});

console.log(`Submitted ${urlList.length} URLs to IndexNow: HTTP ${response.status}`);
