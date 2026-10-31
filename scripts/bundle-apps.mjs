import { cp, mkdir, stat, writeFile } from 'node:fs/promises';

const bundledApps = { gspace: 'GSpace', studio: 'Markdown Studio' };
const outDir = 'dist-native';

const exists = (path) => stat(path).then(() => true, () => false);

const placeholder = (name) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${name}</title></head>
<body style="font-family: system-ui, sans-serif; padding: 1.5rem"><h1>${name}</h1><p>${name} is not bundled in this build yet.</p><p><a href="/">Back to apps</a></p></body></html>
`;

for (const [id, name] of Object.entries(bundledApps)) {
  const source = `bundled/${id}`;
  const target = `${outDir}/${id}`;
  if (await exists(source)) {
    await cp(source, target, { recursive: true });
    console.log(`bundled ${id} from ${source}`);
  } else {
    await mkdir(target, { recursive: true });
    await writeFile(`${target}/index.html`, placeholder(name));
    console.log(`bundled ${id}: placeholder (no ${source}/)`);
  }
}
