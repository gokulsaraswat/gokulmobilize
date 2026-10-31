import type { HubTile } from '@gokulsaraswat/config';

export interface BuildTarget {
  native: boolean;
  siteOrigin?: string;
}

export interface TileLink {
  href: string;
  openInBrowser: boolean;
}

/**
 * Where a tile goes. Native app: bundled tiles stay in the app; remote and external ones open in the in-app browser (remote needs siteOrigin, else null).
 * Capacitor's Android server answers extension-less paths with the root index.html, so bundled links must name the file.
 */
export function resolveTileLink(tile: Pick<HubTile, 'href' | 'mode'>, target: BuildTarget): TileLink | null {
  if (tile.mode === 'external') return { href: tile.href, openInBrowser: true };
  if (!target.native) return { href: tile.href, openInBrowser: false };
  if (tile.mode === 'bundled') return { href: `${tile.href.replace(/\/$/, '')}/index.html`, openInBrowser: false };
  if (!target.siteOrigin) return null;
  return { href: new URL(tile.href, target.siteOrigin).href, openInBrowser: true };
}
