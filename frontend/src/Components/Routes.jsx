import React from 'react';
import { Route, Switch } from "react-router";
import SignIn from "./Signin";
import SignUp from './Signup';
import Dashboard from './Dashboard';


function Routes(){
    return (
        <Switch>
            <Route exact path="/">
                <SignIn />
            </Route>

            <Route path="/register">
                <SignUp></SignUp>
            </Route>

            <Route path="/dashboard">
                <Dashboard></Dashboard>
            </Route>

        </Switch>
)}
export default Routes