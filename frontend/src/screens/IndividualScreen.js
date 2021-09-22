import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listCounsellorDetails } from "../actions/counsellorActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const IndividualScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const counsellorDetails = useSelector(state => state.counsellorDetails);
  const { loading, error, counsellor } = counsellorDetails;
  useEffect(() => {
    dispatch(listCounsellorDetails(match.params.id));
  }, [dispatch, match]);

  const bookSessionHandler = () => {
    history.push(`/sessions/${match.params.id}`);
  };
  return (
    <>
      <Link className="btn btn-danger my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={counsellor.image} alt={counsellor.name} fluid />
          </Col>
          <Col md={6}>
            <Col md={12}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{counsellor.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={counsellor.rating}
                    text={`${counsellor.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {counsellor.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={12}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {counsellor.availability === "available" ? (
                          <span className="available">available</span>
                        ) : (
                          <span className="unavailable">unavailale</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Working Days:</Col>
                      <Col>
                        <span>{counsellor.working}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Working Hours:</Col>
                      <Col>
                        <span>{counsellor.workingHrs}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      onClick={bookSessionHandler}
                      className="btn-block"
                      type="button"
                      disabled={counsellor.availability !== "available"}
                    >
                      Book Session
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Col>
        </Row>
      )}
    </>
  );
};

export default IndividualScreen;
