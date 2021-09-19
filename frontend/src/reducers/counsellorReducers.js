import {
  COUNSELLOR_LIST_REQUEST,
  COUNSELLOR_LIST_SUCCESS,
  COUNSELLOR_LIST_FAILURE,
  COUNSELLOR_DETAILS_REQUEST,
  COUNSELLOR_DETAILS_SUCCESS,
  COUNSELLOR_DETAILS_FAILURE,
  COUNSELLOR_DELETE_REQUEST,
  COUNSELLOR_DELETE_SUCCESS,
  COUNSELLOR_DELETE_FAIL,
  COUNSELLOR_CREATE_REQUEST,
  COUNSELLOR_CREATE_SUCCESS,
  COUNSELLOR_CREATE_FAIL,
  COUNSELLOR_CREATE_RESET,
  COUNSELLOR_UPDATE_REQUEST,
  COUNSELLOR_UPDATE_SUCCESS,
  COUNSELLOR_UPDATE_FAIL,
  COUNSELLOR_UPDATE_RESET,
} from "../constants/counsellorConstants";

export const counsellorListReducer = (state = { counsellors: [] }, action) => {
  switch (action.type) {
    case COUNSELLOR_LIST_REQUEST:
      return { loading: true, counsellors: [] };
    case COUNSELLOR_LIST_SUCCESS:
      return { loading: false, counsellors: action.payload };
    case COUNSELLOR_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const counsellorDetailsReducer = (
  state = { counsellor: { reviews: [] } },
  action,
) => {
  switch (action.type) {
    case COUNSELLOR_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COUNSELLOR_DETAILS_SUCCESS:
      return { loading: false, counsellor: action.payload };
    case COUNSELLOR_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const counsellorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNSELLOR_DELETE_REQUEST:
      return { loading: true };
    case COUNSELLOR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COUNSELLOR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const counsellorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COUNSELLOR_CREATE_REQUEST:
      return { loading: true };
    case COUNSELLOR_CREATE_SUCCESS:
      return { loading: false, success: true, counsellor: action.payload };
    case COUNSELLOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COUNSELLOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const counsellorUpdateReducer = (state = { counsellor: {} }, action) => {
  switch (action.type) {
    case COUNSELLOR_UPDATE_REQUEST:
      return { loading: true };
    case COUNSELLOR_UPDATE_SUCCESS:
      return { loading: false, success: true, counsellor: action.payload };
    case COUNSELLOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COUNSELLOR_UPDATE_RESET:
      return { counsellor: {} };
    default:
      return state;
  }
};
