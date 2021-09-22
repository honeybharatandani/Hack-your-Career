import React, { useEffect } from "react";
// import love from "../svg/love.svg";
import Aos from "aos";
import "aos/dist/aos.css";
// import { Image } from "react-bootstrap";
// import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

// const contentStyle = {
//   marginLeft: "1300px",
//   marginTop: "-60px",
//   cursor: "pointer",
// };

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div>
      <footer class="p-8  text-black text-center fixed-bottom">
        <div class="container">
          {/* <Image
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            className="love"
            width={200}
            src={love}
          /> */}
          <hr />
          <p class="lead">
            Copyright &copy; 2021 Hack Your Career | Rights reserved
          </p>
          {/* <div style={contentStyle} onClick={() => window.scroll(0, 0)}>
            <ArrowCircleUpIcon /> */}
        </div>
        {/* </div> */}
      </footer>
    </div>
  );
};

export default Footer;
