import React, { useState } from 'react';
import {
  Input,
  Select,
  Button,
  Table,
  Space,
  DatePicker,
  Popconfirm,
  message,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  ExportOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import AlertCard from '@/components/AlertCard';
import type { AlertItem } from '@/components/AlertCard';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.scss';

const { RangePicker } = DatePicker;

/** 渠道数据类型 */
interface ChannelRecord {
  id: number;
  name: string;
  customerCount: number;
  type: string;
  creditCode: string;
  licenseExpiry: string;
  legalPerson: string;
  idNumber: string;
  idExpiry: string;
  status: 'active' | 'expired' | 'terminated';
}

/** 模拟数据 */
const mockData: ChannelRecord[] = [
  {
    id: 1,
    name: '张大大第二...',
    customerCount: 0,
    type: '个人',
    creditCode: '-',
    licenseExpiry: '-',
    legalPerson: '张伟',
    idNumber: '654221199870...',
    idExpiry: '4月6天',
    status: 'active',
  },
  {
    id: 2,
    name: '张大大渠道222',
    customerCount: 33,
    type: '企业',
    creditCode: '91320508757993...',
    licenseExpiry: '11天',
    legalPerson: '张伟',
    idNumber: '654221199870...',
    idExpiry: '4月6天',
    status: 'active',
  },
  {
    id: 3,
    name: '百草花',
    customerCount: 0,
    type: '个体工商户',
    creditCode: '91440007341343...',
    licenseExpiry: '长期',
    legalPerson: '克里木·阿不...',
    idNumber: '610429201411...',
    idExpiry: '8年11月25天',
    status: 'active',
  },
  {
    id: 4,
    name: '麦芽糖',
    customerCount: 0,
    type: '企业',
    creditCode: '91511000731630...',
    licenseExpiry: '已到期',
    legalPerson: '陈江森',
    idNumber: '632801189840...',
    idExpiry: '1年3月20天',
    status: 'expired',
  },
  {
    id: 5,
    name: '方圆',
    customerCount: 0,
    type: '企业',
    creditCode: '92652702MA7896...',
    licenseExpiry: '长期',
    legalPerson: '陈江森',
    idNumber: '632801199940...',
    idExpiry: '1年3月20天',
    status: 'active',
  },
  {
    id: 6,
    name: '安德鲁',
    customerCount: 0,
    type: '企业',
    creditCode: '91110113MA00EF...',
    licenseExpiry: '长期',
    legalPerson: '德赛伊',
    idNumber: '632801199940...',
    idExpiry: '1年3月20天',
    status: 'active',
  },
  {
    id: 7,
    name: '方圆',
    customerCount: 0,
    type: '个人',
    creditCode: '-',
    licenseExpiry: '-',
    legalPerson: '陈明',
    idNumber: '511321199811...',
    idExpiry: '长期',
    status: 'active',
  },
  {
    id: 8,
    name: '伊藤没花头',
    customerCount: 0,
    type: '企业',
    creditCode: '91110113MA00EF...',
    licenseExpiry: '已到期',
    legalPerson: '陈江森',
    idNumber: '632801199940...',
    idExpiry: '1年3月20天',
    status: 'expired',
  },
  {
    id: 9,
    name: '江哲',
    customerCount: 0,
    type: '企业',
    creditCode: '91310000MA1FPF...',
    licenseExpiry: '23年4月8天',
    legalPerson: '江哲',
    idNumber: '510322199960...',
    idExpiry: '2年4月12天',
    status: 'active',
  },
];

const ChannelManagement: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading] = useState(false);

  // 提醒数据
  const alertItems: AlertItem[] = [
    { label: '身份证近3个月到期：', value: '0家', color: 'blue' },
    { label: '身份证近1个月到期：', value: '0家', color: 'blue' },
    { label: '身份证已到期：', value: '0家', color: 'blue' },
  ];

  // 表格列配置
  const columns: ColumnsType<ChannelRecord> = [
    {
      title: '渠道名称/姓名',
      dataIndex: 'name',
      key: 'name',
      width: 140,
      ellipsis: true,
      render: (text: string) => <span className={styles.nameLink}>{text}</span>,
    },
    {
      title: '客户数（人）',
      dataIndex: 'customerCount',
      key: 'customerCount',
      width: 100,
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: '统一社会信用代码',
      dataIndex: 'creditCode',
      key: 'creditCode',
      width: 170,
      ellipsis: true,
    },
    {
      title: '营业执照剩余到期时间',
      dataIndex: 'licenseExpiry',
      key: 'licenseExpiry',
      width: 160,
      render: (text: string) => {
        if (text === '已到期') return <Tag color="red">{text}</Tag>;
        if (text === '长期') return <Tag color="green">{text}</Tag>;
        if (text === '-') return <span>-</span>;
        return <Tag color="orange">{text}</Tag>;
      },
    },
    {
      title: '法人/经营者',
      dataIndex: 'legalPerson',
      key: 'legalPerson',
      width: 120,
      ellipsis: true,
    },
    {
      title: '身份证号码',
      dataIndex: 'idNumber',
      key: 'idNumber',
      width: 150,
      ellipsis: true,
    },
    {
      title: '身份证剩余到期',
      dataIndex: 'idExpiry',
      key: 'idExpiry',
      width: 130,
    },
    {
      title: '操作',
      key: 'action',
      width: 220,
      fixed: 'right',
      render: (_: unknown, record: ChannelRecord) => (
        <Space size={0} split={<span className={styles.actionDivider} />}>
          <Button type="link" size="small" className={styles.actionBtn}>
            查看渠道
          </Button>
          {record.status === 'terminated' ? (
            <Button type="link" size="small" className={styles.actionBtnGreen}>
              重启合作
            </Button>
          ) : (
            <Button type="link" size="small" className={styles.actionBtnOrange}>
              终止合作
            </Button>
          )}
          <Popconfirm
            title="确定删除该渠道吗？"
            onConfirm={() => message.success('删除成功')}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger className={styles.actionBtnDanger}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleSearch = () => {
    message.info('搜索功能待对接后端接口');
  };

  const handleReset = () => {
    message.info('重置搜索条件');
  };

  return (
    <div className={styles.channelPage}>
      {/* 统计提醒卡片 */}
      <AlertCard items={alertItems} />

      {/* 搜索筛选区域 */}
      <div className={styles.searchArea}>
        <div className={styles.searchRow}>
          <Input
            placeholder="渠道名称/法人/联系人/对接/手机"
            className={styles.searchInput}
            allowClear
          />
          <Select
            placeholder="渠道类型"
            className={styles.searchSelect}
            allowClear
            options={[
              { value: 'personal', label: '个人' },
              { value: 'enterprise', label: '企业' },
              { value: 'individual', label: '个体工商户' },
            ]}
          />
          <Select
            placeholder="合作状态"
            className={styles.searchSelect}
            allowClear
            options={[
              { value: 'active', label: '合作中' },
              { value: 'expired', label: '已到期' },
              { value: 'terminated', label: '已终止' },
            ]}
          />
          <Select
            placeholder="身份证到期/剩余到期时间"
            className={styles.searchSelectWide}
            allowClear
            options={[
              { value: '1month', label: '近1个月到期' },
              { value: '3month', label: '近3个月到期' },
              { value: 'expired', label: '已到期' },
            ]}
          />
          <Select
            placeholder="营业执照到期/剩余到期时间"
            className={styles.searchSelectWide}
            allowClear
            options={[
              { value: '1month', label: '近1个月到期' },
              { value: '3month', label: '近3个月到期' },
              { value: 'expired', label: '已到期' },
            ]}
          />
        </div>
        <div className={styles.searchRow}>
          <Select
            placeholder="合作到期/剩余时间"
            className={styles.searchSelect}
            allowClear
            options={[
              { value: '1month', label: '近1个月到期' },
              { value: '3month', label: '近3个月到期' },
              { value: 'expired', label: '已到期' },
            ]}
          />
          <Select
            placeholder="创建时间"
            className={styles.searchSelect}
            allowClear
            options={[
              { value: 'today', label: '今天' },
              { value: 'week', label: '本周' },
              { value: 'month', label: '本月' },
            ]}
          />
          <Select
            placeholder="到期时间"
            className={styles.searchSelect}
            allowClear
            options={[
              { value: '1month', label: '1个月内' },
              { value: '3month', label: '3个月内' },
              { value: '6month', label: '6个月内' },
            ]}
          />
          <RangePicker
            placeholder={['合作开始日期', '合作结束日期']}
            className={styles.searchDateRange}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
            查询
          </Button>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
        </div>
      </div>

      {/* 操作按钮区域 */}
      <div className={styles.actionArea}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}>
            新增渠道
          </Button>
          <Button icon={<ExportOutlined />}>导出选中</Button>
          <Button icon={<ExportOutlined />}>导出全部</Button>
        </Space>
        <div className={styles.alertNotice}>
          <WarningOutlined className={styles.alertNoticeIcon} />
          <span>
            你有 <span className={styles.alertNoticeCount}>2条</span> 缓期中的条款，点击查看
          </span>
        </div>
      </div>

      {/* 数据表格 */}
      <Table<ChannelRecord>
        rowKey="id"
        columns={columns}
        dataSource={mockData}
        loading={loading}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        scroll={{ x: 1300 }}
        pagination={{
          total: 13,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          size: 'default',
        }}
        size="middle"
        className={styles.dataTable}
      />
    </div>
  );
};

export default ChannelManagement;
