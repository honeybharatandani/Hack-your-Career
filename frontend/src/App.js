import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import RegisterScreen from "./screens/RegisterScreen";
import { LinkContainer } from "react-router-bootstrap";
import SigninScreen from "./screens/SigninScreen";
import About from "./components/About";
import CounsellorScreen from "./screens/CounsellorScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UsersListScreen from "./screens/UsersListScreen";
import Footer from "./components/Footer";
import CounsellorListScreen from "./screens/CounsellorsListScreen";
import CounsellorEditScreen from "./screens/CounsellorEditScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import DashboardScreen from "./screens/DashboardScreen";
import BookingScreen from "./screens/BookingScreen";
import SessionBookingScreen from "./screens/SessionBookingScreen";
import OrderScreen from "./screens/OrderScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import IndividualScreen from "./screens/IndividualScreen";
import Working from "./components/Working";
import Contact from "./components/Contact";
import Question from "./components/Questions";
// import Images from "./components/Images/Images";
import Logo from "./components/Logo";

function App() {
  return (
    <Router>
      <Header />

      <LinkContainer to="/">
        <Logo />
      </LinkContainer>

      <main className="py-3">
        <Container>
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={SigninScreen} />
          <Route path="/faqs" component={Question} />
          <Route path="/" component={CounsellorScreen} exact />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/userlist" component={UsersListScreen} />
          <Route
            path="/admin/counsellorlist"
            component={CounsellorListScreen}
          />
          <Route
            path="/admin/counsellor/:id/edit"
            component={CounsellorEditScreen}
          />
          <Route path="/contact" component={Contact} />

          <Route path="/about" component={About} />
          <Route path="/working" component={Working} />
          <Route path="/admin_dashboard" component={AdminDashboardScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/admin/users/:id/edit" component={UserEditScreen} />
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/confirm" component={BookingScreen} />
          <Route path="/sessions/:id?" component={SessionBookingScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/bespeaking" component={PlaceOrderScreen} />
          <Route path="/counsellor/:id" component={IndividualScreen} />
          {/* 



          */}
        </Container>
        <Footer />

        {/* <Images /> */}
      </main>
    </Router>
  );
}

export default App;
