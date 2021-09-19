import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import logIn from "../svg/logIn.svg";
import Aos from "aos";
import "aos/dist/aos.css";

//screen
const SigninScreen = ({ location, history }) => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  return (
    <Container>
      <Row data-aos="zoom-out">
        <Col md={8}>
          <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New User ?
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Col>
        <Col md={4} className="login">
          <Image
            data-aos="flip-right"
            className="logIn"
            width={500}
            src={logIn}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SigninScreen;
