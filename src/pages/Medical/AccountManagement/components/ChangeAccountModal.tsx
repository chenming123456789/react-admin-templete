import React, { useEffect } from "react";
import { Modal, Form, Input, Radio, message } from "antd";

interface ChangeAccountModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: any) => void;
  initialValues?: any;
}

const ChangeAccountModal: React.FC<ChangeAccountModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          ownerType: "contact", // 默认为渠道联系人，实际可能根据 record 调整
          accountName: initialValues.name,
          accountNumber: initialValues.phoneNumber,
          gender: "male", // 默认男
          ...initialValues
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const handleConfirm = async () => {
    try {
      const values = await form.validateFields();
      onOk(values);
    } catch (error) {
      console.error("Validate Failed:", error);
    }
  };

  return (
    <Modal
      title="变更账号"
      open={visible}
      onCancel={onCancel}
      onOk={handleConfirm}
      okText="确认"
      cancelText="取消"
      width={600}
      destroyOnClose>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          ownerType: "contact",
          gender: "male"
        }}>
        <Form.Item
          label="主账号所属人"
          name="ownerType"
          rules={[{ required: true, message: "请选择主账号所属人" }]}>
          <Radio.Group>
            <Radio value="contact">渠道联系人</Radio>
            <Radio value="legal">渠道法人/经营者/个人</Radio>
            <Radio value="others">其他人</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="账户名"
          name="accountName"
          rules={[
            { required: true, message: "请输入账户名" },
            { max: 20, message: "账户名最多20个字符" }
          ]}>
          <Input placeholder="请输入账户名" maxLength={20} showCount />
        </Form.Item>

        <Form.Item
          label="主账号"
          name="accountNumber"
          extra="只能使用手机号码作为主账号"
          rules={[
            { required: true, message: "请输入主账号" },
            { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码" }
          ]}>
          <Input placeholder="请输入手机号码" />
        </Form.Item>

        <Form.Item
          label="性别"
          name="gender"
          rules={[{ required: true, message: "请选择性别" }]}>
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeAccountModal;
