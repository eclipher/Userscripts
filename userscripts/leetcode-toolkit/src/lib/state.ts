class GlobalState {
    #site?: "global" | "cn";

    get site(): "global" | "cn" {
        if (!this.#site) {
            const hostname = window.location.hostname;
            this.#site = hostname === "leetcode.cn" ? "cn" : "global";
        }

        return this.#site;
    }
}

export const globalState = new GlobalState();
