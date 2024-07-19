import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT, SET_AUTHENTICATED_USER, SET_LOADING, SET_MENU_ACTIVE_ITEM, SET_MENU_EXPANDED,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    TRY_LOGIN,
    TRY_SIGNUP, UPDATE_CURRENT_ROLE,
} from "../constants/authConstant";

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    menuExpended: true,
    menuActiveItem: 'dashboard',
    message: '',
    currentRole: 'MEMBER',
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED_USER:
            return {
                ...state,
                user: action.user,
                message: 'Operation succeeded',
                isLogged: true,
            };
        case UPDATE_CURRENT_ROLE:
            return {
                ...state,
                currentRole: action.role,
            };
        case TRY_LOGIN || TRY_SIGNUP:
            return {
                ...state,
            };
        case LOGIN_FAIL || SIGNUP_FAIL:
            return {
                ...state,
                isLogged: false,
                message: 'Operation failed',
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user.data,
                message: 'Operation succeeded',
                isLogged: true,
                isAuthenticated: true,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                message: 'Operation succeeded',
            };
        case LOGOUT: {
            sessionStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.value,
            };
        }
        case SET_MENU_EXPANDED: {
            return {
                ...state,
                menuExpended: action.value,
            };
        }
        case SET_MENU_ACTIVE_ITEM: {
            return {
                ...state,
                menuActiveItem: action.value,
            };
        }
        default:
            return state;
    }
}

export default authReducer;
