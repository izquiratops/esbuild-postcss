const { rmSync } = require("fs");
const { assert } = require("chai");
const { build } = require("esbuild");
const postCSS = require("../dist");
const autoprefixer = require("autoprefixer");
const cssModules = require("postcss-modules");

const outdir = "test/dist";

describe("Testing PostCSS plugin", () => {
  beforeEach(() => {
    rmSync(outdir, { recursive: true, force: true });
  });

  it("Basic CSS import from .ts", (done) => {
    run(["test/basic/main.ts"])
      .then((res) => {
        assert(res);
        done();
      })
      .catch(done);
  });
});

async function run(entryPoints) {
  return build({
    entryPoints,
    outdir,
    bundle: true,
    loader: { ".png": "file" },
    plugins: [
      postCSS.default({
        plugins: [autoprefixer, cssModules],
      }),
    ],
  }).catch(() => process.exit(1));
}
