import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        monkey({
            entry: "src/main.ts",
            userscript: {
                name: "Redirect to npmx",
                description:
                    "A simple userscript that redirects npmjs.com to npmx.dev for a better experience.",
                author: "eclipher",
                namespace: "https://github.com/eclipher/Userscripts",
                homepage:
                    "https://github.com/eclipher/Userscripts/tree/main/userscripts/redirect-to-npmx",
                match: ["*://npmjs.com/*", "*://www.npmjs.com/*"],
                "run-at": "document-start",
                license: "MIT",
            },
        }),
    ],
});
