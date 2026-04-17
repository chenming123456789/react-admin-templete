# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

2 周 React 学习计划（零基础 → 可面试后台项目）
第 1 周：React 基础 + 小案例上手（稳扎稳打，不焦虑）

Day1：环境搭建 + 最简单组件
用 Vite 创建 React 项目
认识组件、JSX、return 结构
写 3 个小组件：标题、按钮、列表
掌握 import /export 导入导出

Day2：useState 状态管理
学会状态变量修改：输入框、开关、计数器
完成 TodoList 初稿（新增、展示）
掌握：点击事件、表单取值、数据渲染

Day3：useEffect 生命周期
页面加载时执行逻辑（发请求、定时器）
监听状态变化，自动触发更新
完善 TodoList：删除单条、清空所有

Day4：React Router 路由
配置 3～5 个页面路由
页面跳转、路由传参、嵌套路由
完成一个「多页面小站」

Day5：Axios 请求接口
封装 request.js
调用真实接口 / Mock 接口
列表数据展示、加载状态、错误处理

Day6：Ant Design 入门
引入 antd 组件库
使用 Button、Card、Input、Table
把之前 TodoList 换成 AntD UI

Day7：小综合案例
完成：用户列表页（表格 + 搜索）
包含功能：列表渲染、搜索、分页、操作列
第 1 周结束：能独立写简单业务页面

第 2 周：完整 React 后台管理项目（简历可放、面试可讲）
Day8：项目结构 + 登录页
搭建标准后台目录结构
登录表单、表单校验
登录成功存储 token、跳转首页

Day9：Layout 布局（侧边栏 + 头部）
搭建后台通用布局架子
菜单折叠、选中高亮
退出登录、基础权限判断

Day10：用户管理（列表 + 搜索 + 分页）
表格列配置、数据渲染
输入框搜索、筛选
分页切换、列表刷新
封装复用逻辑（提高代码复用性）

Day11：新增 + 编辑弹窗
Modal 弹窗 + Form 表单
新增提交、接口调用
编辑数据回显、修改提交
提交成功后自动刷新列表

Day12：角色管理（逻辑复用）
完全模仿用户模块开发
练习逻辑复用、快速开发
巩固：列表、增删改查

Day13：个人中心 + 404 + 路由守卫
展示当前登录用户信息
修改密码功能
路由守卫：未登录自动跳登录
404 页面配置

Day14：整体优化 + 简历准备
修复所有 bug
添加 loading、message 提示
统一页面样式
项目截图、简历描述整理
第 2 周结束：拥有可面试完整项目
