import path from "path";
import {dirSync} from "tmp";
import {readFileSync, writeFile, writeFileSync} from "fs";
import {OnResolveArgs, Plugin} from "esbuild";
import postcss, {Plugin as PostCSSPlugin} from "postcss";

interface PostCSSPluginOptions {
    plugins: Array<PostCSSPlugin>;
    modules: boolean;
    rootDir?: string;
    fileIsModule?: (filename: string) => boolean;
}

interface CSSModule {
    path: string;
    map: { [key: string]: string }
}

const postCSSPlugin = (
    {
        plugins = [],
        modules = true,
        rootDir = process.cwd(),
        fileIsModule = null
    }: PostCSSPluginOptions): Plugin => ({
    name: "postcss",
    setup(build) {
        const {name: tmpDir} = dirSync();

        // TODO: CSS Modules thing
        // const modulesSet = new Set<CSSModule>();
        // const modulesPlugin = postcssModules(...)

        build.onResolve({
            filter: /.\.(css)$/,
            namespace: "file"
        }, async (args: OnResolveArgs) => {
            // about args: https://esbuild.github.io/plugins/#on-resolve-options
            const sourceFullPath = path.resolve(args.resolveDir, args.path);
            const sourceExt = path.extname(sourceFullPath);
            const sourceBaseName = path.basename(sourceFullPath, sourceExt);
            const sourceDir = path.dirname(sourceFullPath);
            const sourceRelDir = path.relative(path.dirname(rootDir), sourceDir);

            const sourceContent = readFileSync(sourceFullPath);
            const tmpFullPath = path.resolve(tmpDir, `${sourceBaseName}.css`);

            console.log(`Processing file ${sourceFullPath} to ${tmpFullPath}`);
            const {css: tmpContent} = await postcss(plugins).process(
                sourceContent, {from: sourceFullPath, to: tmpFullPath}
            );

            await writeFile(tmpFullPath, tmpContent, () => {});

            return {
                path: tmpFullPath
            };
        })
    }
})

export default postCSSPlugin;