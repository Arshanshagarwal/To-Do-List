import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../button";
import Icon from "../icon";

import "./header.css";

const openHelp = () => {
  console.log("hfkshdkfjks");
};

const Header = ({ authenticated, signOut }) => (
  <header className="header">
    <div className="g-row head-title-container">
      <h1 className="header__title">To-Do List</h1>
      {/* <button onClick={openHelp} className="help-button">
        <Icon name="help_outline" className="help-icon" />
      </button> */}
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
