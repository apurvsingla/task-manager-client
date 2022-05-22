import React from "react";
import { connect } from "react-redux";
import { loginUser } from "store/actions/authType";
import AuthForm from "../components/form";
const Login = (props) => {
  return (
    <div>
      <hr className="w-[67%] mb-8 text-gray-light" />
      <AuthForm name={"login"} text="Log In" type="login" api={props.loginUser}>
        <h2 className="text-xl font-semibold" style={{ lineHeight: "12px" }}>
          To Continue
        </h2>
        <pre className="text-xs leading-8 mb-6 text-gray">
          We need your Name & Email
        </pre>
      </AuthForm>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);
