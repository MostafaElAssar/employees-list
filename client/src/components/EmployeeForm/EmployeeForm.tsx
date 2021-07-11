import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import employeeService, { Employee } from '../../services/employeeService';

interface EmployeeFormProps {
  onLoadEmployees: () => void;
  onSuccess: (message: string) => void;
}

function EmployeeForm({ onLoadEmployees, onSuccess }: EmployeeFormProps) {
  const [form] = Form.useForm();
  const onFinish = (values: Omit<Employee, 'id' | 'status'>) => {
    employeeService.createEmployee(values).then(() => {
      onSuccess('Employee added');
      form.resetFields();
      onLoadEmployees();
    });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 12 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="First name"
        name="firstName"
        rules={[{ required: true, message: 'Please input a first name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastName"
        rules={[{ required: true, message: 'Please input a last name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Job title"
        name="title"
        rules={[{ required: true, message: 'Please input a job title!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select allowClear>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input a phone number!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EmployeeForm;
