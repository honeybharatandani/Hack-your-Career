import React, { useEffect } from "react";
import "./About.css";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <div className="about">
        <h1
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          About Us
        </h1>
        <p> ❖ Hello, wishes from Hackyourcareer.com </p>
        <p>
          ❖ Hack Your Career is a <b>website</b> where you can build your
          career.through proper guidance & support of an &nbsp;
          <b>Expert/Counselor.</b>
        </p>
        <p>
          ❖ Here we support you to <b>build</b> your career according to your{" "}
          <strong>abilities And Interest.</strong>
        </p>
        <br />
        <h3>
          Are your confused about your Future goals? Here is simple way to find
          it what your goals are , what are your Hobbies , Ability, Qualities.
          Connect with the most Trusted Counselors/Experts in India. follow
          these steps -
        </h3>
        <ul>
          <li>LogIn</li>
          <li>Select Counselor</li>
          <li>Book Session according to your Time and Date</li>
          <li>
            Join Directly to the <b>Meeting</b>, as per Scheduled with your
            Counselor 🙂
          </li>
        </ul>
        <hr />
        <LinkContainer to="/login">
          <Nav.Link>
            <button
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="logBtn"
            >
              &nbsp; LogIn/Register
            </button>
          </Nav.Link>
        </LinkContainer>
      </div>
    </div>
  );
}
