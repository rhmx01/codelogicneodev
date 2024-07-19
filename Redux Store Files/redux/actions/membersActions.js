import {
    ADD_MEMBER_FAIL,
    ADD_MEMBER_REQUEST,
    ADD_MEMBER_SUCCESS,
    ADD_MEMBERS_MASSIVELY_FAIL,
    ADD_MEMBERS_MASSIVELY_REQUEST,
    ADD_MEMBERS_MASSIVELY_SUCCESS,
    DELETE_MEMBER_FAIL,
    DELETE_MEMBER_REQUEST,
    DELETE_MEMBER_SUCCESS,
    GET_MEMBERS_FAIL,
    GET_MEMBERS_REQUEST,
    GET_MEMBERS_SUCCESS,
    SET_MEMBER
} from "../constants/membersConstant";

export const setMember = (member) => {
    return {
        type: SET_MEMBER,
        member
    };
}

export const getMembersRequest = (page = 0, size = 20, search = '') => {
    return {
        type: GET_MEMBERS_REQUEST,
        page, size, search
    };
}
export const getMembersSuccess = (members) => {
    return {
        type: GET_MEMBERS_SUCCESS,
        members
    };
}
export const getMembersFail = (error) => {
    return {
        type: GET_MEMBERS_FAIL,
        error
    };
}

export const addMembersMassivelyRequest = (members, to) => {
    return {
        type: ADD_MEMBERS_MASSIVELY_REQUEST,
        members, to
    };
}
export const addMembersMassivelySuccess = (members) => {
    return {
        type: ADD_MEMBERS_MASSIVELY_SUCCESS,
        members
    };
}
export const addMembersMassivelyFail = (error) => {
    return {
        type: ADD_MEMBERS_MASSIVELY_FAIL,
        error
    };
}

export const addMemberRequest = (member, to) => {
    return {
        type: ADD_MEMBER_REQUEST,
        member, to
    };
}
export const addMemberSuccess = () => {
    return {
        type: ADD_MEMBER_SUCCESS,
    };
}
export const addMemberFail = (error) => {
    return {
        type: ADD_MEMBER_FAIL,
        error
    };
}

export const deleteMemberRequest = (mid) => {
    return {
        type: DELETE_MEMBER_REQUEST,
        mid
    };
}
export const deleteMemberSuccess = () => {
    return {
        type: DELETE_MEMBER_SUCCESS
    };
}
export const deleteMemberFail = (error) => {
    return {
        type: DELETE_MEMBER_FAIL,
        error
    };
}

