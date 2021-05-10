import React from "react";
import logo from "../logo.png";
import "./stylesheets/Header.css";

const Title = () => {
  return (
    <div className="App-header">
      <img src={logo} alt="logo" />
      <h1>The Shoppies</h1>
    </div>
  );
};

export default Title;
