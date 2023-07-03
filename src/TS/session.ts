import { AppearanceType } from "@vkontakte/vk-bridge";
import { makeAutoObservable } from "mobx";

const HASH_STATIC_ROUTES: {
    route: string;
    view: string;
    panel: string;
}[] = [
    {
        route: "manual",
        view: "/",
        panel: "/manual"
    },
    {
        route: "license",
        view: "/",
        panel: "/license"
    }
];

class Cache {
    private readonly _values: Record<string, unknown> = {
    };

    public readonly trigger: object = {
    };

    constructor() {
        makeAutoObservable(this, undefined, {
            deep: true
        });
    }

    public set(id: string, value: unknown) {
        this._values[id] = value;
        (this as {trigger: object})["trigger"] = {
        };
    }

    public delete(id: string) {
        delete this._values[id];
    }

    public get<T>(id: string): T {
        return this._values[id] as T;
    }
}

class QueryParams {
    public readonly params: object;

    constructor() {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.href.substring(
            url.href.indexOf("?")
        ));

        this.params = Object.fromEntries(new URLSearchParams(params));
        const newUrl = url.origin + url.pathname;
        
        window.history.pushState({
        }, "", newUrl);
    }
}

class Session {
    private _appearance: AppearanceType | "auto" = "dark";

    public readonly cache = new Cache();
    public readonly query: QueryParams;
    public snackbar: JSX.Element | null = null;
    public popout: JSX.Element | null = null;

    public activeModal: string | null = null;
    public activeView = "/";
    public activePanel = "/";

    constructor() {
        makeAutoObservable(this);
        const hash = window.location.hash;
        
        const queryParamsStart = hash.indexOf("?");
        const route = hash.substring(1, queryParamsStart === -1 ? undefined : queryParamsStart);

        const page = HASH_STATIC_ROUTES.find(x => x.route === route);

        this.query = new QueryParams();
        if (!page) {
            return;
        }

        this.activeView = page.view;
        this.activePanel = page.panel;
    }

    public get appearance(): AppearanceType {
        if (this._appearance === "auto") {
            return window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        } else {
            return this._appearance;
        }
    }

    public setAppearance(appearance: Session["_appearance"]) {
        this._appearance = appearance;
    }

    public setSnackbar(snackbar: JSX.Element | null): void {
        this.snackbar = snackbar;
    }

    public setPopout(popout: JSX.Element | null, ms?: number): void {
        this.popout = popout;

        if (ms) {
            setTimeout(() => this.setPopout(null), ms);
        }
    }

    public setModal(modal: string | null, payload?: unknown): void {
        if (modal !== null && payload) {
            this.cache.set(`modal-${modal}`, payload);
        }
        this.activeModal = modal;
    }

    public setView(view: string | null) {
        this.activeView = view || "/";
        this.setPanel(null);
    }

    public setPanel(panel: string | null) {
        this.activePanel = panel || "/";
    }
}

export default new Session();
