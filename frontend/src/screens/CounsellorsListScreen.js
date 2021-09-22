import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listCounsellors,
  deleteCounsellor,
  createCounsellor,
} from "../actions/counsellorActions";
import { COUNSELLOR_CREATE_RESET } from "../constants/counsellorConstants";

const CounsellorsListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const counsellorList = useSelector((state) => state.counsellorList);
  const { loading, error, counsellors } = counsellorList;

  const counsellorDelete = useSelector((state) => state.counsellorDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = counsellorDelete;

  const counsellorCreate = useSelector((state) => state.counsellorCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    counsellor: createdCounsellor,
  } = counsellorCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: COUNSELLOR_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/counsellor/${createdCounsellor._id}/edit`);
    } else {
      dispatch(listCounsellors());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCounsellor,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteCounsellor(id));
    }
  };
  const createCounsellorHandler = () => {
    dispatch(createCounsellor());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Counsellors</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createCounsellorHandler}>
            <i className="fas fa-plus"></i> Create Counsellor
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped borderd hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {counsellors.map((counsellor) => (
              <tr key={counsellor._id}>
                <td>{counsellor._id}</td>
                <td>{counsellor.name}</td>
                <td>{counsellor.category}</td>

                <td>
                  <LinkContainer
                    to={`/admin/counsellor/${counsellor._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(counsellor._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default CounsellorsListScreen;
