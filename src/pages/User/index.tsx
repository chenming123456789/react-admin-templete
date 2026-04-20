import React, { useState, useEffect } from 'react';
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
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import styles from './index.module.scss';

interface UserItem {
  id: string;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createTime: string;
}

const UserManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UserItem | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  // 模拟请求列表数据
  const fetchList = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData: UserItem[] = [
        {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          role: '管理员',
          status: 'active',
          createTime: '2024-01-01'
        },
        {
          id: '2',
          username: 'user1',
          email: 'user1@example.com',
          role: '普通用户',
          status: 'active',
          createTime: '2024-02-15'
        },
        {
          id: '3',
          username: 'user2',
          email: 'user2@example.com',
          role: '普通用户',
          status: 'inactive',
          createTime: '2024-03-10'
        }
      ];
      setData(mockData);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (item: UserItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    message.success('删除成功');
    setData(data.filter((item) => item.id !== id));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        // 编辑
        setData(
          data.map((item) =>
            item.id === editingItem.id ? { ...item, ...values } : item
          )
        );
        message.success('更新成功');
      } else {
        // 新增
        const newItem: UserItem = {
          ...values,
          id: Date.now().toString(),
          createTime: new Date().toISOString().split('T')[0],
          status: 'active'
        };
        setData([newItem, ...data]);
        message.success('创建成功');
      }
      setIsModalOpen(false);
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  const columns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '活跃' : '禁用'}
        </Tag>
      )
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserItem) => (
        <Space size='middle'>
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title='确定删除该用户吗？'
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type='link' danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className={styles.userWrapper}>
      <Card bordered={false}>
        <div className={styles.toolbar}>
          <Space>
            <Input
              placeholder='搜索用户名'
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchInput}
            />
            <Button type='primary' onClick={fetchList}>
              搜索
            </Button>
          </Space>
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
            新增用户
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data.filter((item) => item.username.includes(searchText))}
          rowKey='id'
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title={editingItem ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='username'
            label='用户名'
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='邮箱'
            rules={[
              { required: true, type: 'email', message: '请输入有效的邮箱' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='role'
            label='角色'
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
