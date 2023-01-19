// import modules
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectUserSession} from "../app/userSessionSlice.js";
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
            // state selector for session management
            {checking, savings, credit} = useSelector(selectUserAccount);

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
                <div className="header">
                    <h1>Welcome back<br />{ `${ session.firstName } ${ session.lastName }` }!</h1>
                    <button className="edit-button">Edit Name</button>
                </div>
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