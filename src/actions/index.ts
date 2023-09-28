import ActionType from './ActionType';

export const emailChange = (email: string) => {
  return {
    type: ActionType.EmailChange,
    payload: email
  }
};

export const passwordChange = (password: string) => {
  return {
    type: ActionType.PasswordChange,
    payload: password
  }
};
