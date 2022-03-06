import { Plugin } from "esbuild";
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

export const defaultOptions: PostCSSPluginOptions = {
    plugins: [],
    modules: true,
    rootDir: process.cwd(),
    writeToFile: true,
    fileIsModule: null
};

const postCSSPlugin = ({}: PostCSSPluginOptions): Plugin => ({
    name: "postcss",
    setup(build) {
        // ...
    }
})