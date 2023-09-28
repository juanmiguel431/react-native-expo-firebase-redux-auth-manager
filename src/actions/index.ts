import Type from './types';
import { User } from '../models/user';
import { AuthError, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Dispatch } from 'redux';

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

export const loginUser = ({ email, password }: User) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: Type.SetLoading, payload: true });

    const credentials = await signInWithEmailAndPassword(getAuth(), email, password);

    dispatch({ type: Type.LoginUser, payload: credentials.user });

  } catch (e) {
    if (e instanceof Error) {
      const err = e as AuthError;
      dispatch({ type: Type.SetError, payload: err.message });
    }
  } finally {
    dispatch({ type: Type.SetLoading, payload: false });
  }
}
