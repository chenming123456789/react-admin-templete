import React, { useState, useMemo } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Statistic,
  Form,
  Input,
  Select,
  Button,
  Space,
  Divider,
  Typography,
  Radio,
  message,
  InputNumber
} from 'antd';
import {
  CalculatorOutlined,
  MedicineBoxOutlined,
  PlusOutlined,
  SearchOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import styles from './index.module.scss';

const { Title, Text } = Typography;

interface BillingItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

const Billing: React.FC = () => {
  const [items, setItems] = useState<BillingItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('wechat');
  const [patientSearch, setPatientSearch] = useState('');

  // 模拟收费项目库
  const itemLibrary = [
    { name: '布洛芬缓释胶囊', price: 25.5, category: '西药' },
    { name: '血常规检查', price: 45.0, category: '检查' },
    { name: '葡萄糖注射液', price: 12.8, category: '处置' },
    { name: '雾化治疗', price: 60.0, category: '治疗' }
  ];

  const handleAddItem = () => {
    const randomItem =
      itemLibrary[Math.floor(Math.random() * itemLibrary.length)];
    const newItem: BillingItem = {
      id: Date.now().toString(),
      ...randomItem,
      quantity: 1
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  // 计算总和
  const { subtotal, discount, total } = useMemo(() => {
    const sub = items.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    const disc = sub > 100 ? 10 : 0; // 模拟满100减10
    return { subtotal: sub, discount: disc, total: Math.max(0, sub - disc) };
  }, [items]);

  const handleSettle = () => {
    if (items.length === 0) {
      message.warning('请先添加收费项目');
      return;
    }
    message.success(
      `结算成功！总计金额: ￥${total.toFixed(2)}，支付方式: ${paymentMethod}`
    );
    setItems([]);
  };

  const columns = [
    { title: '项目名称', dataIndex: 'name', key: 'name' },
    { title: '类别', dataIndex: 'category', key: 'category' },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (v: number) => `￥${v.toFixed(2)}`
    },
    {
      title: '数量',
      key: 'quantity',
      render: (_: any, r: BillingItem) => (
        <InputNumber
          min={1}
          value={r.quantity}
          onChange={(v) => updateQuantity(r.id, v || 1)}
        />
      )
    },
    {
      title: '小计',
      key: 'total',
      render: (_: any, r: BillingItem) =>
        `￥${(r.price * r.quantity).toFixed(2)}`
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: BillingItem) => (
        <Button type='link' danger onClick={() => removeItem(record.id)}>
          移除
        </Button>
      )
    }
  ];

  return (
    <div className={styles.billingWrapper}>
      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='今日总收入'
              value={12850.5}
              precision={2}
              prefix='￥'
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='待结算单数'
              value={12}
              prefix={<CalculatorOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='已退费笔数'
              value={2}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title='平均客单价'
              value={245.8}
              precision={2}
              prefix='￥'
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={16}>
          <Card
            title='开单工作台'
            bordered={false}
            extra={
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={handleAddItem}
              >
                添加收费项
              </Button>
            }
          >
            <div className={styles.searchSection}>
              <Space>
                <Input
                  placeholder='搜索患者就诊号/手机号'
                  prefix={<SearchOutlined />}
                  className={styles.patientInput}
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                />
                <Button onClick={() => message.info('正在查询患者信息...')}>
                  查询
                </Button>
                {patientSearch && (
                  <Text type='success'>匹配到患者: 张三 (男, 35岁)</Text>
                )}
              </Space>
            </div>
            <Table
              columns={columns}
              dataSource={items}
              rowKey='id'
              pagination={false}
              size='middle'
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title='结算中心' bordered={false}>
            <div className={styles.settlementSection}>
              <div className={styles.summaryRow}>
                <Text type='secondary'>项目总额</Text>
                <Text>￥{subtotal.toFixed(2)}</Text>
              </div>
              <div className={styles.discountRow}>
                <Text type='secondary'>优惠减免</Text>
                <Text type='danger'>-￥{discount.toFixed(2)}</Text>
              </div>
              <Divider dashed />
              <div className={styles.totalRow}>
                <Title level={4} className={styles.totalLabel}>
                  应收合计
                </Title>
                <Title level={3} className={styles.totalAmount}>
                  ￥{total.toFixed(2)}
                </Title>
              </div>

              <div className={styles.paymentSection}>
                <Text strong className={styles.paymentLabel}>
                  支付方式
                </Text>
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  buttonStyle='solid'
                  className={styles.paymentGroup}
                >
                  <Radio.Button value='cash' className={styles.paymentBtn}>
                    现金
                  </Radio.Button>
                  <Radio.Button value='wechat' className={styles.paymentBtn}>
                    微信
                  </Radio.Button>
                  <Radio.Button value='alipay' className={styles.paymentBtn}>
                    支付宝
                  </Radio.Button>
                </Radio.Group>
              </div>

              <Button
                type='primary'
                size='large'
                block
                icon={<CreditCardOutlined />}
                onClick={handleSettle}
                disabled={items.length === 0}
              >
                确认结算 (￥{total.toFixed(2)})
              </Button>
            </div>
          </Card>

          <Card bordered={false} className={styles.reminderCard}>
            <Title level={5}>
              <MedicineBoxOutlined /> 医生开药提醒
            </Title>
            <Text type='secondary'>
              患者有 2 项待执行的处置项目尚未计费，请确认是否同步。
            </Text>
            <Button type='link' ghost className={styles.reminderLink}>
              查看待同步项目
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Billing;
