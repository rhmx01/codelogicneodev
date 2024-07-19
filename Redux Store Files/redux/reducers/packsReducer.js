import {GET_PACKS_SUCCESS, SET_PACK} from "../constants/packsConstant";

const initialState = {
  packsList: [],
  pack: {},
  message: '',
}

function packsReducer(state= initialState, action) {
  switch(action.type) {
    case GET_PACKS_SUCCESS:
      return {
        ...state,
        packsList: action.packs
      };
    case SET_PACK:
      return {
        ...state,
        pack: action.pack
      };
    default: return state;
  }
}

export default packsReducer;
