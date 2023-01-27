// import modules
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {update, selectUserSession} from "../app/userSessionSlice.js";
import {info, selectUserAccount} from "../app/userAccountSlice.js";

const
    // init account page component
    AccountPage = props => {
        const
            // extract props
            {nul} = props,
            // dispatch hook
            dispatch = useDispatch(),
            // state selector for user session management
            session = useSelector(selectUserSession),
            // state selector for user account management
            {list} = useSelector(selectUserAccount),
            // store edit mode indication + first name and last name modifications in component state
            [ edit, setEdit ] = useState(false),
            [ firstName, setFirstName ] = useState(session.firstName),
            [ lastName, setLastName ] = useState(session.lastName),
            // form submission handler
            userUpdate = ev => {
                ev.preventDefault();
                // dispatch update action to the store
                dispatch(update({
                    firstName: firstName,
                    lastName: lastName,
                    token: session.sessionToken
                }));
                // set edit mode to false ...
                setEdit(false);
            },
            // submission cancellation handler
            cancelUpdate = ev => {
                // avoid console warnings
                ev.preventDefault();
                // set edit mode to false ...
                setEdit(false);
            };

        // retrieve user account information
        useEffect(() => {
            // dispatch profile action to the store
            session.sessionToken && dispatch(info(session.sessionToken));
        // trigger the effect once login has succeeded
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ session.loggedIn ]);

        // retrieve user identity information
        useEffect(() => {
            // sync the local state with the global store state
            setFirstName(session.firstName);
            setLastName(session.lastName);
        // trigger the state update once store values are updated
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ session.firstName, session.lastName ]);

        // conditional rendering depending on state value
        return session.loggedIn ?
            <main className="main bg-dark">
                {
                    edit ?
                        <div className="header">
                            <form onSubmit={ userUpdate }>
                                <h1>Welcome back</h1>
                                <div className="name-update">
                                    <span>
                                        <input type="text" value={ firstName } onChange={ e => setFirstName(e.target.value) } required />
                                        <input type="text" value={ lastName } onChange={ e => setLastName(e.target.value) } required />
                                    </span>
                                    <span>
                                        <button type="submit" className="edit-button">Save</button>
                                        <button className="edit-button" onClick={ cancelUpdate }>Cancel</button>
                                    </span>
                                </div>
                            </form>
                        </div> :
                        <div className="header">
                            <h1>Welcome back<br />{ `${ firstName } ${ lastName }` }!</h1>
                            <button className="edit-button" onClick={ () => setEdit(true) }>Edit Name</button>
                        </div>
                }
                <h2 className="sr-only">Accounts</h2>
                { /* conditional rendering */}
                {
                    list ?
                        list.map((x, i) => {
                            const
                                // extract account informations
                                {type, number, currency, balance, description} = x;

                            // return section
                            return <section key={ i } className="account">
                                <div className="account-content-wrapper">
                                    <h3 className="account-title">Argent Bank { type } ({ number })</h3>
                                    <p className="account-amount">{ new Intl.NumberFormat(`en-US`, {style: `currency`, currency: currency}).format(balance) }</p>
                                    <p className="account-amount-description">{ description }</p>
                                </div>
                                <div className="account-content-wrapper cta">
                                    <button className="transaction-button">View transactions</button>
                                </div>
                            </section>;
                        }) :
                        null
                }
            </main> :
            null;
    };

export default AccountPage;