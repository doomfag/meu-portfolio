import { readFile, writeFile } from 'node:fs/promises';
const read = (file) => readFile(new URL(file, import.meta.url), 'utf8');
const photo = 'data:image/png;base64,' + (await readFile(new URL('assets/portrait.png', import.meta.url))).toString('base64');
const sculpture = 'data:image/png;base64,' + (await readFile(new URL('assets/sculpture.png', import.meta.url))).toString('base64');
let css = (await read('style.css')).replaceAll('assets/portrait.png', photo).replaceAll('assets/sculpture.png', sculpture);
const script = (await read('projects.js')) + '\n' + (await read('app.js'));
const html = (await read('template.html'))
  .replace('<link rel="stylesheet" href="style.css">', () => `<style>\n${css}\n</style>`)
  .replace('src="assets/portrait.png"', () => `src="${photo}"`)
  .replace('<script src="app.js"></script>', () => `<script>\n${script}\n</script>`);
await writeFile(new URL('index.html', import.meta.url), html);
console.log('index.html gerado: site completo para abrir offline.');
