import React, { useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Input,
  Tabs,
  Badge,
  Progress,
  Pagination,
  Typography,
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

// --- Types ---
interface PatientRecord {
  key: string;
  name: string;
  gender: string;
  age: string;
  phone: string;
  tags: string[];
  progress: {
    name: string;
    current: number;
    total: number;
  };
  status: "待签" | "已诊" | "待诊" | "已退";
  isNew: boolean;
  fee: string;
}

interface DoctorInfo {
  id: string;
  name: string;
  isAll?: boolean;
  status?: string;
  counters: {
    total: number;
    pendingSign: number;
    pendingConsult: number;
    completed: number;
  };
}

const Registration: React.FC = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeStatus, setActiveStatus] = useState("1");
  const [selectedDoctorId, setSelectedDoctorId] = useState("all");

  // --- Mock Data ---
  const doctors: DoctorInfo[] = [
    {
      id: "all",
      name: "全部医生",
      isAll: true,
      counters: { total: 10, pendingSign: 3, pendingConsult: 4, completed: 3 },
    },
    {
      id: "1",
      name: "冷奇林",
      status: "停诊",
      counters: { total: 0, pendingSign: 0, pendingConsult: 0, completed: 0 },
    },
    {
      id: "2",
      name: "张伟",
      counters: { total: 5, pendingSign: 2, pendingConsult: 2, completed: 1 },
    },
    {
      id: "3",
      name: "李娜",
      counters: { total: 3, pendingSign: 1, pendingConsult: 1, completed: 1 },
    },
    {
      id: "4",
      name: "王强",
      counters: { total: 2, pendingSign: 0, pendingConsult: 1, completed: 1 },
    },
  ];

  const therapists: DoctorInfo[] = [
    {
      id: "all",
      name: "全部理疗师",
      isAll: true,
      counters: { total: 8, pendingSign: 2, pendingConsult: 3, completed: 3 },
    },
    {
      id: "1",
      name: "刘芳",
      counters: { total: 3, pendingSign: 1, pendingConsult: 1, completed: 1 },
    },
    {
      id: "2",
      name: "陈明",
      counters: { total: 2, pendingSign: 1, pendingConsult: 1, completed: 0 },
    },
    {
      id: "3",
      name: "赵静",
      counters: { total: 3, pendingSign: 0, pendingConsult: 1, completed: 2 },
    },
  ];

  const patientData: PatientRecord[] = [
    {
      key: "1",
      name: "测试坤",
      gender: "女",
      age: "30岁",
      phone: "18523045564",
      tags: ["标签01", "测试其二名称"],
      progress: { name: "经络疏通", current: 0, total: 500 },
      status: "待签",
      isNew: true,
      fee: "0.00",
    },
    {
      key: "2",
      name: "张三",
      gender: "男",
      age: "45岁",
      phone: "13812345678",
      tags: ["颈椎病", "慢性疼痛"],
      progress: { name: "颈椎牵引", current: 100, total: 300 },
      status: "待诊",
      isNew: false,
      fee: "50.00",
    },
    {
      key: "3",
      name: "李四",
      gender: "女",
      age: "28岁",
      phone: "13987654321",
      tags: ["腰椎间盘突出"],
      progress: { name: "腰部理疗", current: 0, total: 200 },
      status: "已诊",
      isNew: true,
      fee: "80.00",
    },
    {
      key: "4",
      name: "王五",
      gender: "男",
      age: "52岁",
      phone: "13765432198",
      tags: ["肩周炎", "关节疼痛"],
      progress: { name: "肩部按摩", current: 150, total: 250 },
      status: "待签",
      isNew: false,
      fee: "60.00",
    },
    {
      key: "5",
      name: "赵六",
      gender: "女",
      age: "35岁",
      phone: "13698765432",
      tags: ["头痛", "失眠"],
      progress: { name: "头部理疗", current: 50, total: 150 },
      status: "待诊",
      isNew: true,
      fee: "70.00",
    },
    {
      key: "6",
      name: "孙七",
      gender: "男",
      age: "40岁",
      phone: "13567891234",
      tags: ["膝盖疼痛", "关节炎"],
      progress: { name: "膝关节治疗", current: 0, total: 300 },
      status: "已诊",
      isNew: false,
      fee: "90.00",
    },
  ];

  // 根据当前标签获取对应的人员列表
  const currentStaffList = activeTab === "1" ? doctors : therapists;
  // 根据选中的医生/理疗师和状态筛选患者数据
  const filteredPatientData = patientData.filter(() => {
    // 这里可以根据实际需求添加筛选逻辑
    return true;
  });

  // --- Columns Configuration ---
  const columns = [
    {
      title: "患者",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Space>
          <Badge status="processing" color="#d9d9d9" />
          <Text style={{ color: "#1890ff", cursor: "pointer" }}>{text}</Text>
        </Space>
      ),
    },
    { title: "性别", dataIndex: "gender", key: "gender" },
    { title: "年龄", dataIndex: "age", key: "age" },
    { title: "手机", dataIndex: "phone", key: "phone" },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <Space size={[0, 4]} wrap>
          {tags.map((t) => (
            <Tag
              key={t}
              color="green"
              style={{
                borderRadius: 10,
                background: "#f6ffed",
                borderColor: "#b7eb8f",
                color: "#52c41a",
              }}
            >
              {t}
            </Tag>
          ))}
          <EllipsisOutlined style={{ color: "#999" }} />
        </Space>
      ),
    },
    {
      title: "待执行项目进度",
      dataIndex: "progress",
      key: "progress",
      render: (p: PatientRecord["progress"]) => (
        <div style={{ width: 120 }}>
          <Text type="secondary">
            {p.name} {p.current}/{p.total}...
          </Text>
          <Progress
            percent={0}
            showInfo={false}
            size="small"
            strokeColor="#1890ff"
          />
        </div>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Text style={{ color: "#fa8c16" }}>{status}</Text>
      ),
    },
    {
      title: "初/复诊",
      dataIndex: "isNew",
      key: "isNew",
      render: (isNew: boolean) => (
        <Tag color="cyan" style={{ borderRadius: 4 }}>
          {isNew ? "初诊" : "复诊"}
        </Tag>
      ),
    },
    {
      title: "挂号费",
      dataIndex: "fee",
      key: "fee",
      render: (val: string) => (
        <Text>
          {val}{" "}
          <Text type="secondary">
            待收费
          </Text>
        </Text>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" style={{ padding: 0 }}>
            协作板
          </Button>
          <Button type="link" style={{ padding: 0 }}>
            更多
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* --- Header --- */}
      <div
        style={{
          background: "#fff",
          padding: "0 20px",
          borderBottom: "1px solid #f0f0f0",
          height: 48,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { key: "1", label: "门诊" },
            { key: "2", label: "理疗" },
          ]}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Button type="link" style={{ color: "#1890ff" }}>
            排班
          </Button>
          <Space>
            <Button size="small">回到今天</Button>
            <Space>
              <LeftOutlined style={{ fontSize: 12, cursor: "pointer" }} />
              <Text strong>2026-04-11</Text>
              <RightOutlined style={{ fontSize: 12, cursor: "pointer" }} />
            </Space>
          </Space>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* --- Left Sidebar: Doctors --- */}
        <div
          style={{
            width: 200,
            background: "#f7f9fb",
            borderRight: "1px solid #f0f0f0",
            padding: "12px",
          }}
        >
          {currentStaffList.map((doc) => (
            <div
              key={doc.id}
              style={{
                marginBottom: 8,
                padding: "12px",
                borderRadius: 4,
                border:
                  doc.id === selectedDoctorId
                    ? "1px solid #1890ff"
                    : "1px solid #f0f0f0",
                background: doc.id === selectedDoctorId ? "#e6f7ff" : "#fff",
                cursor: "pointer",
              }}
              onClick={() => setSelectedDoctorId(doc.id)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Text strong>{doc.name}</Text>
                  {doc.status && (
                    <Tag
                      color="error"
                      style={{
                        marginLeft: 8,
                        borderRadius: 10,
                        fontSize: 12,
                        padding: "0 6px",
                      }}
                    >
                      {doc.status}
                    </Tag>
                  )}
                </div>
                <Button
                  size="small"
                  type="link"
                  style={{
                    color: doc.id === selectedDoctorId ? "#1890ff" : "#666",
                  }}
                >
                  挂号
                </Button>
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>
                共:{doc.counters.total} 待签:{doc.counters.pendingSign} 已诊:
                {doc.counters.completed}
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: 24,
              paddingTop: 12,
              borderTop: "1px solid #e8e8e8",
            }}
          >
            <Button
              type="link"
              block
              style={{ textAlign: "left", padding: 0, color: "#666" }}
            >
              小工具
            </Button>
          </div>
        </div>

        {/* --- Right Content: Patient Table --- */}
        <div style={{ flex: 1, padding: "16px" }}>
          {/* --- Status Tabs --- */}
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tabs
              activeKey={activeStatus}
              onChange={setActiveStatus}
              type="card"
              size="small"
              items={[
                { key: "1", label: `全部(${filteredPatientData.length})` },
                { key: "2", label: "待签(0)" },
                { key: "3", label: "已诊(0)" },
                { key: "4", label: "待诊(0)" },
                { key: "5", label: "已退(0)" },
                { key: "6", label: "待预(0)" },
              ]}
            />
            <Space>
              <Input
                placeholder="输入姓名或手机号搜索"
                prefix={<SearchOutlined style={{ color: "#ccc" }} />}
                style={{ width: 220, borderRadius: 20 }}
              />
              <Text type="secondary">等级筛选</Text>
              <Space size={4}>
                <Badge color="orange" />
                <Badge color="red" />
                <Badge color="green" />
                <Badge color="#ccc" />
              </Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ borderRadius: 6, background: "#1890ff" }}
              >
                协作板
              </Button>
            </Space>
          </div>

          {/* --- Patient Table --- */}
          <Table
            columns={columns}
            dataSource={filteredPatientData}
            pagination={{ size: "small", total: filteredPatientData.length }}
            size="middle"
            rowClassName={() => "custom-table-row"}
            style={{ marginBottom: 16 }}
          />

          {/* --- Bottom Info --- */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Text type="secondary">共 {filteredPatientData.length} 条</Text>
              <Button type="link" style={{ color: "#1890ff" }}>
                叫号器
              </Button>
              <Button type="link" style={{ color: "#1890ff" }}>
                下一位 &gt;
              </Button>
            </div>
            <Pagination size="small" total={filteredPatientData.length} />
          </div>
        </div>
      </div>

      <style>{`
        .ant-tabs-nav::before { border-bottom: none !important; }
        .ant-tabs-tab-active { font-weight: bold; }
        .custom-table-row:hover { background-color: #f0f7ff !important; }
        .ant-table-thead > tr > th { background: #f7f9fb !important; color: #666 !important; font-weight: normal !important; }
        .ant-table { margin-bottom: 0 !important; }
      `}</style>
    </div>
  );
};

export default Registration;
