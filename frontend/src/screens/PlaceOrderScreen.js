import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import formImg from "../svg/form.svg";

import { createBooking } from "../actions/bookedActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);

  const bookedCreate = useSelector((state) => state.bookedCreate);
  const { order, success, error } = bookedCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderhandler = () => {
    console.log(session.sessionItems);
    dispatch(
      createBooking({
        sessionItems: session.sessionItems,
        sessionDetails: session.sessionDetails,
      }),
    );
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Session Info</h2>
              <p>
                <Message>
                  For the Counsellor : {session.sessionDetails.note}
                </Message>
                <Message variant="warning">
                  Scheduled Date :{session.sessionDetails.date}
                </Message>
                <Message variant="primary">
                  Scheduled Time :{session.sessionDetails.time}
                </Message>
                <Message variant="danger">
                  Scheduled For :{session.sessionDetails.forWhom}
                </Message>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Vital Info</h2>
              <p>
                <Message>
                  Some Information about the session before one confirms it like
                  the session will be held over google meet and the link will be
                  available once the session requst gets confirmed
                </Message>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Link className="btn btn-danger my-3" to="/confirm">
                Go Back
              </Link>
              <Button
                className="btnImp"
                type="button"
                onClick={placeOrderhandler}>
                Confirm
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col className="formColImg" md={6}>
          <Image className="formImg" src={formImg} />
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
