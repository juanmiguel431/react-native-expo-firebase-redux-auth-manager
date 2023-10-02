import Type from './types';
import { EmployeeFormKeys } from '../reducers/employeeFormReducer';

export const changeProperty = (name: EmployeeFormKeys, value: string) => {
  return {
    type: Type.EmployeeFormPropertyChange,
    payload: { name, value }
  }
};

export const reset = () => {
  return {
    type: Type.EmployeeFormReset,
  }
};
