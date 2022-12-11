import * as esbuild from "esbuild-wasm";
import localforage from "localforage";
import axios from "axios";

const fileCache = localforage.createInstance({
  name: "fileCache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of index.js
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      // Hanlde cached requests (skips to next matching onLoad function if this returns undefined)
      build.onLoad({ filter: /.*/ }, async (args) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
      });

      // Handle css imports
      build.onLoad({ filter: /.css$/ }, async (args) => {
        const { data, request } = await axios.get(args.path);
        const resolveDir = new URL("./", request.responseURL).pathname;

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });

      // Handle js imports
      build.onLoad({ filter: /.*/ }, async (args) => {
        const { data, request } = await axios.get(args.path);
        const resolveDir = new URL("./", request.responseURL).pathname;
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir,
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
