// import React from "react";
// import { Link } from "react-router-dom";
// import { Card, ListGroupItem, ListGroup } from "react-bootstrap";

// import Rating from "./Rating";

// const Counsellor = ({ counsellor }) => {
//   return (
//     <Card className="my-3 p-2 cardCoun">
//       <Card.Img className="cardImg" src={counsellor.image} variant="top" />

//       <Card.Body>
//         <Card.Title as="div">
//           <strong>{counsellor.name}</strong>
//         </Card.Title>

//         <Card.Text as="div">
//           <div className="my-3">
//             <Rating
//               value={counsellor.rating}
//               text={`${counsellor.numReviews} reviews`}
//             />
//           </div>
//         </Card.Text>
//       </Card.Body>
//       <ListGroup className="list-group-flush">
//         <ListGroupItem>
//           <Card.Subtitle className="mb-2 text-muted ctg">
//             {counsellor.category}
//           </Card.Subtitle>
//         </ListGroupItem>
//       </ListGroup>
//       <Link
//         className="btn btn-danger my-3 hbtn"
//         to={`/counsellor/${counsellor._id}`}>
//         Book Session
//       </Link>
//     </Card>
//   );
// };

// export default Counsellor;

import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import c1 from '../c1.png'

import Rating from "./Rating";

const Counsellor = ({ counsellor }) => {
  return (
    <Card className="my-3 p-2 cardCoun" style={{background: 'green'}}>
      <Card.Img className="cardImg" src={c1} variant="top" />

      <Card.Body>
        <Card.Title as="div">
          <strong>John</strong>
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
        <ListGroupItem style={{background: 'green', borderRadius:'3px'}}>
          <Card.Subtitle className="mb-2 text-muted ctg" style={{color:'white'}}>
            {counsellor.category}
          </Card.Subtitle>
        </ListGroupItem>
      </ListGroup>
      <Link
        className="btn btn-danger my-3 hbtn"
        to={`/counsellor/${counsellor._id}`}>
        Book 
      </Link>
    </Card>
  );
};

export default Counsellor;
