import { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { AUTH_PROVIDERS, linkProvider, listIdentities, unlinkProvider, type LinkedIdentity } from '@gokulsaraswat/auth';
import { explainAuthError, redirectTarget } from '../../lib/account';
import { ProviderIcon } from './ProviderIcon';

interface ConnectedAccountsProps {
  client: SupabaseClient;
  onNotice: (message: string) => void;
}

export function ConnectedAccounts({ client, onNotice }: ConnectedAccountsProps) {
  const [identities, setIdentities] = useState<LinkedIdentity[] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');

  const load = () =>
    listIdentities(client)
      .then((list) => { setIdentities(list); setError(''); })
      .catch((err: unknown) => setError(explainAuthError(err)));

  useEffect(() => { load(); }, []);

  const link = async (provider: (typeof AUTH_PROVIDERS)[number]['id']) => {
    setBusy(provider);
    try {
      await linkProvider(client, provider, { redirectTo: redirectTarget(window.location) });
    } catch (err) {
      onNotice(`Could not link: ${explainAuthError(err)}`);
      setBusy('');
    }
  };

  const unlink = async (identity: LinkedIdentity) => {
    if (!window.confirm(`Unlink ${identity.provider}? You can still sign in with your other account.`)) return;
    setBusy(identity.identityId);
    try {
      await unlinkProvider(client, identity);
      onNotice('Account unlinked');
      await load();
    } catch (err) {
      onNotice(`Could not unlink: ${explainAuthError(err)}`);
    } finally {
      setBusy('');
    }
  };

  if (error) return <p className="account-error">{error}</p>;
  if (!identities) return <p className="account-muted" aria-busy="true">Loading…</p>;

  return (
    <ul className="account-identities">
      {AUTH_PROVIDERS.map((provider) => {
        const identity = identities.find((item) => item.provider === provider.id);
        return (
          <li key={provider.id}>
            <span className="account-identity-icon"><ProviderIcon provider={provider.id} /></span>
            <span className="account-identity-text">
              <strong>{provider.label}</strong>
              <small>{identity ? identity.email || 'Connected' : 'Not connected'}</small>
            </span>
            {!identity ? (
              <button type="button" className="account-btn is-primary" disabled={busy === provider.id} onClick={() => link(provider.id)}>Link</button>
            ) : identities.length < 2 ? (
              <span className="account-chip" title="Link another account before you can remove this one">Only way in</span>
            ) : (
              <button type="button" className="account-btn" disabled={busy === identity.identityId} onClick={() => unlink(identity)}>Unlink</button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
