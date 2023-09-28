import ActionType from '../actions/ActionType';

type LoginFormReducerState = {
  email: string;
  password: string;
};

const initialState: LoginFormReducerState = {
  email: '',
  password: ''
};

type EmailChangeAction = {
  type: ActionType.EmailChange,
  payload: string;
}

type PasswordChangeAction = {
  type: ActionType.PasswordChange,
  payload: string;
}

type LoginFormReducerAction = EmailChangeAction | PasswordChangeAction;

export const authReducer = (state: LoginFormReducerState = initialState, action: LoginFormReducerAction): LoginFormReducerState => {
  switch (action.type) {
    case ActionType.EmailChange:
      return { ...state, email: action.payload };
    case ActionType.PasswordChange:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
