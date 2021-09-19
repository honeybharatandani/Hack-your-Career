import {
  SESSION_ADD_ITEM,
  SESSION_REMOVE_ITEM,
  SESSION_SAVE_SESSION_DETAILS,
} from "../constants/sessionConstants";

export const sessionReducer = (
  state = { sessionItems: [], sessionData: {} },
  action,
) => {
  switch (action.type) {
    case SESSION_ADD_ITEM:
      const item = action.payload;

      const existItem = state.sessionItems.find(
        (x) => x.counsellor === item.counsellor,
      );

      if (existItem) {
        return {
          ...state,
          sessionItems: state.sessionItems.map((x) =>
            x.counsellor === existItem.counsellor ? item : x,
          ),
        };
      } else {
        return {
          ...state,
          sessionItems: [...state.sessionItems, item],
        };
      }

    case SESSION_REMOVE_ITEM:
      return {
        ...state,
        sessionItems: state.sessionItems.filter(
          (x) => x.counsellor !== action.payload,
        ),
      };

    case SESSION_SAVE_SESSION_DETAILS:
      return {
        ...state,
        sessionDetails: action.payload,
      };

    default:
      return state;
  }
};
