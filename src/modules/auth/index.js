import React from "react";
import { Col, Row } from "antd";
import Register from "./register";
import Login from "./login";
import './auth.styles.css';

function Auth() {
  const [authBtn, setAuthBtn] = React.useState(false);
  return (
    <Row xs={24}>
      <Col lg={12}>
        <img src="/todo.png" alt="TO-DO" />
      </Col>
      <Col lg={10} sm={22} xs={20} className="ml-8">
        <div className="border-2 border-gray rounded-4xl p-8 flex justify-start mt-24 flex-col h-full">
          <div className="mt-8 flex">
            <span
              onClick={() => {
                setAuthBtn(false);
              }}
              className={`mr-4 text-xl cursor-pointer ${
                authBtn && "opacity-50"
              }`}
            >
              Log In
            </span>
            <span
              onClick={() => {
                setAuthBtn(true);
              }}
              className={`text-xl ${
                !authBtn && "opacity-50"
              } cursor-pointer relative`}
            >
              Sign up
            </span>
          </div>
          <div className="w-full mt-8 sm:ml-16">
            {authBtn ? <Register /> : <Login />}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Auth;
