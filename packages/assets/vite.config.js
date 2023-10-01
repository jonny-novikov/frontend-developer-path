import { useDefaultViteConfig } from "../packageConfig";
import { viteStaticCopy } from "vite-plugin-static-copy";

import { normalizePath } from "vite";
import path from "node:path";

export default useDefaultViteConfig("assets", [
  viteStaticCopy({
    targets: [
      {
        src: normalizePath(path.resolve(__dirname, "./images/*")),
        dest: "images",
      },
      {
        src: normalizePath(path.resolve(__dirname, "./schemas/*")),
        dest: "../schemas",
      },
    ],
  }),
]);
