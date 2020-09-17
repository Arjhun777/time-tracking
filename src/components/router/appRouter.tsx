import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import { lazy } from "react";
// Dynamic Imports
const TimeTracker = lazy(() => import('../pageComponents/timeTracker/TimeTracker'));

// App routing configuration
const AppRouter = () => {
    return (
        <React.Suspense fallback={<h1>loading...</h1>}>
            <Switch>
                <Route path="/time-tracker" component={TimeTracker} />
                <Route path="/" component={TimeTracker} />
            </Switch>
        </React.Suspense>
    )
}

export default AppRouter;