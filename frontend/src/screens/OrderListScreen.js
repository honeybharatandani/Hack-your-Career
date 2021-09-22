import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/bookedActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
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
              <th>Date</th>
              <th>Status</th>
              <th>Session</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.reverse().map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isConfirm ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "green" }}>
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
                    <i className="fas fa-brain" style={{ color: "green" }}>
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
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
