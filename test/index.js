const { assert } = require("chai");
const { build } = require("esbuild");
const postCSS = require("../dist");
const autoprefixer = require("autoprefixer");

describe("PostCSS", () => {
    it("Basic CSS import", (done) => {
        runBuild(['test/scripts/basic.ts'])
            .then((res) => {
                assert(res);
                done();
            })
            .catch(done)
    })
})

function runBuild(entryPoints) {
    return build({
        entryPoints,
        bundle: true,
        outdir: 'dist',
        plugins: [
            postCSS.default({
                plugins: [autoprefixer]
            })
        ]
    }).catch(() => process.exit(1))
}