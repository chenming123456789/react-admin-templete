import React from "react";
import { Space, Button, Popconfirm, Tag, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ChannelRecord } from "../components/ChannelModal";
import styles from "../index.module.scss";

interface UseChannelColumnsProps {
  onView: (record: ChannelRecord) => void;
  onEdit: (record: ChannelRecord) => void;
  onDelete: (id: number) => void;
}

export const useChannelColumns = ({ onView, onEdit, onDelete }: UseChannelColumnsProps) => {
  const { token } = theme.useToken();

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
          <Button type="link" size="small" onClick={() => onView(record)}>
            查看
          </Button>
          <Button type="link" size="small" onClick={() => onEdit(record)}>
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
            onConfirm={() => onDelete(record.id)}
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

  return columns;
};
