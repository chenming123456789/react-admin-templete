import React, { useEffect } from 'react';
import { Form, Input, Button, message, Checkbox } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  WechatOutlined,
  GithubOutlined,
  DingdingOutlined,
  AlipayCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import styles from './index.module.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useUserStore((state) => state.setToken);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const [form] = Form.useForm();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const rememberChecked = localStorage.getItem('rememberChecked');
    if (username && rememberChecked === 'true') {
      form.setFieldsValue({ username, remember: true });
    }
  }, [form]);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    message.success('登录成功');
    if (values.remember) {
      localStorage.setItem('username', values.username);
      localStorage.setItem('rememberChecked', 'true');
    } else {
      localStorage.removeItem('username');
      localStorage.setItem('rememberChecked', 'false');
    }
    // 设置全局状态
    setToken('mock-token-' + Date.now());
    setUserInfo({
      username: values.username,
      role: 'admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    });

    navigate('/dashboard');
  };

  return (
    <div className={styles.loginPage}>
      {/* --- 左侧品牌展示区 --- */}
      <div className={styles.brandSide}>
        {/* 装饰圆球 */}
        <div className={styles.decorCircle} />
        <div className={styles.decorCircle} />
        <div className={styles.decorCircle} />

        <div className={styles.brandContent}>
          <div className={styles.brandLogo}>RA</div>
          <h1 className={styles.brandTitle}>React Admin</h1>
          <p className={styles.brandSubtitle}>
            高效、安全、可靠的企业级后台管理系统
            <br />
            助力团队数字化转型，提升运营效率
          </p>
        </div>
      </div>

      {/* --- 右侧登录表单区 --- */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          {/* 表单头部 */}
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>欢迎回来</h2>
            <p className={styles.formSubtitle}>请输入您的账号信息登录系统</p>
          </div>

          {/* 登录表单 */}
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true, username: '', password: '' }}
            onFinish={onFinish}
            className={styles.loginForm}
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
            </Form.Item>

            {/* 记住我 & 忘记密码 */}
            <div className={styles.formExtra}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className={styles.rememberCheckbox}>记住我</Checkbox>
              </Form.Item>
              <span className={styles.forgotLink}>忘记密码？</span>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={styles.loginButton}
              >
                登 录
              </Button>
            </Form.Item>
          </Form>

          {/* 分割线 */}
          <div className={styles.dividerSection}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>其他登录方式</span>
            <div className={styles.dividerLine} />
          </div>

          {/* 第三方登录 */}
          <div className={styles.socialLogin}>
            <div className={styles.socialIcon}>
              <WechatOutlined />
            </div>
            <div className={styles.socialIcon}>
              <AlipayCircleOutlined />
            </div>
            <div className={styles.socialIcon}>
              <DingdingOutlined />
            </div>
            <div className={styles.socialIcon}>
              <GithubOutlined />
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className={styles.footer}>
          © 2026 React Admin · 企业级中后台管理系统
        </div>
      </div>
    </div>
  );
};

export default Login;
