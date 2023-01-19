// import modules
import {useEffect} from "react";
import {Outlet, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {profile, logout, selectUserSession} from "../app/userSessionSlice.js";
import {reset} from "../app/userAccountSlice.js";

// import assets
import logo from "../../img/argentBankLogo.png";

const
    // init general app layout
    Layout = props => {
        const
            // extract props
            {error} = props,
            // dispatch hook
            dispatch = useDispatch(),
            // state selector for session management
            session = useSelector(selectUserSession);

        // retrieve user profile
        useEffect(() => {
            // dispatch profile action to the store
            session.sessionToken && dispatch(profile(session.sessionToken));
        // trigger the effect once login has succeeded
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ session.loggedIn ]);

        // return component
        return <>
            <nav className="main-nav">
                <Link className="main-nav-logo" to={ `/` }>
                    <img className="main-nav-logo-image" src={ logo } alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                {
                    /* conditional rendering depending on state value
                     * obviously, the state is not persisted on logout
                     * so there's no need to use the navigate hook ...
                     */
                    session.loggedIn ?
                        <div>
                            <Link className="main-nav-item" to={ `/account` }>
                                <i className="fa fa-user-circle"></i>
                                &nbsp;{ session.firstName }
                            </Link>
                            <Link className="main-nav-item" to={ `/` } onClick={() => {
                                // wipe state from account information
                                dispatch(reset());
                                // log out user ...
                                dispatch(logout());
                            }}>
                                <i className="fa fa-sign-out"></i>
                                &nbsp;Sign Out
                            </Link>
                        </div> :
                        <div>
                            <Link className="main-nav-item" to={ `/login` }>
                                <i className="fa fa-user-circle"></i>
                                &nbsp;Sign In
                            </Link>
                        </div>
                }
            </nav>
            {
                /* display the error in the general navigation context ... */
                error ? <p>an error occured</p> : <Outlet />
            }
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </>;
    };

export default Layout;

