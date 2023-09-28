import Type from '../actions/types';

type LoginFormReducerState = {
  email: string;
  password: string;
};

const initialState: LoginFormReducerState = {
  email: '',
  password: ''
};

type EmailChangeAction = {
  type: Type.EmailChange,
  payload: string;
}

type PasswordChangeAction = {
  type: Type.PasswordChange,
  payload: string;
}

type LoginFormReducerAction = EmailChangeAction | PasswordChangeAction;

export const authReducer = (state: LoginFormReducerState = initialState, action: LoginFormReducerAction): LoginFormReducerState => {
  switch (action.type) {
    case Type.EmailChange:
      return { ...state, email: action.payload };
    case Type.PasswordChange:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
