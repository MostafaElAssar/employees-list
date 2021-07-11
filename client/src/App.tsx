import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';
import 'antd/dist/antd.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import { EmployeeState } from './reducers/employeeReducer';
import { loadEmployees } from './actions/employeeActions';
import { Employee } from './services/employeeService';

interface AppProps {
  onLoadEmployees: () => void;
  employees: ReadonlyArray<Employee>;
}

function App({ onLoadEmployees, employees }: AppProps) {
  const displayNotification = (message: string) => {
    const args = {
      message: 'Success',
      description: message,
      duration: 2,
    };
    notification.open(args);
  };

  useEffect(() => {
    onLoadEmployees();
  }, [onLoadEmployees]);

  return (
    <div>
      <EmployeeForm
        onLoadEmployees={onLoadEmployees}
        onSuccess={displayNotification}
      />
      <EmployeeTable
        employees={employees}
        onLoadEmployees={onLoadEmployees}
        onSuccess={displayNotification}
      />
    </div>
  );
}

const mapStateToProps = (state: { employee: EmployeeState }) => ({
  employees: state.employee.employees,
  loading: state.employee.loading,
});

const mapDispatchToProps = {
  onLoadEmployees: loadEmployees,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
