import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/bookedActions";


const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const bookedSessionList = useSelector((state) => state.bookedSessionList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = bookedSessionList;

  useEffect(() => {
    dispatch(listMyOrders());

    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      //DISPATCH UPDATE PROFILE
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
     
      <Col md={12} >
        <h2>My Sessions</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Col>
            {orders === null ? (
              <Message>No Session Records</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Session</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.reverse().map((order) => (
                    <tr key={order._id}>
                      <td>1234</td>
                      <td>
                        {order.isConfirm ? (
                          <i
                            className="fas fa-check-circle"
                            style={{ color: "white" }}>
                            <span> Confirmed !</span>
                          </i>
                        ) : (
                          <i className="far fa-clock" style={{ color: "red" }}>
                            <span> Pending..</span>
                          </i>
                        )}{" "}
                      </td>
                      <td>
                        {order.sessionDone ? (
                          <i
                            className="fas fa-brain"
                            style={{ color: "white" }}>
                            <span> DONE</span>
                          </i>
                        ) : (
                          <i className="fas fa-brain" style={{ color: "red" }}>
                            <span> Scheduled</span>
                          </i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          {order.sessionDone ? (
                            <Button className="btn-sm" variant="sucess">
                              Join
                            </Button>
                          ) : (
                            <Button className="btn-sm" variant="success">
                              Join
                            </Button>
                          )}
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        )}
      </Col>
      <Col md={6}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="confrimPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confrim Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfrimPassword(e.target.value)
              }></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
