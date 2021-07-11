import {
    LoadEmployeesActions,
    LOAD_EMPLOYEES_REQUEST,
    LOAD_EMPLOYEES_SUCCESS,
    LOAD_EMPLOYEES_FAILURE,
  } from '../actions/employeeActions';
  import { Employee } from '../services/employeeService';
  
  export type EmployeeState = {
    employees: ReadonlyArray<Employee>;
    loading: boolean;
  };
  
  const initialState: EmployeeState = {
    employees: [],
    loading: false,
  };
  
  const employeesReducer = (
    state: EmployeeState = initialState,
    action: LoadEmployeesActions
  ) => {
    switch (action.type) {
      case LOAD_EMPLOYEES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOAD_EMPLOYEES_SUCCESS:
        return {
          ...state,
          loading: false,
          employees: action.payload,
        };
      case LOAD_EMPLOYEES_FAILURE:
        return {
          ...state,
          loading: false,
          employees: [],
        };
      default:
        return state;
    }
  };
  
  export default employeesReducer;