import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";

import Rating from "./Rating";

const Counsellor = ({ counsellor }) => {
  return (
    <Card className="my-3 p-2 cardCoun">
      <Card.Img className="cardImg" src={counsellor.image} variant="top" />

      <Card.Body>
        <Card.Title as="div">
          <strong>{counsellor.name}</strong>
        </Card.Title>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={counsellor.rating}
              text={`${counsellor.numReviews} reviews`}
            />
          </div>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <Card.Subtitle className="mb-2 text-muted ctg">
            {counsellor.category}
          </Card.Subtitle>
        </ListGroupItem>
      </ListGroup>
      <Link
        className="btn btn-danger my-3 hbtn"
        to={`/counsellor/${counsellor._id}`}>
        Book Session
      </Link>
    </Card>
  );
};

export default Counsellor;
