import React, { useState } from "react";

import { Login } from "../../component/Login/Login";
//import { SignUpForm } from "../../component/SignUpForm/SignUpForm";
import { AlreadyMember } from "../../component/SignUpForm/AlreadyMember";

import "./Welcome.css";

export const Welcome = (props) => {
  const [showLogin, setShowLogin] = useState(props.showLogin ?? true);

  return (
    <div>
      <div className="welcome__alreadyMember">
        <AlreadyMember showLogin={showLogin} setShowLogin={setShowLogin} />
      </div>
      <div className="welcome__leftPanel"></div>
      <div className="welcome__rightPanel">
        {/*showLogin ? <Login /> : <SignUpForm setShowLogin={setShowLogin} />*/}
        {showLogin && <Login />}
      </div>
    </div>
  );
};
