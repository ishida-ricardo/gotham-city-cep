import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from './components/Login';
import CepList from './components/CepList';
import CepForm from './components/CepForm';

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/ceps/create" component={CepForm} />
        <PrivateRoute path="/ceps" component={CepList} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;