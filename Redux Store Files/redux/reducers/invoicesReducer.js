import {GET_ACTIVITIES_SUCCESS, GET_INVOICES_SUCCESS, SET_INVOICE, SET_INVOICES} from "../constants/invoicesConstant";

const initialState = {
  invoicesList: [],
  activitiesList: [],
  tmpInvoices: [],
  invoice: {},
  message: '',
}

function invoicesReducer(state= initialState, action) {
  switch(action.type) {
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoicesList: action.invoices
      };
    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        activitiesList: action.activities
      };
    case SET_INVOICE:
      return {
        ...state,
        invoice: action.invoice
      };
    case SET_INVOICES:
      return {
        ...state,
        tmpInvoices: action.invoices
      };
    default: return state;
  }
}

export default invoicesReducer;
