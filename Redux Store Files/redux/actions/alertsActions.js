import {REMOVE_ALERT, SET_ALERTS} from "../constants/alertsConstant";


export const setAlerts = (alert) => {
  return {
    type: SET_ALERTS,
    alert
  };
}
export const removeAlert = (aid) => {
  return {
    type: REMOVE_ALERT,
    aid
  };
}

