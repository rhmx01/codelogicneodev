import {ADD_POINTS_FAIL, ADD_POINTS_REQUEST, ADD_POINTS_SUCCESS, SET_POINTS} from "../constants/pointsConstant";

export const setPoints = (points) => {
  return {
    type: SET_POINTS,
    points
  };
}

export const addPoints = (points) => {
  return {
    type: ADD_POINTS_REQUEST,
    points
  };
}
export const addPointsSuccess = (points) => {
  return {
    type: ADD_POINTS_SUCCESS,
    points
  };
}
export const addPointsFail = (error) => {
  return {
    type: ADD_POINTS_FAIL,
    error
  };
}

