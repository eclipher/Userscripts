import "toast-rack/style.css";
import { problemPage } from "./routes/problems";
import { explorePage } from "./routes/explore";

const url = window.location.href;

const problemPageRegex =
    /https?:\/\/leetcode\.com\/problems\/.*|https?:\/\/leetcode\.cn\/problems\/.*/;
const explorePageRegex = /https?:\/\/leetcode\.com\/explore\/.*\/card\/.*/;

if (problemPageRegex.test(url)) {
    problemPage();
} else if (explorePageRegex.test(url)) {
    explorePage();
}
