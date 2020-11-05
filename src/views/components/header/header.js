import React from "react";
import PropTypes from "prop-types";
import Button from "../button";

import "./header.css";

const Header = ({ authenticated, signOut }) => (
  <header className="header">
    <div className="g-row">
      <h1 className="header__title">To-Do List</h1>
    </div>
    <div className="g-row btn-container">
      {authenticated ? (
        // <li>
        <Button onClick={signOut}>Sign out</Button>
      ) : // </li>
      null}
    </div>
  </header>
);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Header;
