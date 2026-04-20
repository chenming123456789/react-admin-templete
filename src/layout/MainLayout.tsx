import React, { useState, useEffect, useCallback } from "react";
import { Layout, Menu, Dropdown, Avatar, Select } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MedicineBoxOutlined,
  ReconciliationOutlined,
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined,
  ExperimentOutlined,
  ApartmentOutlined
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import TabBar from "@/components/TabBar";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import styles from "./MainLayout.module.scss";

const { Header, Sider, Content } = Layout;

/**
 * 路由与菜单的映射配置
 * 用于面包屑导航和 Tab 标签页自动获取页面标题
 */
export const routeMetaMap: Record<
  string,
  { title: string; parentTitle?: string }
> = {
  "/dashboard": { title: "工作台" },
  "/medical/registration": { title: "挂号管理", parentTitle: "医疗业务" },
  "/medical/billing": { title: "门诊收费", parentTitle: "医疗业务" },
  "/medical/channel": { title: "渠道管理", parentTitle: "医疗业务" },
  "/users": { title: "用户管理", parentTitle: "系统管理" },
  "/roles": { title: "角色管理", parentTitle: "系统管理" },
  "/profile": { title: "个人中心" },
  "/test": { title: "测试页面" }
};

/**
 * Tab 标签页数据结构
 */
export interface TabItem {
  key: string;
  label: string;
  closable: boolean;
}

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useUserStore((state) => state.userInfo);
  const logout = useUserStore((state) => state.logout);

  // Tab 标签页状态
  const [tabs, setTabs] = useState<TabItem[]>([
    { key: "/dashboard", label: "工作台", closable: false }
  ]);
  const [activeTab, setActiveTab] = useState("/dashboard");

  // 路由变化时自动添加 Tab
  useEffect(() => {
    const path = location.pathname;
    const meta = routeMetaMap[path];
    if (meta) {
      setActiveTab(path);
      setTabs((prevTabs) => {
        const exists = prevTabs.find((tab) => tab.key === path);
        if (!exists) {
          return [
            ...prevTabs,
            { key: path, label: meta.title, closable: path !== "/dashboard" }
          ];
        }
        return prevTabs;
      });
    }
  }, [location.pathname]);

  // 点击 Tab
  const handleTabClick = useCallback(
    (key: string) => {
      setActiveTab(key);
      navigate(key);
    },
    [navigate]
  );

  // 关闭 Tab
  const handleTabClose = useCallback(
    (targetKey: string) => {
      setTabs((prevTabs) => {
        const newTabs = prevTabs.filter((tab) => tab.key !== targetKey);
        // 如果关闭的是当前激活的 Tab，切换到最后一个
        if (targetKey === activeTab && newTabs.length > 0) {
          const lastTab = newTabs[newTabs.length - 1];
          setActiveTab(lastTab.key);
          navigate(lastTab.key);
        }
        return newTabs;
      });
    },
    [activeTab, navigate]
  );

  // 关闭其他/全部 Tab
  const handleTabAction = useCallback(
    (action: "closeOthers" | "closeAll" | "closeRight") => {
      setTabs((prevTabs) => {
        if (action === "closeAll") {
          setActiveTab("/dashboard");
          navigate("/dashboard");
          return [prevTabs[0]]; // 保留工作台
        }
        if (action === "closeOthers") {
          const kept = prevTabs.filter(
            (tab) => !tab.closable || tab.key === activeTab
          );
          return kept;
        }
        if (action === "closeRight") {
          const activeIndex = prevTabs.findIndex(
            (tab) => tab.key === activeTab
          );
          return prevTabs.slice(0, activeIndex + 1);
        }
        return prevTabs;
      });
    },
    [activeTab, navigate]
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 左侧菜单配置
  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "工作台"
    },
    {
      key: "medical",
      icon: <MedicineBoxOutlined />,
      label: "医疗业务",
      children: [
        {
          key: "/medical/registration",
          icon: <UserOutlined />,
          label: "挂号管理"
        },
        {
          key: "/medical/billing",
          icon: <ReconciliationOutlined />,
          label: "门诊收费"
        },
        {
          key: "/medical/channel",
          icon: <ApartmentOutlined />,
          label: "渠道管理"
        }
      ]
    },
    {
      key: "system",
      icon: <SettingOutlined />,
      label: "系统管理",
      children: [
        {
          key: "/users",
          icon: <TeamOutlined />,
          label: "用户管理"
        },
        {
          key: "/roles",
          icon: <SafetyOutlined />,
          label: "角色管理"
        }
      ]
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "个人中心"
    },
    {
      key: "/test",
      icon: <ExperimentOutlined />,
      label: "测试页面"
    }
  ];

  // 用户下拉菜单
  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人信息",
      onClick: () => navigate("/profile")
    },
    {
      type: "divider" as const
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      onClick: handleLogout
    }
  ];

  // 获取当前展开的菜单 key（自动展开当前路由所在的父菜单）
  const getDefaultOpenKeys = () => {
    const path = location.pathname;
    if (path.startsWith("/medical")) return ["medical"];
    if (path === "/users" || path === "/roles") return ["system"];
    return [];
  };

  return (
    <Layout className={styles.layoutRoot}>
      {/* ===== 顶部导航栏 ===== */}
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>RA</div>
            <span className={styles.logoText}>React Admin</span>
          </div>
          <div className={styles.orgSwitcher}>
            <Select
              defaultValue="headquarters"
              variant="borderless"
              popupMatchSelectWidth={false}
              className={styles.orgSelect}
              options={[
                { value: "headquarters", label: "承启堂" },
                { value: "branch1", label: "承启堂青羊馆" }
              ]}
            />
          </div>
        </div>
        <div className={styles.headerRight}>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <span className={styles.userDropdown}>
              <Avatar
                className={styles.avatar}
                size="small"
                src={userInfo?.avatar}
                icon={!userInfo?.avatar && <UserOutlined />}
              />
              <span className={styles.username}>
                {userInfo?.username || "管理员"}
              </span>
            </span>
          </Dropdown>
          <div className={styles.settingIcon}>
            <SettingOutlined />
          </div>
        </div>
      </Header>

      <Layout className={styles.mainBody}>
        {/* ===== 左侧菜单 ===== */}
        <Sider width={200} className={styles.sider} theme="light">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={getDefaultOpenKeys()}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            className={styles.sideMenu}
          />
        </Sider>

        {/* ===== 右侧内容区域 ===== */}
        <Layout className={styles.contentLayout}>
          {/* Tab 标签页导航 */}
          <TabBar
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={handleTabClick}
            onTabClose={handleTabClose}
            onTabAction={handleTabAction}
          />

          {/* 面包屑导航 */}
          <BreadcrumbNav />

          {/* 页面内容 */}
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
