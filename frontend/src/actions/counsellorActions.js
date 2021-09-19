import axios from "axios";
import {
  COUNSELLOR_LIST_REQUEST,
  COUNSELLOR_LIST_SUCCESS,
  COUNSELLOR_LIST_FAILURE,
  COUNSELLOR_DETAILS_REQUEST,
  COUNSELLOR_DETAILS_SUCCESS,
  COUNSELLOR_DETAILS_FAILURE,
  COUNSELLOR_DELETE_FAIL,
  COUNSELLOR_DELETE_SUCCESS,
  COUNSELLOR_DELETE_REQUEST,
  COUNSELLOR_CREATE_REQUEST,
  COUNSELLOR_CREATE_SUCCESS,
  COUNSELLOR_CREATE_FAIL,
  COUNSELLOR_UPDATE_REQUEST,
  COUNSELLOR_UPDATE_SUCCESS,
  COUNSELLOR_UPDATE_FAIL,
} from "../constants/counsellorConstants";

export const listCounsellors = () => async (dispatch) => {
  try {
    dispatch({ type: COUNSELLOR_LIST_REQUEST });

    const { data } = await axios.get("/api/counsellors");
    console.log(data,"data");

    dispatch({
      type: COUNSELLOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNSELLOR_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCounsellorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUNSELLOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/counsellors/${id}`);

    dispatch({
      type: COUNSELLOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNSELLOR_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCounsellor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNSELLOR_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/counsellors/${id}`, config);

    dispatch({
      type: COUNSELLOR_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COUNSELLOR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCounsellor = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNSELLOR_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/counsellors`, {}, config);

    dispatch({
      type: COUNSELLOR_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COUNSELLOR_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCounsellor = (counsellor) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNSELLOR_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/counsellors/${counsellor._id}`,
      counsellor,
      config,
    );

    dispatch({
      type: COUNSELLOR_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: COUNSELLOR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COUNSELLOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
