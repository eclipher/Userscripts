import { mount } from "svelte";
import { Toaster } from "$lib/toast";
import { practicePage } from "./routes/practice";

mount(Toaster, {
    target: document.body,
    props: { position: "top-center" },
});

practicePage();
