import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const
    // perform async request to server to retrieve user accounts info ...
    info = createAsyncThunk(
        `userAccount/info`,
        async token => {
            const
                // async authentication request
                readable = await fetch(`/ocr-argent-bank-frontend/data/mock.user.accounts.json`, {
                    method: `GET`,
                    // this won't hurt even if it actually does nothing lol
                    headers: {Authorization: `Bearer ${ token }`}
                }),
                // read response
                payload = await readable.json();
            // the returned value becomes the `fulfilled` action payload
            return payload;
        }
    ),
    // create a slice to manage the user accounts
    userAccountSlice = createSlice({
        // slice name
        name: `userAccount`,
        // initial state for the slice
        initialState: {
            // starting with an empty list that will be
            // updated with data from the mock after login ...
            list: []
        },
        // reducers for the slice (create reducers and export action creator functions)
        reducers: {
            reset: state => {
                // reset to initial state
                state.list = [];
            }
        },
        // external reducers (import actions and create reducers for the slice)
        extraReducers: builder => {
            builder
                .addCase(info.fulfilled, (state, action) => {
                    // update
                    state.list = action.payload;
                })
                .addCase(info.rejected, (state, action) => {
                    // reset to initial state
                    state.list = [];
                });
        }
    }),
    // retrieve the action creator function from the slice reducer (action type : userAccount/reset)
    {reset} = userAccountSlice.actions,
    // retrieve the global reducer function for the slice
    userAccountReducer = userAccountSlice.reducer,
    // state selector for user account slice
    selectUserAccount = state => state.account;

// action creators and slice reducer are now available for export.
export {info, reset, userAccountReducer, selectUserAccount};
