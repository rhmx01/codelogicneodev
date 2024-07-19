import {REMOVE_ALERT, SET_ALERTS} from "../constants/alertsConstant";

const initialState = {
  alerts: [],
}

function alertsReducer(state= initialState, action) {
  switch(action.type) {
    case SET_ALERTS:
      return {
        ...state,
        alerts: [{...action.alert, id: state.alerts.length}, ...state.alerts]
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(a => a.id !== Number(action.aid))
      };
    default: return state;
  }
}

export default alertsReducer;
