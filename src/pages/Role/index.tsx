import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Card,
  Modal,
  Form,
  message,
  Tag,
  Popconfirm
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import styles from "./index.module.scss";

interface RoleItem {
  id: string;
  name: string;
  code: string;
  description: string;
  createTime: string;
}

const RoleManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RoleItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RoleItem | null>(null);
  const [form] = Form.useForm();

  const fetchList = () => {
    setLoading(true);
    setTimeout(() => {
      setData([
        {
          id: "1",
          name: "超级管理员",
          code: "ROLE_ADMIN",
          description: "系统最高权限",
          createTime: "2024-01-01"
        },
        {
          id: "2",
          name: "运营人员",
          code: "ROLE_OPERATOR",
          description: "内容维护权限",
          createTime: "2024-02-01"
        }
      ]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    { title: "角色名称", dataIndex: "name", key: "name" },
    {
      title: "角色代码",
      dataIndex: "code",
      key: "code",
      render: (code: string) => <Tag color="blue">{code}</Tag>
    },
    { title: "描述", dataIndex: "description", key: "description" },
    { title: "创建时间", dataIndex: "createTime", key: "createTime" },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: RoleItem) => (
        <Space size="middle">
          <Button type="link" icon={<SafetyCertificateOutlined />}>
            分配权限
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingItem(record);
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => message.success("删除成功")}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Card bordered={false}>
      <div className={styles.toolbar}>
        <Space>
          <Input placeholder="搜索角色名称" prefix={<SearchOutlined />} />
          <Button type="primary">搜索</Button>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingItem(null);
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          新增角色
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingItem ? "编辑角色" : "新增角色"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          form.validateFields().then(() => {
            message.success("操作成功");
            setIsModalOpen(false);
          });
        }}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="角色名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="code" label="角色代码" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default RoleManagement;
