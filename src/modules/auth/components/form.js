import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useHistory } from "react-router-dom";
import Spinner from "components/loader";

const AuthForm = ({ name, text, type, children, api }) => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    let payload = {
      email: values.email,
      password: "12345678",
    };
    if (values.name) {
      payload.name = values.name;
    }
    try {
      let res = await api(payload);
      if (res === 200 && name === "register") {
        message.success("User Created successfully, Login to Continue");
        history.push("/");
      }
    } catch (error) {
      message.error("Error!");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name={name}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
    {loading && <Spinner />}
      {children}
      {type === "signup" && (
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input
            placeholder="Full Name"
            className="h-[40px]"
            style={{ borderRadius: "7px" }}
          />
        </Form.Item>
      )}
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          placeholder="Email"
          className="h-[40px]"
          style={{ borderRadius: "7px" }}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          placeholder="Password"
          className="h-[40px]"
          style={{ borderRadius: "7px" }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          style={{ borderRadius: "7px", height: "40px", border: "none" }}
        >
          {text}
        </Button>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        className="float-left w-full"
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
