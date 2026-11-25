import { useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AUTH_PROVIDERS, ensureAppAccess, signInWithProvider, type AppAccessStatus, type AuthProviderId } from '@gokulsaraswat/auth';
import { accessLabel, explainAuthError, redirectTarget, stripAuthParams, type AuthConfig } from '../../lib/account';
import { getAuthClient } from '../../lib/auth-client';
import { ConnectedAccounts } from './ConnectedAccounts';
import { ProviderIcon } from './ProviderIcon';
import './account.css';

interface AccountMenuProps {
  config: AuthConfig;
}

type View = 'closed' | 'chooser' | 'menu' | 'accounts';

/** Optional sign-in for the hub (app `hub`): guests see "Sign in"; signed-in users get status, Connected accounts and sign out. */
export default function AccountMenu({ config }: AccountMenuProps) {
  const client = getAuthClient(config);
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [access, setAccess] = useState<AppAccessStatus | 'unknown'>('unknown');
  const [view, setView] = useState<View>('closed');
  const [notice, setNotice] = useState('');
  const [opening, setOpening] = useState<AuthProviderId | ''>('');
  const root = useRef<HTMLDivElement>(null);
  const user = session?.user;

  useEffect(() => {
    client.auth.getSession().then(({ data }) => {
      const cleaned = stripAuthParams(window.location.href);
      if (cleaned.changed) window.history.replaceState(window.history.state, document.title, cleaned.href);
      if (cleaned.error) setNotice(`Sign-in did not finish: ${cleaned.error}`);
      setSession(data.session);
      setReady(true);
    });
    const { data } = client.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setAccess('unknown'); return; }
    ensureAppAccess(client, user.id, 'hub').then((result) => setAccess(result.status)).catch(() => setAccess('unknown'));
  }, [user?.id]);

  useEffect(() => {
    if (view === 'closed') return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setView('closed'); };
    const onPointer = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setView('closed'); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    root.current?.querySelector<HTMLElement>('.account-panel button, .account-panel a')?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, [view]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 4500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const signIn = async (provider: AuthProviderId) => {
    setOpening(provider);
    try {
      await signInWithProvider(client, provider, { redirectTo: redirectTarget(window.location) });
    } catch (err) {
      setNotice(`Could not start sign-in: ${explainAuthError(err)}`);
      setOpening('');
    }
  };

  const signOut = async () => {
    setView('closed');
    await client.auth.signOut();
    setNotice('Signed out');
  };

  if (!ready) return null;
  const meta = (user?.user_metadata ?? {}) as { full_name?: string; name?: string; avatar_url?: string };
  const name = meta.full_name || meta.name || user?.email || 'Account';

  return (
    <div className="account" ref={root}>
      {user ? (
        <button type="button" className="account-avatar" aria-haspopup="menu" aria-expanded={view !== 'closed'} aria-label="Account menu" title={user.email ?? 'Account'} onClick={() => setView(view === 'closed' ? 'menu' : 'closed')}>
          {meta.avatar_url ? <img src={meta.avatar_url} alt="" referrerPolicy="no-referrer" /> : <span>{name.charAt(0).toUpperCase()}</span>}
        </button>
      ) : (
        <button type="button" className="account-btn" aria-haspopup="dialog" aria-expanded={view !== 'closed'} onClick={() => setView(view === 'closed' ? 'chooser' : 'closed')}>Sign in</button>
      )}

      {view !== 'closed' && (
        <div className="account-panel" role={view === 'menu' ? 'menu' : 'dialog'} aria-label={view === 'chooser' ? 'Sign in' : view === 'accounts' ? 'Connected accounts' : 'Account'}>
          {view === 'chooser' && (
            <>
              <p className="account-title">Sign in</p>
              <p className="account-muted">Optional. Everything here works without an account.</p>
              {AUTH_PROVIDERS.map((provider) => (
                <button key={provider.id} type="button" className="account-provider" disabled={opening !== ''} onClick={() => signIn(provider.id)}>
                  <ProviderIcon provider={provider.id} />
                  <span>{opening === provider.id ? 'Opening…' : `Continue with ${provider.label}`}</span>
                </button>
              ))}
            </>
          )}
          {view === 'menu' && user && (
            <>
              <div className="account-who">
                <strong>{name}</strong>
                <small>{user.email}</small>
                <span className={`account-chip is-${access}`}>{accessLabel(access)}</span>
              </div>
              <button type="button" role="menuitem" className="account-item" onClick={() => setView('accounts')}>Connected accounts</button>
              <button type="button" role="menuitem" className="account-item" onClick={signOut}>Sign out</button>
            </>
          )}
          {view === 'accounts' && (
            <>
              <p className="account-title">Connected accounts</p>
              <ConnectedAccounts client={client} onNotice={setNotice} />
            </>
          )}
        </div>
      )}
      <p className="account-notice" role="status" data-visible={notice ? 'true' : 'false'}>{notice}</p>
    </div>
  );
}
