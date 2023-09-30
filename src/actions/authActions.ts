import Type from './types';
import { User } from '../models/user';
import { AuthError, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, User as FbUser } from 'firebase/auth';
import { Dispatch } from 'redux';
import { navigate } from '../RootNavigation';
import { SCREEN } from '../models/screen';

export const emailChange = (email: string) => {
  return {
    type: Type.EmailChange,
    payload: email
  }
};

export const passwordChange = (password: string) => {
  return {
    type: Type.PasswordChange,
    payload: password
  }
};

export const navigateToSignup = () => {
  navigate(SCREEN.Signup);
  return {
    type: Type.NavigateToSignup
  }
};

export const navigateToSignin = () => {
  navigate(SCREEN.Signin);
  return {
    type: Type.NavigateToSignin
  }
};

export const loginUser = ({ email, password }: User) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: Type.SetLoading, payload: true });

    const credentials = await signInWithEmailAndPassword(getAuth(), email, password);

    dispatch({ type: Type.LoginUserSuccess, payload: credentials.user });

  } catch (e) {
    if (e instanceof Error) {
      const err = e as AuthError;
      dispatch({ type: Type.LoginUserFail, payload: err.message });
    }
  } finally {
    dispatch({ type: Type.SetLoading, payload: false });
  }
}

export const signupUser = ({ email, password }: User) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: Type.SetLoading, payload: true });

    const credentials = await createUserWithEmailAndPassword(getAuth(), email, password);

    dispatch({ type: Type.LoginUserSuccess, payload: credentials.user });

  } catch (e) {
    if (e instanceof Error) {
      const err = e as AuthError;
      dispatch({ type: Type.LoginUserFail, payload: err.message });
    }
  } finally {
    dispatch({ type: Type.SetLoading, payload: false });
  }
}

export const signOutUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: Type.SetLoading, payload: true });

    await signOut(getAuth());

    dispatch({ type: Type.SignOutUser });

  } catch (e) {
    if (e instanceof Error) {
      const err = e as AuthError;
      dispatch({ type: Type.SetError, payload: err.message });
    }
  } finally {
    dispatch({ type: Type.SetLoading, payload: false });
  }
}
export const resolveAuth = (user: FbUser | null) => {
  return {
    type: Type.ResolveAuth,
    payload: user
  }
}
