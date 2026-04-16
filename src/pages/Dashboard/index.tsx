import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, BarChartOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="总用户量" value={112893} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="今日订单" value={93} prefix={<ShoppingCartOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title="销售总额" value={112893} precision={2} prefix={<BarChartOutlined />} />
          </Card>
        </Col>
      </Row>
      <Card title="最近动态" style={{ marginTop: '24px' }} bordered={false}>
        欢迎来到 React Admin 后台管理系统。
      </Card>
    </div>
  );
};

export default Dashboard;
