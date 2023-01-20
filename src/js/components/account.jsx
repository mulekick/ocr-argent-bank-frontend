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
            // state selector for session management
            session = useSelector(selectUserSession),
            // state selector for account management
            {checking, savings, credit} = useSelector(selectUserAccount),
            // store edit mode indication + first name and last name modifications in component state
            [ edit, setEdit ] = useState(false),
            [ firstName, setFirstName ] = useState(null),
            [ lastName, setLastName ] = useState(null),
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

        // conditional rendering depending on state value
        return session.loggedIn && checking && savings && credit ?
            <main className="main bg-dark">
                {
                    edit ?
                        <div className="header">
                            <form onSubmit={ userUpdate }>
                                <h1>Welcome back</h1>
                                <div className="name-update">
                                    <span>
                                        <input type="text" placeholder={ session.firstName } onChange={ e => setFirstName(e.target.value) } required />
                                        <input type="text" placeholder={ session.lastName } onChange={ e => setLastName(e.target.value) } required />
                                    </span>
                                    <span>
                                        <button type="submit" className="edit-button">Save</button>
                                        <button className="edit-button" onClick={ cancelUpdate }>Cancel</button>
                                    </span>
                                </div>
                            </form>
                        </div> :
                        <div className="header">
                            <h1>Welcome back<br />{ `${ session.firstName } ${ session.lastName }` }!</h1>
                            <button className="edit-button" onClick={ () => setEdit(true) }>Edit Name</button>
                        </div>
                }
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{ checking.title }</h3>
                        <p className="account-amount">{ checking.balance }</p>
                        <p className="account-amount-description">{ checking.description }</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{ savings.title }</h3>
                        <p className="account-amount">{ savings.balance }</p>
                        <p className="account-amount-description">{ savings.description }</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{ credit.title }</h3>
                        <p className="account-amount">{ credit.balance }</p>
                        <p className="account-amount-description">{ credit.description }</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main> :
            null;
    };

export default AccountPage;