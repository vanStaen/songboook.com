import React, { useState, useRef } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import { authStore } from "../../stores/authStore";
import { validateEmail } from "../../helpers/validateEmail";


import "./Login.css";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isEmail = useRef(undefined);

  const submitHandler = async (values) => {
    setIsLoading(true);
    const emailOrUsername = values.email;
    const isValidEmail = validateEmail(emailOrUsername);
    if (isValidEmail) {
      isEmail.current = values.email.toLowerCase();
    }
    const password = values.password;
    const remember = values.remember;
    try {
      let error = null;
      if (isValidEmail) {
        error = await authStore.login(
          emailOrUsername,
          null,
          password,
          remember
        );
      } else {
        error = await authStore.login(
          null,
          emailOrUsername,
          password,
          remember
        );
      }
      if (error) {
        if (error === "Error: Email is not verified!") {
          const errorMessage = (
            <>
              <strong>{t("login.emailNotVerifyYet")}!</strong>{" "}
              {t("login.checkPostBoxForVerificationLink")}.
              <div
                className="login__verifyEmailLink"
                onClick={() => {
                  postVerifyEmailLink(isEmail.current);
                  notification.success({
                    duration: 0,
                    message: t("login.recoverEmailSent"),
                    placement: "topLeft",
                  });
                }}
              >
                <LinkOutlined /> {t("login.clickToGetNewVerificationLink")}
                <span className="link"> {t("login.verifyYourEmail")}</span>.
              </div>
            </>
          );
          notification.error({
            duration: 0,
            message: errorMessage,
            placement: "topLeft",
          });
        } else if (error === "Error: Password is incorrect!") {
          const errorMessage = (
            <>
              <strong>{t("login.passwordIsIncorrect")}!</strong> <br />
              {t("login.pleaseCheckPasswordOrUse")}
              <span className="link" onClick={() => setIsRecovery(!isRecovery)}>
                {" "}
                {t("login.recoverPassword")}{" "}
              </span>{" "}
              {t("login.feature")}.
            </>
          );
          notification.error({
            message: errorMessage,
            placement: "topLeft",
          });
        } else {
          notification.error({
            message: error,
            placement: "topLeft",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };


  return (
    <div className="login__full">
      <div className="login__container">
        <div className="login__header">
          <div className="login__header">
            Songbo<b>0</b>ok
          </div>
        </div>

        <Form
          name="normal_login"
          className="login__form"
          initialValues={{
            remember: true,
          }}
          onFinish={submitHandler}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="input Password"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>
                <span className="login__remember">Remember me</span>
              </Checkbox>
            </Form.Item>

            <a className="login__formforgot" href="/#">
              Recover password
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login__formbutton"
            >
              {isLoading ? (
                <LoadingOutlined />
              ) :
                "Log in"
              }
            </Button>
            {/* <div className="login__switchmode">
              Or&nbsp;
              <span
                className="login__switchmodetext"
                onClick={switchModeHandler}
              >
                {isLogin ? "register now!" : "log into your account!"}
              </span>
            </div> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
