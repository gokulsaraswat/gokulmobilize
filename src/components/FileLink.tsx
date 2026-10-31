import type { LinkProps } from '@gokulsaraswat/ui';

/** Native build only: links to the built page file (`/faq.html`), because Capacitor serves extension-less paths as the root index.html. */
export const FileLink = ({ href, className, children }: LinkProps) => (
  <a href={`${href}.html`} className={className}>
    {children}
  </a>
);
