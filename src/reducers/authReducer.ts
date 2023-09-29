import Type from '../actions/types';
import { User } from 'firebase/auth';


type LoginFormReducerState = {
  email: string;
  password: string;
  isLoading: boolean;
  error: string;
  user: User | null;
};

const initialState: LoginFormReducerState = {
  email: '',
  password: '',
  isLoading: false,
  error: '',
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
  type: Type.LoginUserFail,
  payload: string;
}

type LoginUserAction = {
  type: Type.LoginUserSuccess,
  payload: User;
}

type NavigateToSignupAction = {
  type: Type.NavigateToSignup
}

type NavigateToSigninAction = {
  type: Type.NavigateToSignin
}

type LoginFormReducerAction = EmailChangeAction | PasswordChangeAction | SetLoadingAction | SetErrorAction | LoginUserAction | NavigateToSignupAction | NavigateToSigninAction;

export const authReducer = (state: LoginFormReducerState = initialState, action: LoginFormReducerAction): LoginFormReducerState => {
  switch (action.type) {
    case Type.EmailChange:
      return { ...state, email: action.payload };
    case Type.PasswordChange:
      return { ...state, password: action.payload };
    case Type.SetLoading:
      return { ...state, isLoading: action.payload };
    case Type.LoginUserFail:
      return { ...state, error: action.payload };
    case Type.LoginUserSuccess:
      return { ...state, user: action.payload, error: '' };
    case Type.NavigateToSignup:
    case Type.NavigateToSignin:
      return { ...state, error: '', email: '', password: '' };
    default:
      return state;
  }
};
