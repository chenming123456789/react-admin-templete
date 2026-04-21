import React, { createContext, useContext, useState, ReactNode } from "react";
import { ConfigProvider as AntdConfigProvider, theme, App } from "antd";
import zhCN from "antd/es/locale/zh_CN";


/**
 * 全局配置的类型定义
 */
interface ConfigState {
  isCompact: boolean;
  algorithm: "light" | "dark";
}

interface ConfigContextType extends ConfigState {
  setCompact: (compact: boolean) => void;
  setAlgorithm: (algo: "light" | "dark") => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

/**
 * 配置上下文 Provider 组件
 */
export const ConfigProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  // 默认配置
  const [isCompact, setCompact] = useState(false);
  const [algorithm, setAlgorithm] = useState<"light" | "dark">("light");

  // 根据状态计算 Ant Design 的算法
  const getAlgorithm = () => {
    const algos = [];
    if (algorithm === "dark") algos.push(theme.darkAlgorithm);
    if (isCompact) algos.push(theme.compactAlgorithm);
    return algos.length > 0 ? algos : theme.defaultAlgorithm;
  };

  return (
    <ConfigContext.Provider
      value={{
        isCompact,
        algorithm,
        setCompact,
        setAlgorithm
      }}
    >
      <AntdConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: "#1677ff",
            borderRadius: 6,
            // 响应式全局字体
            fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
          },
          algorithm: getAlgorithm(),
          components: {
            Layout: {
              headerBg: algorithm === "dark" ? "#232425" : "#307bdf",
              siderBg: algorithm === "dark" ? "#232425" : "#ffffff",
              bodyBg: algorithm === "dark" ? "#1a1b1c" : "#f0f2f5"
            },
            Menu: {
              itemBg: "transparent",
              subMenuItemBg: "transparent"
            },
            Card: {
              colorBgContainer: algorithm === "dark" ? "#232425" : "#ffffff"
            }
          }
        }}
      >
        <App>
          {children}
        </App>
      </AntdConfigProvider>
    </ConfigContext.Provider>
  );
};

/**
 * 自定义 Hook，用于在组件中获取和修改全局配置
 */
export const useGlobalConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useGlobalConfig must be used within a ConfigProvider");
  }
  return context;
};
