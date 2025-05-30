import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey, { cdn } from "vite-plugin-monkey";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        tsconfigPaths(),
        monkey({
            entry: "src/main.ts",
            build: {
                externalGlobals: {
                    compressorjs: cdn.jsdelivr("Compressor"),
                    turndown: cdn.jsdelivr(
                        "TurndownService",
                        "lib/turndown.browser.umd.js",
                    ),
                },
            },
            userscript: {
                name: {
                    "": "NowCoder Toolkit",
                    "zh-CN": "牛客网工具箱",
                },
                description: "复制问题为Markdown，保存为Jupyter Notebook",
                author: "eclipher",
                namespace: "https://github.com/eclipher/Userscripts",
                homepage:
                    "https://github.com/eclipher/Userscripts/tree/main/userscripts/nowcoder-toolkit",
                license: "MIT",
                match: ["*://www.nowcoder.com/practice/*"],
                icon: "https://www.google.com/s2/favicons?sz=64&domain=nowcoder.com",
                grant: "GM_xmlhttpRequest",
            },
        }),
    ],
});
