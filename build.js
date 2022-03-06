const { build } = require("esbuild");

async function main() {
    for (const format of ["esm", "cjs"]) {
        await build({
            entryPoints: ["./src/index.ts"],
            watch: false,
            format,
            outfile: `./dist/index.${format}.js`
        });
    }
}

await main();