import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        tsconfigPaths(),
        monkey({
            entry: "src/main.ts",
            userscript: {
                name: {
                    "": "Nowcoder Toolkit",
                    "zh-CN": "牛客网工具箱",
                },
                author: "eclipher",
                namespace: "https://github.com/eclipher/Userscripts",
                match: ["*://www.nowcoder.com/practice/*"],
                license: "MIT",
                grant: "GM_xmlhttpRequest",
            },
        }),
    ],
});
