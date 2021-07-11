import React from 'react';
import { Table, Select } from 'antd';
import employeeService, { Employee } from '../../services/employeeService';

interface EmployeeTableProps {
  employees: ReadonlyArray<Employee>;
  onLoadEmployees: () => void;
  onSuccess: (message: string) => void;
}

function EmployeeTable({
  employees,
  onLoadEmployees,
  onSuccess,
}: EmployeeTableProps) {
  const handleStatusChange = (value: string, id: string) => {
    employeeService.patchEmployee(id, { status: value }).then(() => {
      onSuccess('Employee status updated');
      onLoadEmployees();
    });
  };

  const columns = [
    {
      title: 'First name',
      width: 50,
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last name',
      width: 50,
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Job title',
      width: 50,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Gender',
      width: 50,
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Phone number',
      width: 50,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      width: 50,
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Employee) => {
        return (
          <Select
            value={status}
            onChange={(val) => handleStatusChange(val, record.id)}
          >
            <Select.Option value="added">ADDED</Select.Option>
            <Select.Option value="in-check">IN-CHECK</Select.Option>
            <Select.Option value="approved">APPROVED</Select.Option>
            <Select.Option value="active">ACTIVE</Select.Option>
            <Select.Option value="inactive">INACTIVE</Select.Option>
          </Select>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={employees}
      pagination={false}
      bordered
      scroll={{ x: 1400, y: 400 }}
    />
  );
}

export default EmployeeTable;
