import {configureStore} from "@reduxjs/toolkit";
import {userSessionReducer} from "./userSessionSlice.js";
import {userAccountReducer} from "./userAccountSlice.js";

const store = configureStore({
    reducer: {
        // session reducer
        session: userSessionReducer,
        // account reducer
        account: userAccountReducer
    }
});

export {store};