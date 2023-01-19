import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const
    // perform async request to server to provide credentials and retrieve a session token ...
    login = createAsyncThunk(
        `userSession/login`,
        async credentials => {
            const
                // read credentials
                {email, password} = credentials,
                // async authentication request
                readable = await fetch(`http://192.168.1.26:3001/api/v1/user/login`, {
                    method: `POST`,
                    headers: {"Content-Type": `application/x-www-form-urlencoded`},
                    // eslint-disable-next-line node/prefer-global/url-search-params
                    body: new URLSearchParams(`email=${ email }&password=${ password }`)
                }),
                // read response
                payload = await readable.json();
            // the returned value becomes the `fulfilled` action payload
            return payload;
        }
    ),
    // perform async request to server to retrieve user profile ...
    profile = createAsyncThunk(
        `userSession/profile`,
        async token => {
            const
                // async authentication request
                readable = await fetch(`http://192.168.1.26:3001/api/v1/user/profile`, {
                    method: `POST`,
                    headers: {Authorization: `Bearer ${ token }`}
                }),
                // read response
                payload = await readable.json();
            // the returned value becomes the `fulfilled` action payload
            return payload;
        }
    ),
    // create a slice to manage the user session
    userSessionSlice = createSlice({
        // slice name
        name: `userSession`,
        // initial state for the slice
        initialState: {
            loggedIn: false,
            sessionToken: null,
            firstName: null,
            lastName: null
        },
        // reducers for the slice (create reducers and export action creator functions)
        reducers: {
            logout: state => {
                // the slice manages a stateless client-side session using a jwt ...
                state.loggedIn = false;
                state.sessionToken = null;
                state.firstName = null;
                state.lastName = null;
            }
        },
        // external reducers (import actions and create reducers for the slice)
        extraReducers: builder => {
            builder
                .addCase(login.fulfilled, (state, action) => {
                    // update
                    state.loggedIn = true;
                    state.sessionToken = action.payload.body.token;
                })
                .addCase(login.rejected, (state, action) => {
                    // rest to initial state
                    state.loggedIn = false;
                    state.sessionToken = null;
                })
                // profile promise states ...
                .addCase(profile.fulfilled, (state, action) => {
                    // update
                    state.firstName = action.payload.body.firstName;
                    state.lastName = action.payload.body.lastName;
                })
                .addCase(profile.rejected, (state, action) => {
                    // rest to initial state
                    state.firstName = null;
                    state.lastName = null;
                });
        }
    }),
    // retrieve the action creator function from the slice reducer (action type : userSession/logout)
    {logout} = userSessionSlice.actions,
    // retrieve the global reducer function for the slice
    userSessionReducer = userSessionSlice.reducer,
    // state selector for use session slice
    selectUserSession = state => state.session;

// action creators and slice reducer are now available for export.
export {login, logout, profile, userSessionReducer, selectUserSession};
