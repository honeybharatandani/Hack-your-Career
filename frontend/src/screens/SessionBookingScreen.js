import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import Message from "../components/Message";
import { addSession, removeFromSession } from "../actions/sessionActions";

const SessionBookingScreen = ({ match, history }) => {
  const counsellorId = match.params.id;

  const dispatch = useDispatch();

  const session = useSelector((state) => state.session);
  const { sessionItems } = session;

  useEffect(() => {
    if (counsellorId) {
      dispatch(addSession(counsellorId));
    }
  }, [dispatch, counsellorId]);

  const removeHandler = (id) => {
    dispatch(removeFromSession(id));
  };

  const bookHandler = () => {
    history.push("/login?redirect=confirm");
  };

  return (
    <Row>
      <Col md={12}>
        <h1>Session Booking</h1>
        {sessionItems.length === 0 ? (
          <Message>
            No sessions to confirm | <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {sessionItems.map((item) => (
              <ListGroup.Item key={item.counsellor}>
                <Row>
                  <Col md={2}>
                    <Image
                      className="sessionImg"
                      src={item.image}
                      alt={item.name}
                      fluid></Image>
                  </Col>
                  <Col md={2}>
                    <Link to={`/counsellor/${item.counsellor}`}>
                      {item.name}
                    </Link>
                    <br />
                    {item.availability}
                  </Col>
                  <Col md={4}>
                    <span>Working Hours</span>
                    <br />
                    {item.workingHrs}
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="dark"
                      onClick={() => removeHandler(item.counsellor)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="dark"
                      className="btn-block"
                      disabled={sessionItems.length === 0}
                      onClick={bookHandler}>
                      Continue
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default SessionBookingScreen;
