import { Action } from 'redux';
import employeeService, { Employee } from '../services/employeeService';

export const LOAD_EMPLOYEES_REQUEST = 'LOAD_EMPLOYEES_REQUEST';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LOAD_EMPLOYEES_REQUEST = typeof LOAD_EMPLOYEES_REQUEST;
export interface LoadEmployeesRequestAction extends Action {
  type: LOAD_EMPLOYEES_REQUEST;
}

export const LOAD_EMPLOYEES_SUCCESS = 'LOAD_EMPLOYEES_SUCCESS';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LOAD_EMPLOYEES_SUCCESS = typeof LOAD_EMPLOYEES_SUCCESS;
export interface LoadEmployeesSuccessAction extends Action {
  type: LOAD_EMPLOYEES_SUCCESS;
  payload: ReadonlyArray<Employee>;
}

export const LOAD_EMPLOYEES_FAILURE = 'LOAD_EMPLOYEES_FAILURE';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LOAD_EMPLOYEES_FAILURE = typeof LOAD_EMPLOYEES_FAILURE;
export interface LoadEmployeesFailureAction extends Action {
  type: LOAD_EMPLOYEES_FAILURE;
}

export type LoadEmployeesActions =
  | LoadEmployeesRequestAction
  | LoadEmployeesSuccessAction
  | LoadEmployeesFailureAction;

export const loadEmployees =
  () => (dispatch: (action: LoadEmployeesActions) => void) => {
    dispatch({
      type: LOAD_EMPLOYEES_REQUEST,
    });
    return employeeService.loadEmployees().then(
      (res) => {
        dispatch({
          type: LOAD_EMPLOYEES_SUCCESS,
          payload: res.data,
        });
      },
      () => {
        dispatch({
          type: LOAD_EMPLOYEES_FAILURE,
        });
      }
    );
  };
