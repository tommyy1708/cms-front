import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import React from 'react';
import 'loginPg.less';
import { LoginApi } from 'request/api';

const logo = require('./assets/images/logo.png')

const Login: React.FC = () => {
  let nav = useNavigate()
  const onFinish = (values: any) => {
    LoginApi(values).then((res: any) => {
      if (res.errCode === 0) {
        message.success(res.message, 2);
        localStorage.setItem('username',res.data.username)
        localStorage.setItem('cms-token',res.data['cms-token'])
        localStorage.setItem('avatar',res.data.avatar)
        localStorage.setItem('player',res.data.player)
        localStorage.setItem('editable',res.data.editable)

        setTimeout(() => {
          nav('/', { replace: true });
        }, 3000) 
      } else {
        message.error('用户已经存在', 2);
        return;
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='loginPg'>
      <img className='logo' src={logo} alt="" />
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size='large'
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='username' />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='password' />
        </Form.Item>
        <Form.Item>
          <Link to='/register'>还没账户 立即注册</Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;