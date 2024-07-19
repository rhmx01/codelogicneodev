import {SET_POINTS} from "../constants/pointsConstant";

const initialState = {
  tmpPoints: [],
  pointsList: [],
  message: '',
}

function pointsReducer(state= initialState, action) {
  switch(action.type) {
    case SET_POINTS:
      return {
        ...state,
        tmpPoints: action.points
      };
    default: return state;
  }
}

export default pointsReducer;
