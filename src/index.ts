import path from "path";
import { dirSync } from "tmp";
import { OnResolveArgs, Plugin } from "esbuild";
import { Plugin as PostCSSPlugin } from "postcss";

interface PostCSSPluginOptions {
    plugins: Array<PostCSSPlugin>;
    modules: boolean;
    rootDir?: string;
    writeToFile?: boolean;
    fileIsModule?: (filename: string) => boolean;
}

interface CSSModule {
    path: string;
    map: { [key: string]: string }
}

const postCSSPlugin = ({
    plugins = [],
    modules = true,
    rootDir = process.cwd(),
    writeToFile = true,
    fileIsModule = null
}: PostCSSPluginOptions): Plugin => ({
    name: "postcss",
    setup(build) {
        const tmpPath = dirSync().name;

        // TODO: CSS Modules thing
        // const modulesSet = new Set<CSSModule>();
        // const modulesPlugin = postcssModules(...)

        build.onResolve({
            filter: /.\.(css)$/,
            namespace: "file"
        }, async (args: OnResolveArgs) => {
            const sourceFullPath = path.resolve(args.resolveDir, args.path);
            const sourceExt = path.extname(sourceFullPath);
            const sourceBaseName = path.basename(sourceFullPath, sourceExt);
            const sourceDir = path.dirname(sourceFullPath);
            const sourceRelDir = path.relative(path.dirname(rootDir), sourceDir);

            return {};
        })
    }
})

export default postCSSPlugin;