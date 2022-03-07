import { readFileSync } from "fs";
import path from "path";
import { Plugin } from "esbuild";
import postcss, { AcceptedPlugin } from "postcss";

interface PostCSSPluginOptions {
  plugins: Array<AcceptedPlugin>;
}

const postCSSPlugin = ({ plugins = [] }: PostCSSPluginOptions): Plugin => ({
  name: "plugin-postcss",
  setup(build) {
    build.onResolve({ filter: /.\.png/ }, (args) => {
      return { path: path.join(args.resolveDir, "public", args.path) };
    });

    build.onLoad({ filter: /.\.css/ }, async ({ path }) => {
      const processor = postcss(plugins);
      const content = readFileSync(path);
      const result = await processor.process(content, { from: path });

      return {
        contents: result.toString(),
        loader: "css",
      };
    });
  },
});

export default postCSSPlugin;
