import Type from '../actions/types';
import { Employee } from '../models/employee';

type State = {
  loading: boolean;
  error: string;
  items: Record<string, Employee>;
};

const initialState: State = {
  loading: false,
  items: {},
  error: ''
};

type EmployeeFetchAll = {
  type: Type.EmployeeFetchAllSuccess;
  payload: Record<string, Employee>;
}

type EmployeeFetchOne = {
  type: Type.EmployeeFetchOneSuccess;
  payload: { id: string; employee: Employee; };
}

type EmployeeLoading = {
  type: Type.EmployeeLoading;
  payload: boolean;
}

type EmployeeError = {
  type: Type.EmployeeError;
  payload: string;
}

type Actions = EmployeeFetchAll | EmployeeLoading | EmployeeError | EmployeeFetchOne;

const employeeReducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case Type.EmployeeFetchAllSuccess:
      return { ...state, items: action.payload, error: '' };
    case Type.EmployeeFetchOneSuccess:
      return { ...state, items: { ...state.items, [action.payload.id]: action.payload.employee }, error: '' };
    case Type.EmployeeLoading:
      return { ...state, loading: action.payload };
    case Type.EmployeeError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default employeeReducer;
