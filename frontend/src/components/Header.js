import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import "../bootstrap.min.css";

const Header = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    // history.push("/login");
  };

  return (
    <header>
      <Navbar expand="xxl" collapseOnSelect>
        <Container>
          {/* <LinkContainer to="/">
            <Navbar.Brand>Hack Your Career</Navbar.Brand>
          </LinkContainer> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/about-us">
                <Nav.Link>
                  <h5> &nbsp; About Us</h5>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/faqs">
                <Nav.Link>
                  <h5>&nbsp; FAQs</h5>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/contact">
                <Nav.Link>
                  <h5> &nbsp; Contact Us</h5>
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/working">
                <Nav.Link>
                  <h5> &nbsp; How it Works</h5>
                </Nav.Link>
              </LinkContainer>

              {userInfo && userInfo.isAdmin ? (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin_dashboard">
                    <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/counsellorlist">
                    <NavDropdown.Item>Counsellors</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Sessions</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>
                    <h5>&nbsp; Sign In</h5>
                  </Nav.Link>
                </LinkContainer>
              )}

              {/**{userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/counsellorlist">
                    <NavDropdown.Item>Counsellors</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Sessions</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
