import { SignIn } from './components/sign-in/SignIn';

export const GET_PARAMS = {
  popup: 'popup',
};

export const GET_ENUMS = {
  popup: {
    signIn: 'sign-in',
  },
  execute: {
    signOut: 'sign-out',
  },
};

export const GET_POPUP = {
  [GET_ENUMS.popup.signIn]: SignIn,
};
