import { mount } from "svelte";
import "./app.css";
import { Toaster } from "$lib/utils/toast";
import { problemPage } from "./routes/problems";
import { explorePage } from "./routes/explore";

mount(Toaster, {
    target: document.body,
    props: { richColors: true, position: "top-center" },
});

const url = window.location.href;

const problemPageRegex =
    /https?:\/\/leetcode\.com\/problems\/.*|https?:\/\/leetcode\.cn\/problems\/.*/;
const explorePageRegex = /https?:\/\/leetcode\.com\/explore\/learn\/card\/.*/;

if (problemPageRegex.test(url)) {
    problemPage();
} else if (explorePageRegex.test(url)) {
    explorePage();
}
