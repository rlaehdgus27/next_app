import produce from "immer";

const initialState = {
  me: null,
  //
  st_signUpLoading: false,
  st_signUpDone: false,
  st_signUpError: null,
  //
  st_signInLoading: false, // 로그인
  st_signInDone: false,
  st_signInError: null,
  //
  st_loadMyInfoLoading: false,
  st_loadMyInfoDone: false,
  st_loadMyInfoError: null,
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCEESS = "SIGN_UP_SUCEESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCEESS = "SIGN_IN_SUCEESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCEESS = "LOAD_MY_INFO_SUCEESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGN_UP_REQUEST: {
        draft.st_signUpLoading = true;
        draft.st_signUpDone = false;
        draft.st_signUpError = null;
        break;
      }

      case SIGN_UP_SUCEESS: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = true;
        draft.st_signUpError = null;
        draft.me = action.data;
        break;
      }

      case SIGN_UP_FAILURE: {
        draft.st_signUpLoading = false;
        draft.st_signUpDone = false;
        draft.st_signUpError = action.data;
        break;
      }
      /////////////////////////////////////////////

      case SIGN_IN_REQUEST: {
        draft.st_signInLoading = true;
        draft.st_signInDone = false;
        draft.st_signInError = null;
        break;
      }

      case SIGN_IN_SUCEESS: {
        draft.st_signInLoading = false;
        draft.st_signInDone = true;
        draft.st_signInError = null;
        draft.me = action.data;
        break;
      }

      case SIGN_IN_FAILURE: {
        draft.st_signInLoading = false;
        draft.st_signInDone = false;
        draft.st_signInError = action.data;
        break;
      }
      /////////////////////////////////////////////

      case LOAD_MY_INFO_REQUEST: {
        draft.st_loadMyInfoLoading = true;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = null;
        break;
      }

      case LOAD_MY_INFO_SUCEESS: {
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = true;
        draft.st_loadMyInfoError = null;
        draft.me = action.data;
        break;
      }

      case LOAD_MY_INFO_FAILURE: {
        draft.st_loadMyInfoLoading = false;
        draft.st_loadMyInfoDone = false;
        draft.st_loadMyInfoError = action.data;
        break;
      }
      /////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
