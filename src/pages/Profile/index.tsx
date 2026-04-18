import React from 'react';
import { Card, Descriptions, Avatar, Button, Tabs, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/useUserStore';
import styles from './index.module.scss';

const Profile: React.FC = () => {
  const userInfo = useUserStore((state) => state.userInfo);

  const onUpdateProfile = (values: any) => {
    message.success('个人信息更新成功');
    console.log(values);
  };

  const onChangePassword = (values: any) => {
    message.success('密码修改成功');
    console.log(values);
  };

  return (
    <div className={styles.profileWrapper}>
      <Card bordered={false}>
        <div className={styles.avatarSection}>
          <Avatar size={100} src={userInfo?.avatar} icon={<UserOutlined />} className={styles.avatar} />
          <h2>{userInfo?.username}</h2>
          <p className={styles.roleText}>{userInfo?.role === 'admin' ? '超级管理员' : '普通用户'}</p>
        </div>

        <Tabs defaultActiveKey="1" centered items={[
          {
            key: '1',
            label: '基本信息',
            children: (
              <Form layout="vertical" initialValues={{ username: userInfo?.username }} onFinish={onUpdateProfile} className={styles.formArea}>
                <Form.Item label="用户名" name="username" rules={[{ required: true }]}><Input prefix={<UserOutlined />} disabled /></Form.Item>
                <Form.Item label="电子邮箱" name="email"><Input prefix={<MailOutlined />} placeholder="请输入邮箱" /></Form.Item>
                <Form.Item label="个人简介" name="bio"><Input.TextArea placeholder="介绍一下自己吧" /></Form.Item>
                <Button type="primary" htmlType="submit">保存修改</Button>
              </Form>
            ),
          },
          {
            key: '2',
            label: '修改密码',
            children: (
              <Form layout="vertical" onFinish={onChangePassword} className={styles.formArea}>
                <Form.Item label="当前密码" name="currentPassword" rules={[{ required: true }]}><Input.Password prefix={<LockOutlined />} /></Form.Item>
                <Form.Item label="新密码" name="newPassword" rules={[{ required: true }]}><Input.Password prefix={<LockOutlined />} /></Form.Item>
                <Form.Item label="确认新密码" name="confirmPassword" dependencies={['newPassword']} rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                      return Promise.reject(new Error('两次输入的密码不一致!'));
                    },
                  }),
                ]}><Input.Password prefix={<LockOutlined />} /></Form.Item>
                <Button type="primary" danger htmlType="submit">重置密码</Button>
              </Form>
            ),
          }
        ]} />
      </Card>
    </div>
  );
};

export default Profile;
