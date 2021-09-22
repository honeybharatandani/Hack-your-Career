import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";

const contentStyle = {
  marginTop: "220px",
  height: "250px",
  width: "400px",
  marginLeft: "100px",
};
// const contentStyle1 = {
//   marginLeft: "200px",
//   height: "250px",
//   width: "400px",
//   marginTop: "200px",
// };

const Images = () => {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);
  return (
    <div>
      {/* <Image
        style={contentStyle1}
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        src="https://www.dheya.com/wp-content/uploads/2021/01/college-student-career-counselling-600x310.png"
        alt="img"
      /> */}
      <Image
        style={contentStyle}
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
        src="https://www.univariety.com/app/themes/uni_new/images/home_header_mimg.png"
        alt="img"
      />
    </div>
  );
};

export default Images;
