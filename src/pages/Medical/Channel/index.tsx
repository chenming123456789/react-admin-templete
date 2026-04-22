import React, { useState } from "react";
import { Button, Table, Space, Form, message, theme } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import AlertCard from "@/components/AlertCard";
import ChannelModal from "./components/ChannelModal";
import SearchArea from "./components/SearchArea";
import { useChannelColumns } from "./hooks/useChannelColumns";
import { useModal } from "@/hooks/useModal";
import { useTable } from "@/hooks/useTable";
import type { ChannelRecord } from "./components/ChannelModal";
import { initialData } from "./constants";
import type { AlertItem } from "@/components/AlertCard";
import styles from "./index.module.scss";

const ChannelManagement: React.FC = () => {
  const { token } = theme.useToken();
  const [searchForm] = Form.useForm();

  // 使用全局公共 Hook 来统管所有的表格底层状态
  const { tableProps, data, setData, refresh } = useTable<ChannelRecord>({
    defaultData: initialData
  });

  // 使用完全解耦的通用弹窗 Hook
  const { open, mode, record, showModal, hideModal } = useModal<ChannelRecord>();

  const handleModalOk = (values: ChannelRecord) => {
    if (mode === "add") {
      const newData: ChannelRecord = {
        ...values,
        id: Date.now(),
        customerCount: 0,
        status: "active"
      };
      setData([newData, ...data]);
      message.success("新增成功");
    } else if (mode === "edit" && record) {
      setData(
        data.map((item) =>
          item.id === record.id ? { ...item, ...values } : item
        )
      );
      message.success("修改成功");
    }
    hideModal();
  };

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
    showModal("add");
  };

  const handleEdit = (record: ChannelRecord) => {
    showModal("edit", record);
  };

  const handleView = (record: ChannelRecord) => {
    showModal("view", record);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
    message.success("删除成功");
  };

  // 使用抽离的列配置 Hook
  const columns = useChannelColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete
  });

  const handleSearch = () => {
    const value = searchForm.getFieldsValue();
    refresh(value);
  };

  const handleReset = () => {
    searchForm.resetFields();
    refresh();
  };

  return (
    <div className={styles.channelPage}>
      {/* 统计提醒卡片 */}
      <AlertCard items={alertItems} />

      {/* 搜索筛选区域 (已抽离为业务组件) */}
      <SearchArea
        form={searchForm}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* 操作按钮区域 */}
      <div className={styles.actionArea}>
        <Space>
          <Button type="primary" onClick={handleAdd}>
            新增渠道
          </Button>
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
        {...tableProps}
        scroll={{ x: 1300 }}
        size="middle"
        className={styles.dataTable}
      />

      {/* 业务组件：渠道弹窗 */}
      <ChannelModal
        open={open}
        mode={mode}
        initialValues={record}
        onCancel={hideModal}
        onOk={handleModalOk}
      />
    </div>
  );
};

export default ChannelManagement;
