import { useState } from 'react';
import { Alert, Checkbox } from 'antd';
import tcb from 'tcb-js-sdk';
import axios from 'axios';
import endpoints from '../services/endpoints';
import Link from 'next/link';
import LayoutUser from '../components/layout/user';
import LoginFrom from '../components/pages/login';
import '../assets/login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginFrom;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = props => {
  const [autoLogin, setAutoLogin] = useState(true);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState('account');

  const handleSubmit = async values => {
    // const { dispatch } = props;
    // dispatch({
    //   type: 'userAndlogin/login',
    //   payload: { ...values, type },
    // });
    setSubmitting(true);
    const app = tcb.init({
        env: process.env.NEXT_PUBLIC_ENV
    });
    const auth = app.auth({
        persistence: 'local'
    });
    const ticketRes = await axios.post(endpoints.login, {
        userName: values.userName,
        password: values.password
    });
    setSubmitting(false);
    if (ticketRes.data.code === 'LOGIN_WRONG_INPUT') {
        setError(true);
    } else {
        const res = await auth.signInWithTicket(ticketRes.data.ticket);
    }
  };

  return (
    <LayoutUser>
        <div className="main">
            <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
                <Tab key="account" tab="账户密码登录">
                {error && !submitting && (
                    <LoginMessage content="用户名或密码错误" />
                )}
                <UserName
                    name="userName"
                    placeholder="用户名"
                    rules={[
                    {
                        required: true,
                        message: '请输入用户名!',
                    },
                    ]}
                />
                <Password
                    name="password"
                    placeholder="密码: ant.design"
                    rules={[
                    {
                        required: true,
                        message: '请输入密码！',
                    },
                    ]}
                />
                </Tab>
                <Tab key="mobile" tab="手机号登录">
                <Mobile
                    name="mobile"
                    placeholder="手机号"
                    rules={[
                    {
                        required: true,
                        message: '请输入手机号！',
                    },
                    {
                        pattern: /^1\d{10}$/,
                        message: '手机号格式错误！',
                    },
                    ]}
                />
                <Captcha
                    name="captcha"
                    placeholder="验证码"
                    countDown={120}
                    getCaptchaButtonText=""
                    getCaptchaSecondText="秒"
                    rules={[
                    {
                        required: true,
                        message: '请输入验证码！',
                    },
                    ]}
                />
                </Tab>
                <div>
                <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
                    自动登录
                </Checkbox>
                <a
                    style={{
                    float: 'right',
                    }}
                >
                    忘记密码
                </a>
                </div>
                <Submit loading={submitting}>登录</Submit>
                <div className="other">
                    {/* 其他登录方式
                    <AlipayCircleOutlined className="icon" />
                    <TaobaoCircleOutlined className="icon" />
                    <WeiboCircleOutlined className="icon" /> */}
                    还没有账户？
                    <Link href="/user/register">
                        <a className="register" href="/user/register">注册账户</a>
                    </Link>
                </div>
            </LoginFrom>
        </div>
    </LayoutUser>
  );
};

export default Login;
