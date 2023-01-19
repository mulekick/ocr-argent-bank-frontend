// import modules
import React from "react";
// eslint-disable-next-line node/file-extension-in-import
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store} from "./js/app/store.js";

// import components
import Rooter from "./js/components/router.jsx";

// import styles
import "./css/main.css";

createRoot(document.getElementById(`root`))
    .render(
        <React.StrictMode>
            <Provider store={store}>
                <Rooter />
            </Provider>
        </React.StrictMode>
    );