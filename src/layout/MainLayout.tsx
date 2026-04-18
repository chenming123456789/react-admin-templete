import React, { useState } from 'react';
import { Layout, Menu, theme, Button, Dropdown, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import styles from './MainLayout.module.scss';

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

  const isRegistrationPage = location.pathname === '/medical/registration';

  return (
    <Layout className={styles.layoutRoot}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        <div className={styles.logo}>
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
        <Header className={styles.header} style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles.collapseBtn}
          />
          <div className={styles.userArea}>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <span className={styles.userDropdown}>
                <Avatar className={styles.avatar} src={userInfo?.avatar} icon={!userInfo?.avatar && <UserOutlined />} />
                {userInfo?.username || '管理员'}
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content
          className={`${styles.content} ${isRegistrationPage ? styles.contentHidden : styles.contentAuto}`}
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
