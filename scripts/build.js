const fs = require('node:fs/promises');
const path = require('node:path');
const esbuild = require('esbuild');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');

async function build() {
  await fs.mkdir(output, { recursive: true });
  await esbuild.build({
    absWorkingDir: root,
    bundle: true,
    entryPoints: ['src/App.jsx'],
    minify: true,
    external: ['assets/*'],
    outfile: path.join(output, 'app.js'),
  });
  await fs.cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
  await fs.copyFile(path.join(root, 'archive-enhancement.js'), path.join(output, 'archive-enhancement.js'));
  const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  await fs.writeFile(path.join(output, 'index.html'), html.replaceAll('dist/app.', 'app.').replaceAll('dist/archive-enhancement.js', 'archive-enhancement.js'));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
