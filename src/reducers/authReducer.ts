import Type from '../actions/types';
import { User } from 'firebase/auth';


type LoginFormReducerState = {
  email: string;
  password: string;
  isLoading: boolean;
  error: string;
  user: User | null;
  isSignedIn: boolean | null;
};

const initialState: LoginFormReducerState = {
  email: '',
  password: '',
  isLoading: false,
  error: '',
  user: null,
  isSignedIn: null
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

type LoginUserFailAction = {
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

type SingOutUserAction = {
  type: Type.SignOutUser
}

type SetErrorAction = {
  type: Type.SetError,
  payload: string;
}

type ResolveAuthAction = {
  type: Type.ResolveAuth,
  payload: User | null;
}

type AuthReducerAction =
  EmailChangeAction | PasswordChangeAction | SetLoadingAction | LoginUserFailAction | LoginUserAction |
  NavigateToSignupAction | NavigateToSigninAction | SingOutUserAction | SetErrorAction | ResolveAuthAction;

export const authReducer = (state: LoginFormReducerState = initialState, action: AuthReducerAction): LoginFormReducerState => {
  switch (action.type) {
    case Type.EmailChange:
      return { ...state, email: action.payload };
    case Type.PasswordChange:
      return { ...state, password: action.payload };
    case Type.SetLoading:
      return { ...state, isLoading: action.payload };
    case Type.LoginUserFail:
      return { ...state, isSignedIn: false, password: '', error: action.payload };
    case Type.LoginUserSuccess:
      return { ...state, ...initialState, isSignedIn: true, user: action.payload };
    case Type.NavigateToSignup:
    case Type.NavigateToSignin:
      return { ...state, error: '', email: '', password: '' };
    case Type.SignOutUser:
      return { ...state, user: null, isSignedIn: false };
    case Type.SetError:
      return { ...state, error: action.payload };
    case Type.ResolveAuth:
      return { ...state, user: action.payload, isSignedIn: !!action.payload };
    default:
      return state;
  }
};
