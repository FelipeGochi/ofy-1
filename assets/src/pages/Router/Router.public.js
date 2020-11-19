import React from "react";
import {
    BrowserRouter,
    Route, Switch
} from "react-router-dom";
import Login from "../../components/templates/Login";
import PasswordRecovery from "../../components/templates/PasswordRecovery";
import Recovery from "../../components/templates/Recovery";
import Signup from "../../components/templates/Signup";
import Verify from "../../components/templates/Verify";

const routers = [
    { name: "login", path: "/", component: Login },
    { name: "signup", path: "/signup", component: Signup },
    { name: "verify", path: "/verify/:token", component: Verify },
    { name: "password-recovery", path: "/password-recovery", component: PasswordRecovery },
    { name: "recovery", path: "/recovery/:token", component: Recovery },
]

const RouterPublic = () => {
    const local = window.location.pathname.split('/app')[1]

    if (local !== '/' && !window.location.search && !routers.find(route => local.includes(route.name))) {
        window.location.replace(`/app?next=${local}`)
    }

    return (
        <BrowserRouter basename={"/app"}>
            <Switch>
                {routers.map(router => (
                    <Route exact key={router.name} path={router.path}>
                        <router.component />
                    </Route>
                ))}
            </Switch>
        </BrowserRouter>
    )
};

export default RouterPublic