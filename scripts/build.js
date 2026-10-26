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
    outfile: path.join(output, 'app.js'),
  });
  await fs.copyFile(path.join(root, 'index.html'), path.join(output, 'index.html'));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
