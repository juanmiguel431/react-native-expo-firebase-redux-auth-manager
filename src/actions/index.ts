import Type from './types';

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
