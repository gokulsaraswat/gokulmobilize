import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { AuthConfig } from './account';

let client: SupabaseClient | null = null;

/** One browser Supabase client per page (PKCE, session kept in localStorage, OAuth code read from the URL). */
export function getAuthClient(config: AuthConfig): SupabaseClient {
  client ??= createClient(config.url, config.anonKey, {
    auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: 'hub-auth' },
  });
  return client;
}
