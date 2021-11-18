import React, { useCallback, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, SIGN_IN_REQUEST } from "../reducers/user";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { useRouter } from "next/router";

const LoginForm = styled(Form)`
  width: 80%;
  margin-top: 30px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { me, st_signInLoading } = useSelector((state) => state.user);

  const onSubmit = useCallback((values) => {
    dispatch({
      type: SIGN_IN_REQUEST,
      data: values,
    });
  });

  const accessPage = () => {
    if (me) {
      router.push("/");
    }
  };

  //

  useEffect(() => {
    accessPage();
  }, []);

  useEffect(() => {
    accessPage();
  }, [me]);

  return (
    <AppLayout>
      <LoginForm
        name="loginForm"
        labelCol={{ xs: 24, span: 8 }}
        wrapperCol={{ xs: 24, span: 16 }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" htmlType="submit" loading={st_signInLoading}>
            Log In
          </Button>
        </Form.Item>
      </LoginForm>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Login;
