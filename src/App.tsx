import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom'
import 'App.less';
import 'App.css';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
import MyHeader from 'components/MyHeader';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'

interface IProps {
  mykey: number;
  changeKeyFn: () => void;
}
function App(props: IProps) {

  const [defaultKey, setDefaultKey] = useState('0');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/list':
        setDefaultKey('1')
        break;
      case '/edit':
        setDefaultKey('2')
        break;
      case '/means':
        setDefaultKey('3')
        break;
      case '/namelist':
        setDefaultKey('4')
        break;
    default:
    setDefaultKey('0')
    break;
  }
  if(location.pathname.includes('/edit')){
    setDefaultKey('2')
  }
  }, [location.pathname])

  const { Content, Sider, Footer } = Layout;


  type MenuItem = Required<MenuProps>['items'][number];
  // function getItem(
  //   label: React.ReactNode,
  //   key: React.Key,
  //   style?:React.ReactNode,
  //   icon?: React.ReactNode,
  //   items?: MenuItem[],
  // ): MenuItem {
  //   return {
  //     label,
  //     key,
  //     style,
  //     icon,
  //     items,
  //   } as MenuItem;
  // }

  const items: MenuItem[] = [
    {label:<Link to={'/list'}>查看文章列表</Link>, key:'1', icon:<LaptopOutlined />},
    {label:<Link to={'/edit'}>文章编辑</Link>, key:'2', icon:<NotificationOutlined />},
    {label:<Link to={'/means'}>修改资料</Link>, key:'3', icon:<NotificationOutlined />},
    {
      label: <Link to={'/namelist'}>管理员</Link>,
      key: '4',
      style:{display:localStorage.getItem('player')==='vip' ? 'block':'none'},
      children: [{ label: '小编名单', key: '5' }],
      icon:<UserOutlined />
    },
  ];

  return (
    <Layout className='container'>
      <MyHeader key={props.mykey} />
      <Layout>
        <Sider width={200} >
          <Menu
            mode="inline"
            defaultSelectedKeys={[defaultKey]}
            selectedKeys={[defaultKey]}
            defaultOpenKeys={['4']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            theme={'dark'}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="mycontent"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 300,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer style={{
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#001529'
      }}>Ant Design &copy; 2018 Created by Ant UED</Footer>
    </Layout>
  );
}

const mapStateToProps = (state: IProps) => {
  return {
    mykey: state.mykey,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeKeyFn() {
      dispatch({ type: "ChangeKey" })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

