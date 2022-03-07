# ESBuild plugin to get PostCSS working 🥳

### How to use

You can run the build process with node like this:

```
const postCSS = require("@izquiratops/esbuild-postcss");
const autoprefixer = require("autoprefixer");
const cssModules = require("postcss-modules");

build({
	entryPoints: ['src/index.ts'],
	outdir: 'dist',
	bundle: true,
	loader: { ".png": "file" },
	plugins: [
	  postCSS.default({
		plugins: [autoprefixer, cssModules],
	  }),
	],
  })
```
