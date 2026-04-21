import React, { useState } from "react";
import {
  Input,
  Form,
  Select,
  DatePicker,
  Button,
  Table,
  Tag,
  Space,
  Popconfirm,
  message,
  theme
} from "antd";
import { WarningOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import type { ColumnsType } from "antd/es/table";
import ChangeAccountModal from "./components/ChangeAccountModal";
import ChannelAccountModal from "./components/ChannelAccountModal";
import type { ChannelRecord } from "./components/ChannelAccountModal";


const { RangePicker } = DatePicker;


const AccountManagement: React.FC = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] =
    useState<ChannelRecord | null>(null);

  const initialData: ChannelRecord[] = [
    {
      id: 1,
      name: "百草花",
      type: "个体工商户",
      idExpiry: "长期",
      legalPerson: "克里木·阿布都热衣木江",
      phoneNumber: "13812345678",
      status: "active",
      contactPerson: "张三",
      contactPersonPhone: "13812345678",
      createTime: "2022-01-01"
    },
    {
      id: 2,
      name: "张大大",
      type: "个人",
      idExpiry: "长期",
      legalPerson: "张伟",
      phoneNumber: "13812345678",
      status: "active",
      contactPerson: "张三",
      contactPersonPhone: "13812345678",
      createTime: "2022-01-01"
    },
    {
      id: 3,
      name: "张大大",
      type: "个人",
      idExpiry: "长期",
      legalPerson: "张伟",
      phoneNumber: "13812345678",
      status: "active",
      contactPerson: "张三",
      contactPersonPhone: "13800000000",
      createTime: "2022-01-01"
    },
    {
      id: 4,
      name: "张大大",
      type: "个人",
      idExpiry: "长期",
      legalPerson: "张伟",
      phoneNumber: "13812345678",
      status: "active",
      contactPerson: "张三",
      contactPersonPhone: "13800000000",
      createTime: "2022-01-01"
    }
  ];

  const [data, setData] = useState<ChannelRecord[]>(initialData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add')

  const handleAddAccount = () => {
    setModalMode('add')
    setCurrentRecord(null)
    setIsAddModalOpen(true);
  };

  const handleAddModalEdit = (record: ChannelRecord) => {
    setModalMode("edit");
    setCurrentRecord(record);
    setIsAddModalOpen(true);
  };

  const handleAddModalView = (record: ChannelRecord) => {
    setModalMode("view");
    setCurrentRecord(record);
    setIsAddModalOpen(true);
  };

  const handleAddModalModalOk = (values: any) => {
    if (modalMode === 'add') {
      const newData: ChannelRecord = {
        ...values,
        id: Date.now(),
      };
      setData([newData, ...data]);
      message.success("新增成功");
    } else if (modalMode === "edit" && currentRecord) {
      setData(
        data.map((item) =>
          item.id === currentRecord.id ? { ...item, ...values } : item
        )
      );
      message.success("修改成功");
    }
    setIsAddModalOpen(false);
  }

  const handleAddModalDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
    message.success("删除成功");
  };

  const handleSearch = () => {
    const value = form.getFieldsValue();
    console.log(value);
  };

  const handleEdit = (record: ChannelRecord) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const handleModalOk = (values: any) => {
    console.log("提交的变更数据:", values);
    message.success("账号变更成功");
    setIsModalOpen(false);
  };

  const columns: ColumnsType<ChannelRecord> = [
    {
      title: "渠道名称",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 200,
      ellipsis: true
    },
    {
      title: "法人/经营者",
      dataIndex: "legalPerson",
      key: "legalPerson",
      width: 120,
      align: "center"
    },
    {
      title: "渠道类型",
      dataIndex: "type",
      key: "type",
      width: 100
    },
    {
      title: "身份证剩余到期时间",
      dataIndex: "idExpiry",
      key: "idExpiry",
      width: 170,
      ellipsis: true
    },
    {
      title: "法人/经营者手机号码",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 180,
      render: (text: string) => {
        if (text === "已到期") return <Tag color="red">{text}</Tag>;
        if (text === "长期") return <Tag color="green">{text}</Tag>;
        if (text === "-") return <span>-</span>;
        return <Tag color="orange">{text}</Tag>;
      }
    },
    {
      title: "联络人",
      dataIndex: "contactPerson",
      key: "contactPerson",
      width: 120,
      ellipsis: true
    },
    {
      title: "联络人手机号码",
      dataIndex: "contactPersonPhone",
      key: "contactPersonPhone",
      width: 150,
      ellipsis: true
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 130
    },
    {
      title: "操作",
      key: "action",
      width: 260,
      fixed: "right",
      render: (_: unknown, record: ChannelRecord) => (
        <Space size={0} separator={<span className={styles.actionDivider} />}>
          <Button type="link" size="small" onClick={() => handleAddModalView(record)}>
            查看
          </Button>
          <Button type="link" size="small" onClick={() => handleAddModalEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定删除该账号吗？"
            onConfirm={() => handleAddModalDelete(record.id)}
            okText="确定"
            cancelText="取消">
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
          <Button type="link" size="small" onClick={() => handleEdit(record)}>
            变更
          </Button>
          {/* 如果账号状态为已停用（0），显示“启用”，否则显示“禁用” */}
          {record.status === "0" ? (
            <Button type="link" size="small">
              启用
            </Button>
          ) : (
            <>
              <Button type="link" size="small">
                禁用
              </Button>
              <Popconfirm
                title="确认要终止该渠道合作吗？"
                description="终止后，该渠道将无法登录系统，请谨慎操作！"
                okText="确定"
                cancelText="取消">
                <Button type="link" size="small" danger>
                  终止合作
                </Button>
              </Popconfirm>
            </>
          )}
          {record.idExpiry === "长期" ? (
            <Button type="link" size="small">
              重置密码
            </Button>
          ) : (
            <>
              <Button type="link" size="small">
                开通账户
              </Button>
            </>
          )}
        </Space>
      )
    }
  ];

  const [loading] = useState(false);

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div className={styles.accountPage}>
      {/* 搜索筛选区域 */}
      <div className={styles.searchArea}>
        <Form form={form}>
          <div className={styles.searchRow}>
            <Form.Item name="username" className={styles.searchInput}>
              <Input placeholder="渠道名称/法人/联系人/对接/手机" />
            </Form.Item>
            <Form.Item name="type" className={styles.searchInput}>
              <Select
                placeholder="渠道类型"
                allowClear
                className={styles.searchInput}
                options={[
                  { value: "personal", label: "个人" },
                  { value: "enterprise", label: "企业" },
                  { value: "individual", label: "个体工商户" }
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
            <Form.Item name="isOpen" className={styles.searchInput}>
              <Select
                placeholder="账号是否开通"
                allowClear
                options={[
                  { value: 1, label: "是" },
                  { value: 0, label: "否" }
                ]}
              />
            </Form.Item>
          </div>
          <div className={styles.searchRow}>
            <Form.Item name="accountStatus" className={styles.searchInput}>
              <Select
                placeholder="账号状态"
                allowClear
                options={[
                  { value: 0, label: "已停用" },
                  { value: 1, label: "使用中" }
                ]}
              />
            </Form.Item>
            <Form.Item name="createTime" className={styles.searchInput}>
              <RangePicker
                placeholder={["合作开始日期", "合作结束日期"]}
                allowClear
              />
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
          <Button type="primary" onClick={handleAddAccount} >新增账户</Button>
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

      {/* 表格数据 */}
      <Table<ChannelRecord>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1300 }}
        pagination={{
          total: 13,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          size: "default"
        }}
        size="middle"
      />

      {/* 变更账号弹窗 */}
      <ChangeAccountModal
        visible={isModalOpen}
        initialValues={currentRecord}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalOk}
      />
      {/* 业务组件：账号弹窗 */}
      <ChannelAccountModal
        open={isAddModalOpen}
        mode={modalMode}
        initialValues={currentRecord}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={handleAddModalModalOk}
      />
    </div>
  );
};

export default AccountManagement;
