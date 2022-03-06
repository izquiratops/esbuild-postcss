const { build } = require("esbuild");

async function main() {
    for (const format of ["esm", "cjs"]) {
        await build({
            entryPoints: ["./src/index.ts"],
            watch: false,
            minify: false,
            sourcemap: false,
            format,
            outfile: `./dist/index${format === "cjs" ? "" : `.${format}`}.js`
        });
    }
}

main();
