import {
  BOOKED_CREATE_FAIL,
  BOOKED_CREATE_SUCCESS,
  BOOKED_CREATE_REQUEST,
  BOOKED_DETAILS_REQUEST,
  BOOKED_DETAILS_SUCCESS,
  BOOKED_DETAILS_FAIL,
  BOOKED_MY_ORDER_REQUEST,
  BOOKED_MY_ORDER_SUCCESS,
  BOOKED_MY_ORDER_FAIL,
  BOOKED_MY_ORDER_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_CONFIRM_REQUEST,
  ORDER_CONFIRM_SUCCESS,
  ORDER_CONFIRM_FAIL,
  ORDER_CONFIRM_RESET,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants/bookedSessionConstants";

export const bookedCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKED_CREATE_REQUEST:
      return {
        loading: true,
      };
    case BOOKED_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case BOOKED_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const bookedSessionDetailReducer = (
  state = { loading: true, sessionItems: [], sessionDetails: {} },
  action,
) => {
  switch (action.type) {
    case BOOKED_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOOKED_DETAILS_SUCCESS:
      return {
        loading: false,

        order: action.payload,
      };
    case BOOKED_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const bookedSessionListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case BOOKED_MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case BOOKED_MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case BOOKED_MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOKED_MY_ORDER_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderConfirmReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CONFIRM_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CONFIRM_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_CONFIRM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_CONFIRM_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
