import Link from 'next/link';
import { loginAdminAction } from './actions';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="eyebrow">Secure access</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-dark">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in to manage profile and research content. 
        </p>

        <form action={loginAdminAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm w-full">
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Returning to <Link href="/" className="font-medium text-brand">public site</Link>
        </p>
      </div>
    </div>
  );
}
