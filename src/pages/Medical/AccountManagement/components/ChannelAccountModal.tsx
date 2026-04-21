import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Row, Col, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import zhCNPicker from 'antd/es/date-picker/locale/zh_CN';

const { RangePicker } = DatePicker;

export interface ChannelRecord {
  id: number;
  name: string;
  legalPerson: string;
  type: string;
  idExpiry: string;
  phoneNumber: string;
  contactPerson: string;
  contactPersonPhone: string;
  createTime: string;
}

interface ChannelModalProps {
  open: boolean;
  mode: "add" | "edit" | "view";
  initialValues?: ChannelRecord | null;
  onCancel: () => void;
  onOk: (values: any) => void;
}

const ChannelAccountModal: React.FC<ChannelModalProps> = ({
  open,
  mode,
  initialValues,
  onCancel,
  onOk
}) => {

  const [form] = Form.useForm();

  // 当弹窗打开或初始值变化时，重置表单
  useEffect(() => {
    if (open) {
      if (mode === 'add') {
        form.resetFields();
      } else if (initialValues) {
        const processDateRange = (str: string) => {
          if (!str || str === "-" || str === "长期") return undefined;
          const parts = str.split(" 至 ");
          if (parts.length === 2 && dayjs(parts[0]).isValid() && dayjs(parts[1]).isValid()) {
            return [dayjs(parts[0]), dayjs(parts[1])];
          }
          return undefined;
        };
        form.setFieldsValue({
          ...initialValues,
          idExpiry: processDateRange(initialValues?.idExpiry || "-"),
          createTime: processDateRange(initialValues?.createTime || "-")
        });
      }
    }
  }, [open, mode, initialValues, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // 将日期范围数组转换为字符串，方便前端 mock 数据展示
      const formatRange = (range: any) => {
        if (range && range.length === 2) {
          return `${range[0].format("YYYY-MM-DD")} 至 ${range[1].format("YYYY-MM-DD")}`;
        }
        return "-";
      };

      onOk({
        ...values,
        idExpiry: formatRange(values.idExpiry),
        createTime: formatRange(values.createTime)
      });
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  }
  const title = {
    add: "新增账号",
    edit: "编辑账号",
    view: "查看账号"
  }[mode];

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      width={750}
      okText="保存"
      cancelText="取消"
      destroyOnHidden
      footer={
        mode === 'view'
          ? [
            <Button key="close" onClick={onCancel}>
              关闭
            </Button>
          ]
          : undefined
      }
    >
      <Form
        form={form}
        layout="vertical"
        style={{ paddingTop: 20 }}
        disabled={mode === "view"}
        requiredMark={true}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="渠道名称"
              rules={[{ required: true, message: "请输入渠道名称" }]}
            >
              <Input placeholder="请输入渠道名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="legalPerson"
              label="法人/经营者	"
              rules={[{ required: true, message: "请输入法人/经营者	" }]}
            >
              <Input placeholder="请输入法人/经营者	" />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="type"
              label="渠道类型"
              rules={[{ required: true, message: "请选择渠道类型" }]}
            >
              <Select
                placeholder="请选择渠道类型"
                options={[
                  { value: "个人", label: "个人" },
                  { value: "企业", label: "企业" },
                  { value: "个体工商户", label: "个体工商户" }
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="idExpiry"
              label="身份证有效期"
              rules={[{ required: true, message: "请选择身份证有效期" }]}
            >
              <RangePicker locale={zhCNPicker} style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="phoneNumber"
              label="法人/经营者手机号码"
              rules={[
                { required: true, message: "请输入法人/经营者手机号码" },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "请输入正确的手机号码格式"
                }
              ]}
            >
              <Input placeholder="请输入法人/经营者手机号码" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contactPerson"
              label="联络人"
              rules={[{ required: true, message: "请输入联络人" }]}
            >
              <Input
                placeholder="请输入联络人"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="contactPersonPhone"
              label="联络人手机号码"
              rules={[{ required: true, message: "请输入联络人手机号码" }]}
            >
              <Input
                placeholder="请输入联络人手机号码"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="createTime"
              label="创建时间"
              rules={[{ required: true, message: "请选择创建时间" }]}
            >
              <RangePicker locale={zhCNPicker} style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ChannelAccountModal;