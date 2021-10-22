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

// delete notifications

export const deleteNotification = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/notifications/${id}`);
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
