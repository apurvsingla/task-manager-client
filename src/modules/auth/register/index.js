import React from "react";
import { connect } from "react-redux";
import { registerUser } from "store/actions/authType";
import AuthForm from "../components/form";

const Register = (props) => {
  return (
    <AuthForm name={"register"} text="Sign up" type="signup" api={props.registerUser}>
      <hr className="w-[67%] mb-8 text-gray-light" />
    </AuthForm>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  registerUser,
})(Register);
