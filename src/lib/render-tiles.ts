import type { HubConfig } from '@gokulsaraswat/config';
import { tileMeta } from './tile-meta';

/** Replaces the grid's children with one card per enabled tile. Uses textContent only, so config values can't inject markup. */
export function renderTiles(grid: HTMLElement, template: HTMLTemplateElement, config: HubConfig): void {
  const items = config.apps
    .filter((app) => app.enabled)
    .map((app) => {
      const item = template.content.firstElementChild!.cloneNode(true) as HTMLLIElement;
      const link = item.querySelector('a')!;
      const meta = tileMeta[app.id];
      link.href = app.href;
      if (app.mode === 'external') {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      if (meta) link.style.setProperty('--tile-accent', `var(${meta.accentVar})`);
      item.querySelector('.monogram')!.textContent = app.name.charAt(0).toUpperCase();
      item.querySelector('.name')!.textContent = app.name;
      item.querySelector('.description')!.textContent = meta?.description ?? '';
      return item;
    });
  grid.replaceChildren(...items);
  grid.setAttribute('aria-busy', 'false');
}
