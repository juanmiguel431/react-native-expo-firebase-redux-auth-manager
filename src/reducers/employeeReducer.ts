import Type from '../actions/types';
import { Employee } from '../models/employee';

type State = {
  loading: boolean;
  error: string;
  items: Employee[];
};

const initialState: State = {
  loading: false,
  items: [],
  error: ''
};

type EmployeeFetch = {
  type: Type.EmployeeFetchSuccess;
  payload: Employee[];
}

type EmployeeLoading = {
  type: Type.EmployeeLoading;
  payload: boolean;
}

type EmployeeError = {
  type: Type.EmployeeError;
  payload: string;
}

type Actions = EmployeeFetch | EmployeeLoading | EmployeeError;

const employeeReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case Type.EmployeeFetchSuccess:
      return { ...state, items: action.payload, error: '' };
    case Type.EmployeeLoading:
      return { ...state, loading: action.payload };
    case Type.EmployeeError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default employeeReducer;
