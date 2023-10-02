import Type from './types';
import { EmployeeFormKeys, EmployeeFormState } from '../reducers/employeeFormReducer';

export const changeProperty = (name: EmployeeFormKeys, value: string) => {
  return {
    type: Type.EmployeeFormPropertyChange,
    payload: { name, value }
  }
};

export const employeeFormReset = () => {
  return {
    type: Type.EmployeeFormReset,
  }
};

export const employeeFormSet = (formValues: EmployeeFormState) => {
  return {
    type: Type.EmployeeFormSet,
    payload: formValues
  }
};
