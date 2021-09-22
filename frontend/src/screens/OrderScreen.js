import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getBookedDetails,
  confirmOrder,
  deliverOrder,
} from "../actions/bookedActions";
import {
  ORDER_CONFIRM_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/bookedSessionConstants";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const bookedDetails = useSelector((state) => state.bookedDetails);
  const { order, loading, error } = bookedDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderConfirm = useSelector((state) => state.orderConfirm);
  const { loading: loadingConfirm, success: successConfirm } = orderConfirm;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const meethandler = (e) => {
    window.open(bookedDetails.order.sessionItems[0].googleMeet);
  };
  useEffect(() => {
    if (!order || order._id !== orderId || successConfirm || successDeliver) {
      dispatch({ type: ORDER_CONFIRM_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getBookedDetails(orderId));
    }
  }, [dispatch, order, orderId, successConfirm, successDeliver]);

  const confirmHandler = () => {
    dispatch(confirmOrder(order));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Session Info</h2>
              <p>
                Name: <strong>{order.user.name}</strong>
                <br />
                Email: <strong>{order.user.email}</strong>
              </p>{" "}
              <p>
                <Message>
                  For the Counsellor : {order.sessionDetails.note}
                </Message>
                <Message variant="warning">
                  Scheduled Date :{order.sessionDetails.date}
                </Message>
                <Message variant="primary">
                  Scheduled Time :{order.sessionDetails.time}
                </Message>
                <Message variant="danger">
                  Scheduled For :{order.sessionDetails.forWhom}
                </Message>
              </p>
            </ListGroup.Item>
            {userInfo.isAdmin ? (
              <ListGroup.Item>
                <Link className="btn btn-danger my-3" to="/admin/orderlist">
                  Go Back
                </Link>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item>
                <Link className="btn btn-danger my-3" to="/profile">
                  Go Back
                </Link>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>

        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Vital Info</h2>
              {order.sessionItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={6}>
                      <Image
                        className="order_screen_img"
                        src={item.image}
                        alt={item.name}
                        fluid
                      />
                    </Col>
                    <Col>{item.name}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
              {order.sessionItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>
                      <span>Session : </span>
                      {order.isConfirm ? (
                        <i
                          className="fas fa-check-circle"
                          style={{ color: "green" }}>
                          <span> Confirmed !</span>
                        </i>
                      ) : (
                        <i className="far fa-clock" style={{ color: "red" }}>
                          <span> Yet to Be Confirmed</span>
                        </i>
                      )}{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              {order.sessionItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>
                      {order.sessionDone ? (
                        <Message variant="success">
                          Session status: Done at {order.sessionDetails.date}{" "}
                          {order.sessionDetails.time}
                        </Message>
                      ) : (
                        <Message variant="danger">
                          Session status: Scheduled for{" "}
                          {order.sessionDetails.date}{" "}
                          {order.sessionDetails.time}
                        </Message>
                      )}
                    </Col>
                    <Col>
                      <div>
                        {order.sessionDone ? (
                          <i
                            className="fas fa-brain"
                            style={{ color: "green" }}>
                            <span> DONE</span>
                          </i>
                        ) : (
                          <i className="fas fa-brain" style={{ color: "red" }}>
                            <span> Scheduled</span>
                          </i>
                        )}
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ListGroup.Item>
                <Row>
                  <Col>
                    {order.isConfirm ? (
                      <Button
                        onClick={meethandler}
                        disabled={
                          new Date(
                            order.sessionDetails.date +
                              " " +
                              order.sessionDetails.time,
                          ).getTime() > new Date().getTime() ||
                          order.sessionDone === true
                        }
                        className="btn btn-block">
                        Join
                      </Button>
                    ) : (
                      <Button className="btn btn-block" disabled>
                        Join
                      </Button>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              {loadingConfirm && <Loader />}

              {userInfo.isAdmin && !order.isConfirm && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={confirmHandler}>
                    Mark As Confirmed
                  </Button>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo.isAdmin && order.isConfirm && !order.sessionDone && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}>
                    Mark As Done
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
