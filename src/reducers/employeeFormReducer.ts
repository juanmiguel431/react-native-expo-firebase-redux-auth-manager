import Type from '../actions/types';

export type EmployeeFormState = {
  name: string;
  phone: string;
  shift: string;
}

export type EmployeeFormKeys = keyof EmployeeFormState;

const initialState: EmployeeFormState = {
  name: '',
  phone: '',
  shift: ''
};

type PropertyChangeAction = {
  type: Type.EmployeeFormPropertyChange,
  payload: { name: string; value: string; }
}

type ResetAction = {
  type: Type.EmployeeFormReset,
}

type SetAction = {
  type: Type.EmployeeFormSet,
  payload: EmployeeFormState
}

type Action = PropertyChangeAction | ResetAction | SetAction;

const employeeFormReducer = (state: EmployeeFormState = initialState, action: Action): EmployeeFormState => {
  switch (action.type) {
    case Type.EmployeeFormPropertyChange:
      return { ...state, [action.payload.name]: action.payload.value };
    case Type.EmployeeFormReset:
      return { ...initialState };
    case Type.EmployeeFormSet:
      return { ...action.payload };
    default:
      return state;
  }
};

export default employeeFormReducer;
