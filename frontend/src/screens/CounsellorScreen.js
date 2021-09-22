import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Counsellor from "../components/Counsellor";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listCounsellors } from "../actions/counsellorActions";

const CounsellorScreen = ({ history }) => {
  const dispatch = useDispatch();

  const counsellorList = useSelector((state) => state.counsellorList);
  const { loading, error, counsellors } = counsellorList;

  console.log('CC',counsellors);
  console.log(loading);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listCounsellors());
    }

  }, [dispatch, history, userInfo]);

  return (
    <>
      <h3>Select your Counsellors</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="warning">{error}</Message>
      ) : (
        <Row style={{background: 'white'}}>
          {counsellors.map((counsellor) => (
            <Col key={counsellor._id} sm={10} md={4} lg={4} xl={2}>
              <Counsellor counsellor={counsellor} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default CounsellorScreen;
