import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import React, { useState, useEffect } from "react";
import process from "../svg/process.svg";
import { Image } from "react-bootstrap";
import thoughts from "../svg/thoughts.svg";
import Aos from "aos";
import "aos/dist/aos.css";

const Working = () => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const contentStyle2 = {
  //   display: "flex",
  // };

  // const contentStyle4 = {
  //   marginLeft: "40%",
  // };

  // const contentStyle3 = {
  //   marginLeft: "10%",
  // };
  return (
    <div>
      <Image
        // style={contentStyle2}
        data-aos="fade-down"
        data-aos-duration="1500"
        width={300}
        src={process}
      />

      <Button
        // style={contentStyle4}
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        type="primary"
        onClick={showModal}
      >
        <h2>How the Website Works</h2>

        {/* <h6> How It Works</h6> */}
      </Button>
      <Modal
        title="How the WEBSITE Works"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={710}
      >
        <p>
          <b>step 1-</b>
          User has to Login
        </p>
        <br />
        <p>
          <b>Step 2-</b>
          See all Counselors
        </p>
        <br />

        <p>
          <b>Step 3-</b>
          Book Sessions
        </p>
        <br />

        <p>
          <b>Step 4-</b>
          Select Time & Date for the Meet with Counselors
        </p>
        <br />

        <p>
          <b>Step 5-</b>
          It will show details when Meet is scheduled
        </p>
        <br />

        <p>
          <b>Step 6-</b>
          Sessions Scheduled Info
        </p>
        <br />

        <p>
          <b>Step 7-</b>
          It will Take them Directly for Joining the Session to <b>Zoom/Meet</b>
        </p>
        <br />

        <hr />
        <strong>
          <b> &nbsp; &nbsp; &nbsp; &nbsp; THANK YOU !!!</b>
        </strong>
      </Modal>
      <Image
        data-aos="fade-left"
        // style={contentStyle3}
        width={400}
        src={thoughts}
      />
    </div>
  );
};
export default Working;
