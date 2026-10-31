import type { AppId } from '@gokulsaraswat/config';

export interface TileMeta {
  description: string;
  accentVar: string;
}

/** Hub-only presentation extras; config.json v1 carries no icon/description/accent. */
export const tileMeta: Partial<Record<AppId, TileMeta>> = {
  portfolio: { description: 'Projects, blog and courses', accentVar: '--chart-1' },
  gspace: { description: 'Notes and progress, works offline', accentVar: '--chart-2' },
  studio: { description: 'Write and preview Markdown', accentVar: '--chart-3' },
  gym: { description: 'Gym management', accentVar: '--chart-4' },
  admin: { description: 'Sign in to manage the apps', accentVar: '--chart-5' },
};
