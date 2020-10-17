import React from "react";
import { Route, Switch } from "react-router-dom";
import  Dashboard  from "./Dashboard/Dashboard";
import Ledger from "./Ledger";
import { SiteLayout } from "./SiteLayout";

export default function ExpenseManager() {
  return (
    <>
      <SiteLayout>
        <Switch>
          <Route path="/ExpenseManager" exact render={() => <Dashboard />} />
          <Route path="/ExpenseManager/Ledger" exact render={() => <Ledger />} />
        </Switch>
      </SiteLayout>
    </>
  );
}

// export { ExpenseManager };
