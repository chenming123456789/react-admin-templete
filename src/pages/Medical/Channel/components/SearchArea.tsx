import React from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import type { FormInstance } from "antd/es/form";
import zhCNPicker from "antd/es/date-picker/locale/zh_CN";
import styles from "../index.module.scss";

const { RangePicker } = DatePicker;

interface SearchAreaProps {
  form: FormInstance;
  onSearch: () => void;
  onReset: () => void;
}

const SearchArea: React.FC<SearchAreaProps> = ({ form, onSearch, onReset }) => {
  return (
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
          <Button type="primary" onClick={onSearch}>
            查询
          </Button>
          <Button onClick={onReset}>重置</Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchArea;
