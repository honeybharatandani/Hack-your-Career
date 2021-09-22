import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import { listOrders } from "../actions/bookedActions";
import { listUsers } from "../actions/userActions";

import { Link } from "react-router-dom";
// import adminbgImg from "../svg/adminbg.svg";
// import adminImg from "../svg/admin.svg";
import { Col, Image, Row, Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { dataPoint } from "../chartFn";

const AdminDashboardScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector(state => state.orderList);
  const { loading: adminLoadingList, error: orderError, orders } = orderList;

  const userList = useSelector(state => state.userList);
  const { loading: userLoading, error: userError, users } = userList;

  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [chartData, setChartData] = useState({});
  const [userChartData, setUserChartData] = useState({});
  /****** */

  /*** */
  const chart = () => {
    setChartData({
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Number of sessions booked",
          data: dataPoint(orders),
          backgroundColor: ["rgb(232,76,59)"],
          borderWidth: 2,
        },
      ],
    });

    setUserChartData({
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Number of new users joined",
          data: dataPoint(users),
          backgroundColor: ["rgb(232,76,59)"],
          borderWidth: 2,
        },
      ],
    });
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
      dispatch(listUsers());
      chart();
    } else {
      history.push("/login");
    }

    fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setQuotes(data);
        setIsLoading(false);
      });

    if (userInfo == null || !userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listOrders());
      }
    }
  }, [dispatch, history, userInfo, user]);
  // console.log(bookedSessionList.orders);
  console.log(users);
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
      </div>
      <Row>
        <Col md={8}>
          <div className="dashContainer">
            <Row>
              <Col className="cen dashName" md={8}>
                <h1>Hello {user.name}</h1>
              </Col>
              <Col className="cen" md={4}>
                {/* <Image className="dashImg" src={adminbgImg} /> */}
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={4}>
          <div className="dashContainer">
            {isLoading ? (
              "loading..."
            ) : (
              <Card className="cardApi">
                <Card.Body>
                  <Card.Title className="title">Quotes For You</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted ">
                    ~ {quotes.author}
                  </Card.Subtitle>
                  <Card.Text className="card_text">{quotes.content}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
      </Row>

      <div>
        <Row>
          <Col md={4}>
            {userLoading ? (
              "Loading.."
            ) : userError ? (
              "404 Not Found!"
            ) : (
              <div className="dashContainer">
                <Row>
                  <div className="chartData">
                    <Line
                      data={userChartData}
                      options={{
                        responsive: true,
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                                beginAtZero: true,
                              },
                              gridLines: {
                                display: false,
                              },
                            },
                          ],
                          xAxes: [
                            {
                              gridLines: {
                                display: false,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  </div>
                </Row>
              </div>
            )}
          </Col>
          <Col md={8}>
            <div className="dashContainer ">
              <Row>
                <Col className="cen " md={8}>
                  <Col className="dpInfo" md={4}>
                    <div className="contenth1 cardcont">{user.name}</div>
                  </Col>
                  {adminLoadingList ? (
                    "loading"
                  ) : orderError ? (
                    "error"
                  ) : (
                    <div className="innerSessiondetails">
                      {orders.length === 0 ? (
                        <Col className="dpInfo contentProfile" md={2}>
                          <div className="contenth1 spandp">No sessions</div>{" "}
                          <Link
                            className="dpbtn secBtn btn btn-danger my-1"
                            to="/profile"
                          >
                            Profile
                          </Link>
                          <Link className="dpbtn btn disabled btn-danger my-1">
                            Sessions
                          </Link>
                        </Col>
                      ) : (
                        <Col md={8}>
                          {orders[orders.length - 1].sessionDone ? (
                            <Col className="dpInfo contentProfile" md={2}>
                              <div className="contenth1 spandp">
                                No new sessions
                              </div>{" "}
                              <Link
                                className="dpbtn secBtn btn btn-danger my-1"
                                to="/profile"
                              >
                                Profile
                              </Link>
                              <Link className="dpbtn btn disabled btn-danger my-1">
                                Sessions
                              </Link>
                            </Col>
                          ) : (
                            <span>
                              {" "}
                              Session Status:
                              {orders[orders.length - 1].isConfirm ? (
                                <i
                                  className="fas fa-check-circle"
                                  style={{ color: "green", marginTop: "5px" }}
                                >
                                  <span
                                    style={{
                                      color: "#2a9d8f",
                                    }}
                                  >
                                    Marked Session confirm of{" "}
                                    <span className="adminSpanin">
                                      {orders[orders.length - 1].user.name}{" "}
                                    </span>
                                    <span className="spanin">with</span>{" "}
                                    <span className="adminSpanin">
                                      {
                                        orders[orders.length - 1]
                                          .sessionItems[0].name
                                      }
                                    </span>
                                  </span>
                                </i>
                              ) : (
                                <i
                                  className="far fa-clock "
                                  style={{ color: "red", marginTop: "5px" }}
                                >
                                  <span>
                                    Pending Session of USER:{" "}
                                    <span className="adminSpanin">
                                      {orders[orders.length - 1].user.name}{" "}
                                    </span>
                                    <span className="spanin">with</span>{" "}
                                    <span className="adminSpanin">
                                      {
                                        orders[orders.length - 1]
                                          .sessionItems[0].name
                                      }
                                    </span>
                                  </span>
                                </i>
                              )}{" "}
                              <Col className="dpInfo contentProfile" md={2}>
                                <Link
                                  className="dpbtn secBtn btn btn-danger my-1"
                                  to="/profile"
                                >
                                  Profile
                                </Link>
                                <Link
                                  className="dpbtn btn btn-danger my-1"
                                  to={`/order/${orders[orders.length - 1]._id}`}
                                >
                                  Session
                                </Link>
                              </Col>
                            </span>
                          )}
                        </Col>
                      )}
                    </div>
                  )}
                </Col>

                <Col className="cen  " md={4}>
                  {/* <Image className="dpImg" src={adminImg} /> */}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col md={12}>
          <div className="dashContainer">
            <div className="chartData">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          autoSkip: true,
                          maxTicksLimit: 10,
                          beginAtZero: true,
                        },
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboardScreen;
