import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import { listMyOrders } from "../actions/bookedActions";
import { Link } from "react-router-dom";
import bgImg from "../svg/bg.svg";
import dpImg from "../svg/dp.svg";
import { Col, Image, Row, Card, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { dataPoint } from "../chartFn";

const DashboardScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookedSessionList = useSelector((state) => state.bookedSessionList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = bookedSessionList;
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [chartData, setChartData] = useState({});
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
  };

  useEffect(() => {
    dispatch(listMyOrders());
    chart();

    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setQuotes(data);
        setIsLoading(false);
      });

    if (userInfo == null || !userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user]);
  // console.log(bookedSessionList.orders);
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
                <Image className="dashImg" src={bgImg} />
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
            <div className="dashContainer">
              <Row>
                <Col className="cen dashName" md={12}>
                  <div className="sessionTable">
                    <h6>Session</h6>
                    {loadingOrders ? (
                      "loading"
                    ) : errorOrders ? (
                      "error"
                    ) : orders.length === 0 ? (
                      <Message>No Session Records</Message>
                    ) : (
                      <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Session</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={orders[orders.length - 1]._id}>
                            <td className="tdid">
                              {orders[orders.length - 1]._id}
                            </td>
                            <td>
                              {orders[orders.length - 1].isConfirm ? (
                                <i
                                  className="fas fa-check-circle"
                                  style={{ color: "green" }}>
                                  <span> Confirmed !</span>
                                </i>
                              ) : (
                                <i
                                  className="far fa-clock"
                                  style={{ color: "red" }}>
                                  <span> Pending..</span>
                                </i>
                              )}{" "}
                            </td>
                            <td>
                              {orders[orders.length - 1].sessionDone ? (
                                <i
                                  className="fas fa-brain"
                                  style={{ color: "green" }}>
                                  <span> DONE</span>
                                </i>
                              ) : (
                                <i
                                  className="fas fa-brain"
                                  style={{ color: "red" }}>
                                  <span> Scheduled</span>
                                </i>
                              )}
                            </td>
                          </tr>

                          {orders.length < 2 ? (
                            <tr key="noSession001">
                              <td colSpan="3">No more sessions</td>
                            </tr>
                          ) : (
                            <tr key={orders[orders.length - 2]._id}>
                              <td className="tdid">
                                {orders[orders.length - 2]._id}
                              </td>
                              <td>
                                {orders[orders.length - 2].isConfirm ? (
                                  <i
                                    className="fas fa-check-circle"
                                    style={{ color: "green" }}>
                                    <span> Confirmed !</span>
                                  </i>
                                ) : (
                                  <i
                                    className="far fa-clock"
                                    style={{ color: "red" }}>
                                    <span> Pending..</span>
                                  </i>
                                )}{" "}
                              </td>
                              <td>
                                {orders[orders.length - 2].sessionDone ? (
                                  <i
                                    className="fas fa-brain"
                                    style={{ color: "green" }}>
                                    <span> DONE</span>
                                  </i>
                                ) : (
                                  <i
                                    className="fas fa-brain"
                                    style={{ color: "red" }}>
                                    <span> Scheduled</span>
                                  </i>
                                )}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={8}>
            <div className="dashContainer ">
              <Row>
                <Col className="cen " md={8}>
                  <Col className="dpInfo" md={4}>
                    <div className="contenth1 cardcont">{user.name}</div>
                  </Col>

                  {loadingOrders ? (
                    "loading"
                  ) : errorOrders ? (
                    "error"
                  ) : (
                    <div className="innerSessiondetails">
                      {orders.length === 0 ? (
                        <Col className="dpInfo contentProfile" md={2}>
                          <div className="contenth1 spandp">No sessions</div>{" "}
                          <Link
                            className="dpbtn secBtn btn btn-danger my-1"
                            to="/profile">
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
                                No Upcoming sessions for you
                              </div>{" "}
                              <Link
                                className="dpbtn secBtn btn btn-danger my-1"
                                to="/profile">
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
                                  style={{ color: "green" }}>
                                  <span> Confirmed !</span>
                                </i>
                              ) : (
                                <i
                                  className="far fa-clock"
                                  style={{ color: "red" }}>
                                  <span>
                                    {" "}
                                    Pending..{" "}
                                    <span className="spanin">with</span>{" "}
                                    {
                                      orders[orders.length - 1].sessionItems[0]
                                        .name
                                    }
                                  </span>
                                </i>
                              )}{" "}
                              <Col className="dpInfo contentProfile" md={2}>
                                <Link
                                  className="dpbtn secBtn btn btn-danger my-1"
                                  to="/profile">
                                  Profile
                                </Link>
                                <Link
                                  className="dpbtn btn btn-danger my-1"
                                  to={`/order/${
                                    orders[orders.length - 1]._id
                                  }`}>
                                  Sessions
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
                  <Image className="dpImg" src={dpImg} />
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

export default DashboardScreen;
