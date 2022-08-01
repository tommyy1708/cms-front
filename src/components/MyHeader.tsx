import React, { useEffect, useState } from 'react'
import './less/Myheader.less'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space ,message} from 'antd';
import { useNavigate } from 'react-router-dom';
 
const logo = require('assets/images/logo.png')
const defaultIcon = require('assets/images/avatar.jpeg')


export default function MyHeader() {
  const navigate = useNavigate();
  const goMeans = ()=>{
    let token = localStorage.getItem('cms-token')
    if(token){
      navigate('/means')
    }else{
      message.warning('token过期,跳转登陆页')
      setTimeout(()=>{
        navigate('/login')
      },1500)
    }
  }

  const goOut = ()=>{
    localStorage.clear()
    message.success('即将转到登陆页面')
    setTimeout(()=>{
      navigate('/login')
    },1500)
  }
const menu = (
  <Menu key="SubMenu" title="Navigation Two - Submenu">
    <Menu.Item onClick={goMeans} key="one" >
      修改资料
    </Menu.Item>
    <Menu.Item onClick={goOut} key="two" >
      退出登陆
    </Menu.Item>
    </Menu>
);

  const [avatar, setAvatar] = useState(defaultIcon)
  const [username, setUsername] = useState('匿名用户')
  //componentDidMount
  useEffect(() => {
    let avatar1 = localStorage.getItem("avatar") || defaultIcon;
    let username1 = localStorage.getItem("username") || '匿名用户';
    setAvatar(avatar1)
    setUsername(username1)
  }, [])
  return (
    <header>
      <img src={logo} height={80} alt="#" />
      <Dropdown arrow={true} overlay={menu}>
        <a href='!#' onClick={e => e.preventDefault()}>
          <img height={20} style={{ borderRadius: '50%', marginRight: '10px' }} src={process.env.SERVER_PORT+'/'+avatar} alt="#" />
          <Space >
            <span>{username}</span>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </header>
  )
}
