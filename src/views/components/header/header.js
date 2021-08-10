import React from "react";
import PropTypes from "prop-types";
import Button from "../button";

import "./header.css";

const Header = ({ authenticated, signOut }) => (
  <header className="header">
    <div className="title-background"></div>
    <div className="g-row head-title-container">
      <h1 className="header__title"></h1>
    </div>
    <div className="g-row btn-container">
      {authenticated ? <Button onClick={signOut}>Sign out</Button> : null}
    </div>
  </header>
);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Header;
