import React, { useState } from "react";
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
  Form,
  theme
} from "antd";
import { WarningOutlined } from "@ant-design/icons";
import AlertCard from "@/components/AlertCard";
import ChannelModal from "./components/ChannelModal";
import type { ChannelRecord } from "./components/ChannelModal";
import type { AlertItem } from "@/components/AlertCard";
import type { ColumnsType } from "antd/es/table";
import zhCNPicker from "antd/es/date-picker/locale/zh_CN";
import styles from "./index.module.scss";

const { RangePicker } = DatePicker;

/** 模拟数据 */
const initialData: ChannelRecord[] = [
  {
    id: 1,
    name: "张大大第二...",
    customerCount: 0,
    type: "个人",
    creditCode: "-",
    licenseExpiry: "-",
    legalPerson: "张伟",
    idNumber: "654221199870...",
    idExpiry: "4月6天",
    status: "active"
  },
  {
    id: 2,
    name: "张大大渠道222",
    customerCount: 33,
    type: "企业",
    creditCode: "91320508757993...",
    licenseExpiry: "11天",
    legalPerson: "张伟",
    idNumber: "654221199870...",
    idExpiry: "4月6天",
    status: "active"
  },
  {
    id: 3,
    name: "百草花",
    customerCount: 0,
    type: "个体工商户",
    creditCode: "91440007341343...",
    licenseExpiry: "长期",
    legalPerson: "克里木·阿不...",
    idNumber: "610429201411...",
    idExpiry: "8年11月25天",
    status: "active"
  },
  {
    id: 4,
    name: "麦芽糖",
    customerCount: 0,
    type: "企业",
    creditCode: "91511000731630...",
    licenseExpiry: "已到期",
    legalPerson: "陈江森",
    idNumber: "632801189840...",
    idExpiry: "1年3月20天",
    status: "expired"
  },
  {
    id: 5,
    name: "方圆",
    customerCount: 0,
    type: "企业",
    creditCode: "92652702MA7896...",
    licenseExpiry: "长期",
    legalPerson: "陈江森",
    idNumber: "632801199940...",
    idExpiry: "1年3月20天",
    status: "active"
  },
  {
    id: 6,
    name: "安德鲁",
    customerCount: 0,
    type: "企业",
    creditCode: "91110113MA00EF...",
    licenseExpiry: "长期",
    legalPerson: "德赛伊",
    idNumber: "632801199940...",
    idExpiry: "1年3月20天",
    status: "active"
  },
  {
    id: 7,
    name: "方圆",
    customerCount: 0,
    type: "个人",
    creditCode: "-",
    licenseExpiry: "-",
    legalPerson: "陈明",
    idNumber: "511321199811...",
    idExpiry: "长期",
    status: "active"
  },
  {
    id: 8,
    name: "伊藤没花头",
    customerCount: 0,
    type: "企业",
    creditCode: "91110113MA00EF...",
    licenseExpiry: "已到期",
    legalPerson: "陈江森",
    idNumber: "632801199940...",
    idExpiry: "1年3月20天",
    status: "expired"
  },
  {
    id: 9,
    name: "江哲",
    customerCount: 0,
    type: "企业",
    creditCode: "91310000MA1FPF...",
    licenseExpiry: "23年4月8天",
    legalPerson: "江哲",
    idNumber: "510322199960...",
    idExpiry: "2年4月12天",
    status: "active"
  }
];

