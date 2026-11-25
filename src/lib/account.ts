import type { AppAccessStatus } from '@gokulsaraswat/auth';

export interface AuthConfig {
  url: string;
  anonKey: string;
}

/** Supabase settings from PUBLIC_ env, or null when sign-in is not configured (the menu then stays hidden). */
export function readAuthConfig(env: Record<string, string | boolean | undefined>): AuthConfig | null {
  const url = typeof env.PUBLIC_SUPABASE_URL === 'string' ? env.PUBLIC_SUPABASE_URL.trim().replace(/\/+$/, '') : '';
  const anonKey = typeof env.PUBLIC_SUPABASE_ANON_KEY === 'string' ? env.PUBLIC_SUPABASE_ANON_KEY.trim() : '';
  if (!/^https:\/\//.test(url) || !anonKey) return null;
  return { url, anonKey };
}

/** OAuth return address: the current page without query or hash. */
export function redirectTarget(location: Pick<Location, 'origin' | 'pathname'>): string {
  return `${location.origin}${location.pathname}`;
}

/** URL with OAuth leftovers (`code`, `error*`, `state`) removed, plus the provider error to show, if any. */
export function stripAuthParams(href: string): { href: string; error: string | null; changed: boolean } {
  const url = new URL(href);
  const keys = ['code', 'state', 'error', 'error_code', 'error_description'];
  const changed = keys.some((key) => url.searchParams.has(key));
  const error = url.searchParams.get('error_description') || url.searchParams.get('error');
  keys.forEach((key) => url.searchParams.delete(key));
  return { href: `${url.pathname}${url.search}${url.hash}`, error, changed };
}

const LABELS: Record<AppAccessStatus | 'unknown', string> = {
  admin: 'Hub admin',
  member: 'Hub member',
  pending: 'Access pending approval',
  denied: 'Access not approved',
  none: 'No hub access yet',
  unknown: 'Access status unavailable',
};

export function accessLabel(status: AppAccessStatus | 'unknown'): string {
  return LABELS[status];
}

/** Readable message for Supabase auth errors shown in the account menu. */
export function explainAuthError(error: unknown): string {
  const text = error instanceof Error ? error.message : String(error ?? 'Unknown error');
  if (/manual linking/i.test(text)) return 'Account linking is switched off in Supabase (Authentication → “Allow manual linking”).';
  if (/identity_already_exists|already linked/i.test(text)) return 'That account is already linked to another user.';
  if (/last_identity|only sign-in method/i.test(text)) return 'Link another account before removing this one.';
  return text;
}
