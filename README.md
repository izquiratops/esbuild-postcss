# ESBuild + PostCSS 🖌

Made this repo to learn more about ESBuild. With this plugin I can use PostCSS on my personal projects.

## How to use

Once you got `esbuild` and `postcss` install the package:

`npm i @izquiratops/esbuild-postcss`

A build script can be written like this:

```
const postCssPlugin = require("@izquiratops/esbuild-postcss");

build({
	entryPoints: ['src/index.ts'],
	outdir: 'dist',
	bundle: true,
	plugins: [
	  postCssPlugin.default({
		plugins: [autoprefixer]
	  })
	]
  })
```
