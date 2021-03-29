import { React } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import axios from 'axios';

import { authStore } from '../../stores/authStore';

import './Login.css';

const Login = (props) => {

    const handleLogin = (values) => {
        const dataRequest = { email: values.email, password: values.password }
        fetchLogin(dataRequest);
        props.setShowLoginForm(false);
    };

    const fetchLogin = (data) => {
        //console.log('data', data);
        async function authLogin(data) {
            const response = await axios({
                url: process.env.REACT_APP_AUTH_URL + "login",
                method: 'POST',
                data: data
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const patchResult = await response.data;
            return patchResult;
        }
        // fetch Entries
        authLogin(data).then((resData) => {
            // Store RefreshToken
            localStorage.setItem("refreshToken", resData.refreshToken);
            // Call login context function 
            authStore.login(resData.token, resData.refreshToken);
            // show notification
            notification.success({
                message: "You have successfully logged in.",
                duration: 3,
                placement: "topRight",
            });
        }
        ).catch(error => {
            notification.error({ error: error.message, });
            console.log("error", error.message);
        });
    }

    const handleCancel = () => {
        props.setShowLoginForm(false);
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const [form] = Form.useForm();

    return (
        <>
            <Modal
                visible={props.showLoginForm}
                onCancel={handleCancel}
                className="loginModal"
                centered={true}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            handleLogin(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    {...layout}
                    form={form}
                    name="loginForm"

                >
                    <Form.Item
                        label="eMail"
                        name="email"
                        initialValue="clement.vanstaen@gmail.com"
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Pwd"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default Login;
