import React from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { getMe, loginUser } from "api/authApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { useCookies } from "react-cookie";
import { IUser } from "../types";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StyledRow } from "../copmponents/Row";
import { StyledCol } from "../copmponents/Col";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const [cookies, setCookie] = useCookies(["logged_in"]);
  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || "/";

  const stateContext = useStateContext();

  const query = useQuery(["authUser"], () => getMe(cookies.logged_in), {
    enabled: false,
    // select: (data) => data.data?.user,
    retry: 1,
    onSuccess: (data) => {
      console.log(data, "login");
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  const { mutate, isLoading } = useMutation(
    (userData: LoginInput) => loginUser(userData),
    {
      onSuccess: (data) => {
        query.refetch();
        setCookie("logged_in", data.jwt, { path: "/" });
        notification.success({
          message: "You successfully logged in",
          placement: "topRight",
          style: { backgroundColor: "green" },
        });
        navigate(from);
      },
      onError: (error: any) => {
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            notification.error({
              message: el.message,
              placement: "topRight",
            })
          );
        } else {
          notification.error({
            message: (error as any).response.data.message,
            placement: "topRight",
          });
        }
      },
    }
  );

  const onFinish = async (values: IUser) => {
    mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return cookies.logged_in || query.data ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <StyledRow>
      <Col span={8} />
      <StyledCol span={8}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {/*<Form.Item*/}
          {/*  name="remember"*/}
          {/*  valuePropName="checked"*/}
          {/*  wrapperCol={{ offset: 8, span: 16 }}*/}
          {/*>*/}
          {/*  <Checkbox>Remember me</Checkbox>*/}
          {/*</Form.Item>*/}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </StyledCol>
      <Col span={8} />
    </StyledRow>
  );
};

export default LoginPage;
