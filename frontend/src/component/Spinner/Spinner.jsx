import React from "react";

import logo from "../../images/logo.png";
import "./Spinner.css";

export const Spinner = () => {
  return (
    <div className="Book__centered">
      <div className="spinner">
        <img src={logo} className="loader" alt="Loading" />
        <div className="spinner spinner__header">
          Songbo<b>0</b>ok
        </div>
      </div>
    </div>
  );
};
