import axios from "axios";
import {
  SESSION_ADD_ITEM,
  SESSION_REMOVE_ITEM,
  SESSION_SAVE_SESSION_DETAILS,
} from "../constants/sessionConstants";

export const addSession = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/counsellors/${id}`);

  dispatch({
    type: SESSION_ADD_ITEM,
    payload: {
      counsellor: data._id,
      name: data.name,
      image: data.image,
      working: data.working,
      workingHrs: data.workingHrs,
      availability: data.availability,
      googleMeet: data.googleMeet,
    },
  });

  localStorage.setItem(
    "sessionItems",
    JSON.stringify(getState().session.sessionItems),
  );
};

export const removeFromSession = (id) => (dispatch, getState) => {
  dispatch({
    type: SESSION_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "sessionItems",
    JSON.stringify(getState().session.sessionItems),
  );
};

export const saveSessionDetails = (data) => (dispatch) => {
  dispatch({
    type: SESSION_SAVE_SESSION_DETAILS,
    payload: data,
  });

  localStorage.setItem("sessionDetails", JSON.stringify(data));
};
