// import modules
import {createBrowserRouter, RouterProvider} from "react-router-dom";

// import components
import Layout from "./layout.jsx";
import Home from "./home.jsx";
import LoginPage from "./login.jsx";
import AccountPage from "./account.jsx";

const
    // init router
    router = createBrowserRouter([
        {
            path: `/`,
            // init / route
            element: <Layout />,
            // init error handling page
            errorElement: <Layout error={ true } />,
            // each subroute will return the <main> element
            children: [ {
                // default outlet for route / (home page)
                index: true,
                element: <Home />
            }, {
                // default outlet for route /login (login page)
                path: `login`,
                element: <LoginPage />
            }, {
                // default outlet for route /account (account page)
                path: `account`,
                element: <AccountPage />
            } ]
        }
    ]),
    // create router function component
    Rooter = () => <RouterProvider router={ router } />;

export default Rooter;