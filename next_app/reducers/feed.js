import produce from "immer";

const initialState = {
  previewImage: null,
  mainFeeds: [],
  //
  st_imageUploadLoading: false,
  st_imageUploadDone: false,
  st_imageUploadError: null,
  //
  st_feedCreateLoading: false,
  st_feedCreateDone: false,
  st_feedCreateError: null,
  //
  st_feedListLoading: false,
  st_feedListDone: false,
  st_feedListError: null,
};

export const IMAGE_UPLOAD_REQUEST = "IMAGE_UPLOAD_REQUEST";
export const IMAGE_UPLOAD_SUCEESS = "IMAGE_UPLOAD_SUCEESS";
export const IMAGE_UPLOAD_FAILURE = "IMAGE_UPLOAD_FAILURE";
//
export const FEED_CREATE_REQUEST = "FEED_CREATE_REQUEST";
export const FEED_CREATE_SUCEESS = "FEED_CREATE_SUCEESS";
export const FEED_CREATE_FAILURE = "FEED_CREATE_FAILURE";
//
export const FEED_LIST_REQUEST = "FEED_LIST_REQUEST";
export const FEED_LIST_SUCEESS = "FEED_LIST_SUCEESS";
export const FEED_LIST_FAILURE = "FEED_LIST_FAILURE";
//
export const CLEAR_PREVIEW_IMAGE = "CLEAR_PREVIEW_IMAGE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case IMAGE_UPLOAD_REQUEST: {
        draft.st_imageUploadLoading = true;
        draft.st_imageUploadDone = false;
        draft.st_imageUploadError = null;
        break;
      }

      case IMAGE_UPLOAD_SUCEESS: {
        draft.st_imageUploadLoading = false;
        draft.st_imageUploadDone = true;
        draft.st_imageUploadError = null;
        draft.previewImage = action.data.path;
        break;
      }

      case IMAGE_UPLOAD_FAILURE: {
        draft.st_imageUploadLoading = false;
        draft.st_imageUploadDone = false;
        draft.st_imageUploadError = action.data;
        break;
      }
      /////////////////////////////////////////////

      case FEED_CREATE_REQUEST: {
        draft.st_feedCreateLoading = true;
        draft.st_feedCreateDone = false;
        draft.st_feedCreateError = null;
        break;
      }

      case FEED_CREATE_SUCEESS: {
        draft.st_feedCreateLoading = false;
        draft.st_feedCreateDone = true;
        draft.st_feedCreateError = null;
        break;
      }

      case FEED_CREATE_FAILURE: {
        draft.st_feedCreateLoading = false;
        draft.st_feedCreateDone = false;
        draft.st_feedCreateError = action.data;
        break;
      }
      /////////////////////////////////////////////

      case FEED_LIST_REQUEST: {
        draft.st_feedListLoading = true;
        draft.st_feedListDone = false;
        draft.st_feedListError = null;
        break;
      }

      case FEED_LIST_SUCEESS: {
        draft.st_feedListLoading = false;
        draft.st_feedListDone = true;
        draft.st_feedListError = null;
        draft.st_feedCreateDone = false;
        draft.mainFeeds = action.data;
        break;
      }

      case FEED_LIST_FAILURE: {
        draft.st_feedListLoading = false;
        draft.st_feedListDone = false;
        draft.st_feedListError = action.data;
        break;
      }
      /////////////////////////////////////////////

      case CLEAR_PREVIEW_IMAGE: {
        draft.previewImage = null;
      }

      /////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
