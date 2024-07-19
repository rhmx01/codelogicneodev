import {
  GET_DASHBOARD_STATISTICS_FAIL,
  GET_DASHBOARD_STATISTICS_REQUEST, GET_DASHBOARD_STATISTICS_SUCCESS,
  GET_STATISTICS_FAIL,
  GET_STATISTICS_REQUEST,
  GET_STATISTICS_SUCCESS
} from "../constants/statisticsConstant";


export const getStatisticsRequest = () => {
  return {
    type: GET_STATISTICS_REQUEST,
  };
}
export const getStatisticsSuccess = (statistics) => {
  return {
    type: GET_STATISTICS_SUCCESS,
    statistics
  };
}
export const getStatisticsFail = (error) => {
  return {
    type: GET_STATISTICS_FAIL,
    error
  };
}



export const getDashboardStatisticsRequest = () => {
  return {
    type: GET_DASHBOARD_STATISTICS_REQUEST,
  };
}
export const getDashboardStatisticsSuccess = (dashboardStatistics) => {
  return {
    type: GET_DASHBOARD_STATISTICS_SUCCESS,
    dashboardStatistics
  };
}
export const getDashboardStatisticsFail = (error) => {
  return {
    type: GET_DASHBOARD_STATISTICS_FAIL,
    error
  };
}

