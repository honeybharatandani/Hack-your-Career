import React from "react";
import logo1 from "./logo1.png";

const contentStyle = {
  marginTop: "-190px",
};

const Logo = () => {
  return (
    <div>
      <img style={contentStyle} width={300} src={logo1} alt="logo" />
    </div>
  );
};

export default Logo;
