import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_LOADING,
    SET_MENU_ACTIVE_ITEM,
    SET_MENU_EXPANDED,
    TRY_LOGIN
} from "../constants/authConstant";

export const logout = () => ({
    type: LOGOUT,
});

export const trySignin = (username, password, navigate) => ({
    type: TRY_LOGIN,
    username, password, navigate
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user
});

export const loginFail = (error) => ({
    type: LOGIN_FAIL,
    error: JSON.stringify(error)
});


export const setLoading = value => ({
    type: SET_LOADING,
    value,
});

export const setMenuExpended = value => ({
    type: SET_MENU_EXPANDED,
    value,
});

export const setMenuActiveItem = value => ({
    type: SET_MENU_ACTIVE_ITEM,
    value,
});