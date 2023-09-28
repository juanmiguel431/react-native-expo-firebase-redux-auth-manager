import Type from '../actions/types';
import { User } from 'firebase/auth';


type LoginFormReducerState = {
  email: string;
  password: string;
  isLoading: boolean;
  errorMessage: string;
  user: User | null;
};

const initialState: LoginFormReducerState = {
  email: '',
  password: '',
  isLoading: false,
  errorMessage: '',
  user: null
};

type EmailChangeAction = {
  type: Type.EmailChange,
  payload: string;
}

type PasswordChangeAction = {
  type: Type.PasswordChange,
  payload: string;
}

type SetLoadingAction = {
  type: Type.SetLoading,
  payload: boolean;
}

type SetErrorAction = {
  type: Type.SetError,
  payload: string;
}

type LoginUserAction = {
  type: Type.LoginUser,
  payload: User;
}

type LoginFormReducerAction = EmailChangeAction | PasswordChangeAction | SetLoadingAction | SetErrorAction | LoginUserAction;

export const authReducer = (state: LoginFormReducerState = initialState, action: LoginFormReducerAction): LoginFormReducerState => {
  console.log('JMPC', action);
  switch (action.type) {
    case Type.EmailChange:
      return { ...state, email: action.payload };
    case Type.PasswordChange:
      return { ...state, password: action.payload };
    case Type.SetLoading:
      return { ...state, isLoading: action.payload };
    case Type.SetError:
      return { ...state, errorMessage: action.payload };
    case Type.LoginUser:
      return { ...state, user: action.payload, errorMessage: '' };
    default:
      return state;
  }
};
