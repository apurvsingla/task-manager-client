import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import loadable from "@loadable/component";
import Spinner from "../components/loader";
import TaskList from "./tasks";
import { saveUserDetails } from "store/actions/authType";

const options = { fallback: <Spinner /> };
const Auth = loadable(() => import("./auth"), options);

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
    };
  }
  async componentDidUpdate(prevProps) {}

  async componentDidMount() {}

  getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    this.props.saveUserDetails(userToken);
    return userToken;
  };

  render() {
    let token = this.getToken();
    if (!token) {
      return (
        <Switch>
          <Route
            key="Auth"
            path="/auth"
            exact
            render={(props) => <Auth {...props} />}
          />
          <Redirect to="/auth" />
        </Switch>
      );
    }
    return (
      <>
        <Switch>
          <Route
            key="home"
            path="/"
            exact
            render={(props) => <TaskList {...props} />}
          />
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.userDetails,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    saveUserDetails,
  })(Layout)
);
