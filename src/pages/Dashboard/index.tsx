import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import AlertCard from '@/components/AlertCard';
import type { AlertItem } from '@/components/AlertCard';
import styles from './index.module.scss';

const Dashboard: React.FC = () => {
  // 示例提醒数据
  const alertItems: AlertItem[] = [
    { label: '待处理订单：', value: '12笔', color: 'red' },
    { label: '今日预约：', value: '28人', color: 'blue' },
    { label: '待审核申请：', value: '5条', color: 'orange' },
    { label: '系统消息：', value: '3条', color: 'blue' },
  ];

  return (
    <div className={styles.dashboardWrapper}>
      {/* 统计提醒 */}
      <AlertCard items={alertItems} />

      {/* 统计卡片 */}
      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic
              title="总用户量"
              value={112893}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic
              title="今日订单"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic
              title="销售总额"
              value={112893}
              precision={2}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false} className={styles.statCard}>
            <Statistic
              title="转化率"
              value={9.3}
              precision={1}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 最近动态 */}
      <Card title="最近动态" className={styles.recentCard} bordered={false}>
        欢迎来到 React Admin 后台管理系统。系统整体风格已按照企业级管理后台标准完成改造。
      </Card>
    </div>
  );
};

export default Dashboard;
