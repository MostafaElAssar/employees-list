import EmployeeApi from '../api/EmployeeApi';

type Response<T> = {
  data: T;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  gender: string;
  phone: number;
  status: string;
};

function loadEmployees(): Promise<Response<ReadonlyArray<Employee>>> {
  return EmployeeApi.get(`/employees/`);
}

function createEmployee(
  employee: Omit<Employee, 'id' | 'status'>
): Promise<void> {
  return EmployeeApi.post(`/employees/`, employee);
}

function patchEmployee(id: string, employee: Partial<Employee>): Promise<void> {
  return EmployeeApi.patch(`/employees/${id}`, employee);
}

const employeeService = {
  loadEmployees,
  createEmployee,
  patchEmployee,
};

export default employeeService;
