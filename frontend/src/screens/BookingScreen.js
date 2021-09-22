import React, { useState } from "react";

import { Form, Button, Container, Col, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import bookImg from "../svg/booking.svg";
import FormContainer from "../components/FormContainer";
import { saveSessionDetails } from "../actions/sessionActions";

const BookingScreen = ({ history }) => {
  const session = useSelector((state) => state.session);
  const { sessionDetails } = session;

  const [note, setNote] = useState(sessionDetails.note);
  const [date, setDate] = useState(sessionDetails.date);
  const [time, setTime] = useState(sessionDetails.time);
  const [forWhom, setForWhom] = useState(sessionDetails.forWhom);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveSessionDetails({ note, date, time, forWhom }));
    //next page move
    history.push(`/bespeaking/`);
  };

  return (
    <>
      <Container>
        <Row>
          <Col md={10}>
            <FormContainer>
              <h1>Book Session</h1>

              <Form onSubmit={submitHandler}>
                {/*Note */}
                <Form.Group controlId="note">
                  <Form.Label>Note</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter note"
                    value={note}
                    required
                    onChange={(e) => setNote(e.target.value)}></Form.Control>
                </Form.Group>
                {/*date */}

                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter date"
                    value={date}
                    required
                    onChange={(e) => setDate(e.target.value)}></Form.Control>
                </Form.Group>
                {/*time */}

                <Form.Group controlId="time">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="Enter time"
                    value={time}
                    required
                    onChange={(e) => setTime(e.target.value)}></Form.Control>
                </Form.Group>
                {/*country */}
                <Form.Group controlId="forWhom">
                  <Form.Label>for Whom</Form.Label>
                  <Form.Control
                    type="text"
                    as="select"
                    className="my-1 mr-sm-2"
                    id="inlineFormCustomSelectPref"
                    custom
                    value={forWhom}
                    required
                    onChange={(e) => setForWhom(e.target.value)}>
                    <option value="0">Select...</option>
                    <option value="Self">Self</option>
                    <option value="Friend">A Friend</option>
                    <option value="Family">Family</option>
                  </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Continue
                </Button>
              </Form>
            </FormContainer>
          </Col>
          <Col className="login" md={2}>
            <Image className="loginImg" src={bookImg} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingScreen;
