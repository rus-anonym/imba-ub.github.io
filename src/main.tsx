import React from "react";
import ReactDOM from "react-dom/client";

import "@vkontakte/vkui/dist/cssm/styles/themes.css";
import App from "./App";

import "./CSS/disableScrollBar.css";
import "./CSS/disableTextSelection.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
