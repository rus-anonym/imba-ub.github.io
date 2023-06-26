import { AppearanceType } from "@vkontakte/vk-bridge";
import { makeAutoObservable } from "mobx";

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
        const params = new URLSearchParams(url.search);

        this.params = Object.fromEntries(new URLSearchParams(params));
        const newUrl = url.origin + url.pathname;
        
        window.history.pushState({
        }, "", newUrl);
    }
}

class Session {
    private _appearance: AppearanceType | "auto" = "dark";

    public readonly cache = new Cache();
    public readonly query = new QueryParams();
    public snackbar: JSX.Element | null = null;
    public popout: JSX.Element | null = null;

    public activeModal: string | null = null;
    public activeView = "/";
    public activePanel = "/";

    constructor() {
        makeAutoObservable(this);
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
