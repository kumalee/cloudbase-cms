import { useState } from 'react';
import { Alert } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LayoutUser from '../layouts/user';
import LoginFrom from '../components/pages/login';
import { getAuthTicket, signIn } from '../services';
import '../assets/login.less';

const { UserName, Password, Submit } = LoginFrom;

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
  const router = useRouter();

  const handleSubmit = async values => {
    setSubmitting(true);
    const ticketRes = await getAuthTicket(values);
    setSubmitting(false);
    if (ticketRes.data.code) {
        setError(ticketRes.data.message);
    } else {
        await signIn(ticketRes.data.data.ticket);
        router.push('/')
    }
  };

  return (
    <LayoutUser>
        <div className="main">
            <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
                {error && !submitting && (
                    <LoginMessage content={error} />
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
                <Submit loading={submitting}>登录</Submit>
                <div className="other">
                    <span>
                        <span>还没有账户？</span>
                        <Link href="/user/register">
                            <a href="/user/register">注册账户</a>
                        </Link>
                    </span>
                    <a
                        style={{
                            float: 'right',
                        }}
                    >
                        忘记密码
                    </a>
                </div>
            </LoginFrom>
        </div>
    </LayoutUser>
  );
};

export default Login;
