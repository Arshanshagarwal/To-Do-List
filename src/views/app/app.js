import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";

import { authActions, getAuth } from "src/auth";
import Header from "../components/header";
import RequireAuthRoute from "../components/require-auth-route";
import RequireUnauthRoute from "../components/require-unauth-route";
import SignInPage from "../pages/sign-in";
import About from "../pages/about";
import TasksPage from "../pages/tasks";

const App = ({ authenticated, signOut }) => (
  <div className="todo-body">
    <Header authenticated={authenticated} signOut={signOut} />

    <main>
      <RequireAuthRoute
        authenticated={authenticated}
        exact
        path="/"
        component={TasksPage}
      />
      <RequireUnauthRoute
        authenticated={authenticated}
        path="/sign-in"
        component={SignInPage}
      />
      <Route path="/about" component={About} />
    </main>
  </div>
);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = getAuth;

const mapDispatchToProps = {
  signOut: authActions.signOut,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
