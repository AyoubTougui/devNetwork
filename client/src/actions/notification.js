import axios from "axios";
import { GET_NOTIFICATIONS, DELETE_NOTIFICATION, NEW_NOTIFICATION, NOTIFICATION_ERROR } from "./types";

// get notifications of current user
export const getNotifications = () => async (dispatch) => {
  try {
    const res = await axios.get("api/notifications");
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
