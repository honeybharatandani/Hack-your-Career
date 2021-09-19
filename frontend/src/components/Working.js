import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import React, { useState, useEffect } from "react";
import work from "../svg/work.svg";
import { Image } from "react-bootstrap";
import process from "../svg/process.svg";
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

  const contentStyle2 = {
    marginLeft: "100px",
    marginTop: "80px",
  };

  const contentStyle3 = {
    marginLeft: "500px",
    marginTop: "200px",
  };
  return (
    <div style={contentStyle2}>
      <Button
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        type="primary"
        onClick={showModal}
      >
        <h6> How It Works</h6>
      </Button>
      <Modal
        title="How the WEBSITE Works"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Image width={200} src={process} />
        <hr />
        <p>User has to first Login to the website</p>
        <hr />
        <p>............</p> <hr />
        <p>............</p> <hr />
        <p>............</p> <hr />
        <p>............</p> <hr />
        <p>............</p> <hr />
        {/* <p>............</p> <hr />
        <p>............</p> <hr />
        <p>............</p> <hr />
        <p>............</p> <hr /> */}
      </Modal>
      <Image
        data-aos="fade-left"
        style={contentStyle3}
        width={400}
        src={work}
      />
    </div>
  );
};
export default Working;
