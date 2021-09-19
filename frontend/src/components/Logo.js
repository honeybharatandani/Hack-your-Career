import React from "react";
import logo from "./logo.png";

const contentStyle = {
  marginTop: "-190px",
};

const Logo = () => {
  return (
    <div>
      <img style={contentStyle} width={300} src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
