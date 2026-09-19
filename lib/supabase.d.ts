export const supabase: unknown;
export function getSupabaseClient(): unknown;
export function getSupabaseAuthMode(): 'supabase' | 'demo';
export function isSupabaseConfigured(): boolean;
export async function signInWithSupabase(
  email: string,
  password: string,
): Promise<{
  success: boolean;
  mode: 'supabase' | 'demo';
  error: string | null;
  session: Record<string, unknown> | null;
}>;
