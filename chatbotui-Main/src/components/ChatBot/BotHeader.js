import React from "react";
import logo from "../../Images/brilworks-logo.png";

const BotHeader = () => {
  return (
    <div className="bot-header">
      <div className="bot-header-logo">
        <img src={logo} alt="Brilbot" />
      </div>
      <div className="">
        <h1 className="logo-name">Brilbot</h1>
        <h3 className="logo-text">Start the conversation</h3>
      </div>
    </div>
  );
};

export default BotHeader;
