// import modules
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../app/userSessionSlice.js";

const
    // init login page component
    LoginPage = props => {
        const
            // extract props
            {nul} = props,
            // dispatch hook
            dispatch = useDispatch(),
            // state persistence compliant navigation hook
            navigate = useNavigate(),
            // store email and password in component state
            [ email, setEmail ] = useState(``),
            [ password, setPassword ] = useState(``),
            // form submission handler
            userLogin = ev => {
                ev.preventDefault();
                // dispatch login action to the store
                dispatch(login({email, password}));
                // navigate to the account page ...
                navigate(`/account`);
            };

        // return component
        return <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={ userLogin }>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={ email } onChange={ e => setEmail(e.target.value) } />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={ password } onChange={ e => setPassword(e.target.value) } />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>;
    };

export default LoginPage;