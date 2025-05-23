import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey, { cdn } from "vite-plugin-monkey";
import tsconfigPaths from "vite-tsconfig-paths";

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
                // version is fetched from package.json
                name: {
                    "": "LeetCode Toolkit",
                    "zh-CN": "LeetCode工具箱",
                },
                description: {
                    "": "Find & Save Editorial, Copy problem as Markdown or Download as Jupyter Notebook, Format on Save, Unlock IntelliSense",
                    "zh-CN":
                        "复制题目为 Markdown | 下载为 Jupyter Notebook | 保存时自动格式化 | 免费自动补全",
                },
                author: "eclipher",
                namespace: "https://github.com/eclipher/leetcode-toolkit",
                homepage: "https://github.com/eclipher/leetcode-toolkit",
                include: [
                    /https?:\/\/leetcode\.com\/problems\/.*/,
                    /https?:\/\/leetcode\.cn\/problems\/.*/,
                    /https?:\/\/leetcode\.com\/explore\/learn\/card\/.*/,
                ],
                // don't activate script on solution submission page
                exclude: [
                    "*://leetcode.com/problems/*/post-solution/*",
                    "*://leetcode.cn/problems/*/post-solution/*", // untested
                ],
                license: "MIT",
                icon: "https://www.google.com/s2/favicons?sz=64&domain=leetcode.com",
                resource: {
                    editorials:
                        "https://raw.githubusercontent.com/akhilkammila/leetcode-screenshotter/refs/heads/main/ReadMe.md",
                },
                connect: ["assets.leetcode.com", "*"],
                grant: "GM_xmlhttpRequest",
            },
        }),
    ],
});
