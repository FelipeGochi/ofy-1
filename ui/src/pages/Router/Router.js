import React from "react";
import {
    BrowserRouter,
    Route, Switch
} from "react-router-dom";
import { Crust } from "../../components/organisms";
import Goal from "../../components/templates/Goal";
import Home from "../../components/templates/Home";
import Objective from "../../components/templates/Objective";
import Profile from "../../components/templates/Profile";

const routers = [
    { name: "home", path: "/", component: Home, exact: true },
    { name: "profile", path: "/profile", component: Profile },
    { name: "objective", path: "/objective/:id", component: Objective, exact: true },
    { name: "goal", path: "/objective/:idObjective/goal/:id", component: Goal, exact: true },
]

const Router = () => {
    if (window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        const next = urlParams.get('next');
        window.location.replace(`/app/${next.replace('/', '')}`)
    }

    return (
        <BrowserRouter basename={"/app"}>
            <Crust>
                <Switch>
                    {routers.map(router => (
                        <Route key={router.name}
                            path={router.path}
                            exact={router.exact}>
                            <router.component />
                        </Route>
                    ))}
                </Switch>
            </Crust>
        </BrowserRouter>
    )
};

export default Router