const ChannelManagement: React.FC = () => {
  const { token } = theme.useToken();
  const [data, setData] = useState<ChannelRecord[]>(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading] = useState(false);
  const [searchForm] = Form.useForm();

  // 弹窗状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [currRecord, setCurrRecord] = useState<ChannelRecord | null>(null);

  // 提醒数据
  const alertItems: AlertItem[] = [
    { label: "近3个月合作到期：", value: "0家", color: "blue" },
    { label: "近1个月合作到期：", value: "0家", color: "blue" },
    { label: "合作已到期：", value: "0家", color: "blue" },
    { label: "营业执照近3个月到期：", value: "2家", color: "blue" },
    { label: "营业执照近1个月到期：", value: "0家", color: "blue" },
    { label: "营业执照已到期：", value: "2家", color: "blue" },
    { label: "身份证近3个月到期：", value: "0家", color: "blue" },
    { label: "身份证近1个月到期：", value: "0家", color: "blue" },
    { label: "身份证已到期：", value: "0家", color: "blue" }
  ];

  // 操作处理
  const handleAdd = () => {
    setModalMode("add");
    setCurrRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record: ChannelRecord) => {
    setModalMode("edit");
    setCurrRecord(record);
    setIsModalOpen(true);
  };

  const handleView = (record: ChannelRecord) => {
    setModalMode("view");
    setCurrRecord(record);
    setIsModalOpen(true);
  };

  const handleModalOk = (values: any) => {
    if (modalMode === "add") {
      const newData: ChannelRecord = {
        ...values,
        id: Date.now(),
        customerCount: 0,
        status: "active"
      };
      setData([newData, ...data]);
      message.success("新增成功");
    } else if (modalMode === "edit" && currRecord) {
      setData(
        data.map((item) =>
          item.id === currRecord.id ? { ...item, ...values } : item
        )
      );
      message.success("修改成功");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
    message.success("删除成功");
  };

  // 表格列配置
  const columns: ColumnsType<ChannelRecord> = [
    {
      title: "渠道名称/姓名",
      dataIndex: "name",
      key: "name",
      width: 140,
      ellipsis: true,
      fixed: "left",
      render: (text: string) => (
        <span className={styles.nameLink} style={{ color: token.colorText }}>
          {text}
        </span>
      )
    },
    {
      title: "客户数（人）",
      dataIndex: "customerCount",
      key: "customerCount",
      width: 120,
      align: "center"
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
      width: 100
    },
    {
      title: "统一社会信用代码",
      dataIndex: "creditCode",
      key: "creditCode",
      width: 170,
      ellipsis: true
    },
    {
      title: "营业执照剩余到期时间",
      dataIndex: "licenseExpiry",
      key: "licenseExpiry",
      width: 180,
      render: (text: string) => {
        if (text === "已到期") return <Tag color="red">{text}</Tag>;
        if (text === "长期") return <Tag color="green">{text}</Tag>;
        if (text === "-") return <span>-</span>;
        return <Tag color="orange">{text}</Tag>;
      }
    },
    {
      title: "法人/经营者",
      dataIndex: "legalPerson",
      key: "legalPerson",
      width: 120,
      ellipsis: true
    },
    {
      title: "身份证号码",
      dataIndex: "idNumber",
      key: "idNumber",
      width: 150,
      ellipsis: true
    },
    {
      title: "身份证剩余到期",
      dataIndex: "idExpiry",
      key: "idExpiry",
      width: 130
    },
    {
      title: "操作",
      key: "action",
      width: 240,
      fixed: "right",
      render: (_: unknown, record: ChannelRecord) => (
        <Space size={0} separator={<span className={styles.actionDivider} />}>
          <Button type="link" size="small" onClick={() => handleView(record)}>
            查看
          </Button>
          <Button type="link" size="small" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          {record.status === "terminated" ? (
            <Button type="link" size="small">
              重启合作
            </Button>
          ) : (
            <Button type="link" size="small">
              终止合作
            </Button>
          )}
          <Popconfirm
            title="确定删除该渠道吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消">
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleSearch = () => {
    const value = searchForm.getFieldsValue();
    console.log(value);
    message.info("开发中：搜索筛选功能");
  };

  const handleReset = () => {
    searchForm.resetFields();
  };

  return (
    <div className={styles.channelPage}>
      {/* 统计提醒卡片 */}
      <AlertCard items={alertItems} />

      {/* 搜索筛选区域 */}
      <div className={styles.searchArea}>
        <Form form={searchForm}>
          <div className={styles.searchRow}>
            <Form.Item name="username" className={styles.searchInput}>
              <Input placeholder="渠道名称/法人/联系人/对接/手机" />
            </Form.Item>
            <Form.Item name="type" className={styles.searchInput}>
              <Select
                placeholder="渠道类型"
                allowClear
                options={[
                  { value: "个人", label: "个人" },
                  { value: "企业", label: "企业" },
                  { value: "个体工商户", label: "个体工商户" }
                ]}
              />
            </Form.Item>
            <Form.Item name="status" className={styles.searchInput}>
              <Select
                placeholder="合作状态"
                allowClear
                options={[
                  { value: "active", label: "合作中" },
                  { value: "expired", label: "已到期" },
                  { value: "terminated", label: "已终止" }
                ]}
              />
            </Form.Item>
            <Form.Item name="idExpiry" className={styles.searchInput}>
              <Select
                placeholder="身份证到期/剩余到期时间"
                allowClear
                options={[
                  { value: "1month", label: "近1个月到期" },
                  { value: "3month", label: "近3个月到期" },
                  { value: "expired", label: "已到期" }
                ]}
              />
            </Form.Item>
          </div>
          <div className={styles.searchRow}>
            <Form.Item name="licenseExpiry" className={styles.searchInput}>
              <Select
                placeholder="营业执照到期/剩余到期时间"
                allowClear
                options={[
                  { value: "1month", label: "近1个月到期" },
                  { value: "3month", label: "近3个月到期" },
                  { value: "expired", label: "已到期" }
                ]}
              />
            </Form.Item>
            <Form.Item name="cooperationExpiry" className={styles.searchInput}>
              <Select
                placeholder="合作到期/剩余时间"
                allowClear
                options={[
                  { value: "1month", label: "近1个月到期" },
                  { value: "3month", label: "近3个月到期" },
                  { value: "expired", label: "已到期" }
                ]}
              />
            </Form.Item>
            <Form.Item name="createTime" className={styles.searchInput}>
              <Select
                placeholder="创建时间"
                allowClear
                options={[
                  { value: "today", label: "今天" },
                  { value: "week", label: "本周" },
                  { value: "month", label: "本月" }
                ]}
              />
            </Form.Item>
            <Form.Item name="cooperationRange" className={styles.searchInput}>
              <RangePicker locale={zhCNPicker} placeholder={["合作开始日期", "合作结束日期"]} />
            </Form.Item>
            <Button type="primary" onClick={handleSearch}>
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
        </Form>
      </div>

      {/* 操作按钮区域 */}
      <div className={styles.actionArea}>
        <Space>
          <Button type="primary" onClick={handleAdd}>新增渠道</Button>
          <Button>导出选中</Button>
          <Button>导出全部</Button>
        </Space>
        <div
          className={styles.alertNotice}
          style={{
            background: token.colorWarningBg,
            borderColor: token.colorWarningBorder,
            color: token.colorWarningText
          }}>
          <WarningOutlined className={styles.alertNoticeIcon} />
          <span>
            你有 <span className={styles.alertNoticeCount}>2条</span>{" "}
            缓期中的条款，点击查看
          </span>
        </div>
      </div>

      {/* 数据表格 */}
      <Table<ChannelRecord>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys)
        }}
        scroll={{ x: 1300 }}
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          size: "default"
        }}
        size="middle"
        className={styles.dataTable}
      />

      {/* 业务组件：渠道弹窗 */}
      <ChannelModal
        open={isModalOpen}
        mode={modalMode}
        initialValues={currRecord}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
      />
    </div>
  );
};

export default ChannelManagement;
