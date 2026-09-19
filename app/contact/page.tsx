import { getSiteConfig } from '@/data/site-config';

export default function ContactPage() {
  const siteConfig = getSiteConfig();
  return (
    <div className="container-shell section-shell">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">Connect and collaborate</h1>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>Email: {siteConfig.email}</p>
            <p>Location: {siteConfig.location}</p>
            <p>University: {siteConfig.university}</p>
          </div>
        </div>
        <form className="card-surface p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Name
              <input type="text" name="name" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-0 focus:border-sky-600" />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Email
              <input type="email" name="email" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-0 focus:border-sky-600" />
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium text-slate-700">
            Subject
            <input type="text" name="subject" className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-0 focus:border-sky-600" />
          </label>
          <label className="mt-5 block text-sm font-medium text-slate-700">
            Message
            <textarea name="message" rows={6} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-0 focus:border-sky-600" />
          </label>
          <button type="submit" className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white">Send message</button>
        </form>
      </div>
    </div>
  );
}
