import React, { useState } from 'react';
import { Layout, Menu, theme, Button, Dropdown, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  MedicineBoxOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useUserStore((state) => state.userInfo);
  const logout = useUserStore((state) => state.logout);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'medical',
      icon: <MedicineBoxOutlined />,
      label: '医疗业务',
      children: [
        {
          key: '/medical/registration',
          icon: <UserOutlined />,
          label: '挂号管理',
        },
        {
          key: '/medical/billing',
          icon: <ReconciliationOutlined />,
          label: '门诊收费',
        },
      ],
    },
    {
      key: '/profile',
      icon: <SettingOutlined />,
      label: '个人中心',
    },
    {
      key: '/test',
      icon: <SettingOutlined />,
      label: '测试',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
      onClick: () => navigate('/profile'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}>
          {collapsed ? 'RA' : 'React Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ paddingRight: 24 }}>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <span style={{ cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#1890ff', marginRight: 8 }} src={userInfo?.avatar} icon={!userInfo?.avatar && <UserOutlined />} />
                {userInfo?.username || '管理员'}
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            flex: 1,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
