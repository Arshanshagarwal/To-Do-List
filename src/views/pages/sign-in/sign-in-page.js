import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authActions } from "src/auth";
import Button from "src/views/components/button";

import "./sign-in-page.css";

const SignInPage = ({ signInWithGoogle }) => {
  return (
    <div className="g-row sign-in">
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>

        <Button className="sign-in__button" onClick={signInWithGoogle}>
          Google
        </Button>
      </div>
    </div>
  );
};

SignInPage.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signInWithGoogle: authActions.signInWithGoogle,
};

export default withRouter(connect(null, mapDispatchToProps)(SignInPage));
