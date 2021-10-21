import { GET_NOTIFICATIONS, DELETE_NOTIFICATION, NEW_NOTIFICATION, NOTIFICATION_ERROR } from "../actions/types";

const initialState = {
  New_notification: null,
  notifications: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
        loading: false,
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
