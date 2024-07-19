import {
    ADD_PACK_FAIL,
    ADD_PACK_REQUEST,
    ADD_PACK_SUCCESS,
    ADD_PACKS_MASSIVELY_FAIL,
    ADD_PACKS_MASSIVELY_REQUEST,
    ADD_PACKS_MASSIVELY_SUCCESS,
    DELETE_PACK_FAIL,
    DELETE_PACK_REQUEST,
    DELETE_PACK_SUCCESS,
    GET_PACKS_FAIL,
    GET_PACKS_REQUEST,
    GET_PACKS_SUCCESS,
    SET_PACK
} from "../constants/packsConstant";

export const setPack = (pack) => {
    return {
        type: SET_PACK,
        pack
    };
}

export const getPacksRequest = (page = 0, size = 20, search = '') => {
    return {
        type: GET_PACKS_REQUEST,
        page, size, search
    };
}
export const getPacksSuccess = (packs) => {
    return {
        type: GET_PACKS_SUCCESS,
        packs
    };
}
export const getPacksFail = (error) => {
    return {
        type: GET_PACKS_FAIL,
        error
    };
}

export const addPacksMassivelyRequest = (packs, to) => {
    return {
        type: ADD_PACKS_MASSIVELY_REQUEST,
        packs, to
    };
}
export const addPacksMassivelySuccess = (packs) => {
    return {
        type: ADD_PACKS_MASSIVELY_SUCCESS,
        packs
    };
}
export const addPacksMassivelyFail = (error) => {
    return {
        type: ADD_PACKS_MASSIVELY_FAIL,
        error
    };
}

export const addPackRequest = (pack, to) => {
    return {
        type: ADD_PACK_REQUEST,
        pack, to
    };
}
export const addPackSuccess = () => {
    return {
        type: ADD_PACK_SUCCESS,
    };
}
export const addPackFail = (error) => {
    return {
        type: ADD_PACK_FAIL,
        error
    };
}

export const deletePackRequest = (mid) => {
    return {
        type: DELETE_PACK_REQUEST,
        mid
    };
}
export const deletePackSuccess = () => {
    return {
        type: DELETE_PACK_SUCCESS
    };
}
export const deletePackFail = (error) => {
    return {
        type: DELETE_PACK_FAIL,
        error
    };
}

