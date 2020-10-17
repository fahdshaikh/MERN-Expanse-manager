import React from 'react';
import { Route, Switch } from "react-router";
import SignIn from "./Signin";
import SignUp from './Signup';
// import Dashboard from './Dashboard';
import Dashboard from './Dashboard/Dashboard';
import Ledger from './Ledger'
import ExpenseManager from './ExpenseManager'


function Routes(){
    return (
        <Switch>
            <Route exact path="/">
                <SignIn />
            </Route>

            <Route path="/register">
                <SignUp></SignUp>
            </Route>

            <Route  exact path="/ExpenseManager">
                <ExpenseManager></ExpenseManager>
            </Route>

            <Route exact path="/ExpenseManager/ledger">
                <Ledger></Ledger>
            </Route>
            

        </Switch>
)}
export default Routes