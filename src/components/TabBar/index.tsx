import React from "react";
import { Dropdown, theme } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import type { TabItem } from "@/layout/MainLayout";
import styles from "./index.module.scss";

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabClick: (key: string) => void;
  onTabClose: (key: string) => void;
  onTabAction: (action: "closeOthers" | "closeAll" | "closeRight") => void;
}

/**
 * 多标签页导航组件
 * 参考企业级管理系统的标签页导航设计
 */
const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabClick,
  onTabClose,
  onTabAction
}) => {
  const { token } = theme.useToken();
  // 右键菜单
  const getContextMenu = (tabKey: string) => ({
    items: [
      {
        key: "closeOthers",
        label: "关闭其他",
        onClick: () => onTabAction("closeOthers")
      },
      {
        key: "closeRight",
        label: "关闭右侧",
        onClick: () => onTabAction("closeRight")
      },
      {
        type: "divider" as const
      },
      {
        key: "closeAll",
        label: "关闭所有",
        onClick: () => onTabAction("closeAll")
      }
    ]
  });

  return (
    <div
      className={styles.tabBar}
      style={{
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`
      }}
    >
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <Dropdown
            key={tab.key}
            menu={getContextMenu(tab.key)}
            trigger={["contextMenu"]}
          >
            <div
              className={`${styles.tabItem} ${activeTab === tab.key ? styles.tabItemActive : ""}`}
              style={{
                background: activeTab === tab.key ? token.colorBgContainer : token.colorFillTertiary,
                color: activeTab === tab.key ? token.colorPrimary : token.colorTextSecondary,
                borderColor: activeTab === tab.key ? token.colorBorderSecondary : "transparent"
              }}
              onClick={() => onTabClick(tab.key)}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              {tab.closable && (
                <CloseOutlined
                  className={styles.tabClose}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.key);
                  }}
                />
              )}
            </div>
          </Dropdown>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
