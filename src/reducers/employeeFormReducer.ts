import Type from '../actions/types';

type State = {
  name: string;
  phone: string;
  shift: string;
}

export type EmployeeFormKeys = keyof State;

const initialState: State = {
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

type Action = PropertyChangeAction | ResetAction;

const employeeFormReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case Type.EmployeeFormPropertyChange:
      return { ...state, [action.payload.name]: action.payload.value };
    case Type.EmployeeFormReset:
      return { ...initialState };
    default:
      return state;
  }
};

export default employeeFormReducer;
