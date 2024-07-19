import {GET_DASHBOARD_STATISTICS_SUCCESS, GET_STATISTICS_SUCCESS} from "../constants/statisticsConstant";

const initialState = {
  statistics: {},
  dashboardStatistics: {},
}

function statisticsReducer(state= initialState, action) {
  switch(action.type) {
    case GET_STATISTICS_SUCCESS:
      return {
        ...state,
        statistics: action.statistics
      };
    case GET_DASHBOARD_STATISTICS_SUCCESS:
      return {
        ...state,
        dashboardStatistics: action.dashboardStatistics
      };
    default: return state;
  }
}

export default statisticsReducer;
