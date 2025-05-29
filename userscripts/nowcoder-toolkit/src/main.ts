import { mount } from "svelte";
import { Toaster } from "$lib/toast";
import { practicePage } from "./routes/practice";
import { correctAddEventListener } from "$lib/correct-event-listner";

mount(Toaster, {
    target: document.body,
    props: { position: "top-center" },
});

correctAddEventListener();

practicePage();
