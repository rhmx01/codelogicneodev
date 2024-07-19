import {GET_MEMBERS_SUCCESS, SET_MEMBER} from "../constants/membersConstant";

const initialState = {
  membersList: [],
  member: {},
  message: '',
}

function membersReducer(state= initialState, action) {
  switch(action.type) {
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        membersList: action.members
      };
    case SET_MEMBER:
      return {
        ...state,
        member: action.member
      };
    default: return state;
  }
}

export default membersReducer;
