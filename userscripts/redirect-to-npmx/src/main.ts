window.stop();

const NPMX_HOST = "npmx.dev";
const newURL = new URL(window.location.href);
newURL.hostname = NPMX_HOST;
window.location.replace(newURL.href);
