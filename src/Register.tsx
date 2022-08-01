import { Button, Form, Input ,message} from 'antd';
import {Link} from 'react-router-dom'
import { RegisterApi } from 'request/api';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import 'loginPg.less';

const logo = require('./assets/images/logo.png')

interface IRegisterLogin {
  username?: string;
  password?: string;
  confirm?:string;
}
const Register: React.FC = () => {
  let nav = useNavigate()
  const onFinish = (values: any) => {
    let {username, password, confirm} = values;
    RegisterApi(values).then((res:any)=>{
      if(res.errCode === 0){
        message.success('注册成功, 即将跳转',2);
        setTimeout(()=>{
          nav('/login', {replace:true});
        },3000)
      }else{
        message.error('用户已经存在',2);
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
          <Input.Password placeholder='password'/>
        </Form.Item>
        <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder='confirm password'/>
      </Form.Item>
      
        <Form.Item>
          <Link to='/login'>有账户 去登陆</Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block size='large'>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;