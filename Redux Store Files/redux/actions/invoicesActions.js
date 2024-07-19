import {
    ADD_INVOICE_FAIL,
    ADD_INVOICE_REQUEST,
    ADD_INVOICE_SUCCESS,
    ADD_INVOICES_MASSIVELY_FAIL,
    ADD_INVOICES_MASSIVELY_REQUEST,
    ADD_INVOICES_MASSIVELY_SUCCESS,
    DELETE_INVOICE_FAIL,
    DELETE_INVOICE_REQUEST,
    DELETE_INVOICE_SUCCESS, GET_ACTIVITIES_FAIL, GET_ACTIVITIES_REQUEST, GET_ACTIVITIES_SUCCESS,
    GET_INVOICES_FAIL,
    GET_INVOICES_REQUEST,
    GET_INVOICES_SUCCESS,
    SET_INVOICE, SET_INVOICES
} from "../constants/invoicesConstant";

export const setInvoice = (invoice) => {
    return {
        type: SET_INVOICE,
        invoice
    };
}
export const setInvoices = (invoices) => {
    return {
        type: SET_INVOICES,
        invoices
    };
}

export const getInvoicesRequest = (ptype, page = 0, size = 20, search = '') => {
    return {
        type: GET_INVOICES_REQUEST,
        ptype, page, size, search
    };
}
export const getInvoicesSuccess = (invoices) => {
    return {
        type: GET_INVOICES_SUCCESS,
        invoices
    };
}
export const getInvoicesFail = (error) => {
    return {
        type: GET_INVOICES_FAIL,
        error
    };
}

export const addInvoicesMassivelyRequest = (invoices, to) => {
    return {
        type: ADD_INVOICES_MASSIVELY_REQUEST,
        invoices, to
    };
}
export const addInvoicesMassivelySuccess = (invoices) => {
    return {
        type: ADD_INVOICES_MASSIVELY_SUCCESS,
        invoices
    };
}
export const addInvoicesMassivelyFail = (error) => {
    return {
        type: ADD_INVOICES_MASSIVELY_FAIL,
        error
    };
}

export const addInvoiceRequest = (invoice, to) => {
    return {
        type: ADD_INVOICE_REQUEST,
        invoice, to
    };
}
export const addInvoiceSuccess = () => {
    return {
        type: ADD_INVOICE_SUCCESS,
    };
}
export const addInvoiceFail = (error) => {
    return {
        type: ADD_INVOICE_FAIL,
        error
    };
}

export const deleteInvoiceRequest = (mid) => {
    return {
        type: DELETE_INVOICE_REQUEST,
        mid
    };
}
export const deleteInvoiceSuccess = () => {
    return {
        type: DELETE_INVOICE_SUCCESS
    };
}
export const deleteInvoiceFail = (error) => {
    return {
        type: DELETE_INVOICE_FAIL,
        error
    };
}

export const getActivitiesRequest = () => {
    return {
        type: GET_ACTIVITIES_REQUEST
    };
}
export const getActivitiesSuccess = (activities) => {
    return {
        type: GET_ACTIVITIES_SUCCESS,
        activities
    };
}
export const getActivitiesFail = (error) => {
    return {
        type: GET_ACTIVITIES_FAIL,
        error
    };
}



