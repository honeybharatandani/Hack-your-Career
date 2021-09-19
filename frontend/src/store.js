import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  counsellorListReducer,
  counsellorDetailsReducer,
  counsellorDeleteReducer,
  counsellorCreateReducer,
  counsellorUpdateReducer,
} from "./reducers/counsellorReducers";
import { sessionReducer } from "./reducers/sessionReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  bookedCreateReducer,
  bookedSessionDetailReducer,
  bookedSessionListReducer,
  orderListReducer,
  orderConfirmReducer,
  orderDeliverReducer,
} from "./reducers/bookedreducers";

const reducer = combineReducers({
  counsellorList: counsellorListReducer,
  counsellorDetails: counsellorDetailsReducer,
  counsellorDelete: counsellorDeleteReducer,
  counsellorCreate: counsellorCreateReducer,
  counsellorUpdate: counsellorUpdateReducer,
  session: sessionReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  bookedCreate: bookedCreateReducer,
  bookedDetails: bookedSessionDetailReducer,
  bookedSessionList: bookedSessionListReducer,
  orderList: orderListReducer,
  orderConfirm: orderConfirmReducer,
  orderDeliver: orderDeliverReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const sessionFromStorage = localStorage.getItem("sessionItem")
  ? JSON.parse(localStorage.getItem("sessionItem"))
  : [];

const sessionDataFromStorge = localStorage.getItem("sessionDetails")
  ? JSON.parse(localStorage.getItem("sessionDetails"))
  : {};

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  session: {
    sessionItems: sessionFromStorage,
    sessionDetails: sessionDataFromStorge,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
