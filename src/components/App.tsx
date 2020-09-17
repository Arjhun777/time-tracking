import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/appRouter";
import ErrorBoundary from "./resuableComponents/errorBoundary/ErrorBoundary";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/home/timeTracker.service";

const App = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary history={history}>
                <ApolloProvider client={client}>
                    <AppRouter />   
                </ApolloProvider>
            </ErrorBoundary>
        </BrowserRouter>
    )
}

export default App;