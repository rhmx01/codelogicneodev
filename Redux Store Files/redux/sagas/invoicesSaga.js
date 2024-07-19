import {call, put, takeEvery} from "redux-saga/effects";
import {ADMIN_API_BASE_URL, deleteRequest, getRequest, postRequest} from "../../utils/api";
import {
  ADD_INVOICE_REQUEST,
  ADD_INVOICES_MASSIVELY_REQUEST,
  DELETE_INVOICE_REQUEST, GET_ACTIVITIES_REQUEST,
  GET_INVOICES_REQUEST
} from "../constants/invoicesConstant";
import {
  addInvoiceFail,
  addInvoicesMassivelyFail,
  addInvoicesMassivelySuccess,
  addInvoiceSuccess,
  deleteInvoiceFail,
  deleteInvoiceSuccess, getActivitiesFail, getActivitiesSuccess,
  getInvoicesFail,
  getInvoicesRequest,
  getInvoicesSuccess
} from "../actions/invoicesActions";
import {setAlerts} from "../actions/alertsActions";
import {ALERT_ERROR, ALERT_SUCCESS} from "../constants/alertsConstant";
import {setLoading} from "../actions/authActions";


export function* getInvoicesSaga(action) {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/invoices/list?type=${action.ptype}&page=${action.page}&size=${action.size}&searchTerm=${action.search}`;
  try {
    const invoices = yield call(getRequest, { url, token });
    yield put(getInvoicesSuccess(invoices.data));
  } catch (error) {
    yield put(getInvoicesFail(error));
  }
}


export function* addInvoiceSaga(action) {
  const token = sessionStorage.getItem('token');
  const uid = sessionStorage.getItem('uid');
  yield put(setLoading(true));
  const url = `${ADMIN_API_BASE_URL}/invoices`;
  const data = action.invoice;
  const to = action.to;
  try {
    yield call(postRequest, { url, token, data });
    yield put(addInvoiceSuccess());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
    to('/admin/'+ uid +'/invoices/list')
  } catch (error) {
    yield put(addInvoiceFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(true));
  }
}

export function* addInvoicesMassivelySaga(action) {
  const token = sessionStorage.getItem('token');
  const uid = sessionStorage.getItem('uid');
  yield put(setLoading(true));
  const url = `${ADMIN_API_BASE_URL}/invoices/mass`;
  const data = action.invoices;
  const to = action.to;
  try {
    yield call(postRequest, { url, token, data });
    yield put(addInvoicesMassivelySuccess());
    yield put(getInvoicesRequest());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
    to('/admin/'+ uid +'/points/list');
  } catch (error) {
    yield put(addInvoicesMassivelyFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(false));
  }
}


export function* deleteInvoiceSaga(action) {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/invoices/delete/${action.mid}`;
  yield put(setLoading(true));
  try {
    yield call(deleteRequest, { url, token });
    yield put(deleteInvoiceSuccess());
    yield put(getInvoicesRequest());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
  } catch (error) {
    yield put(deleteInvoiceFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(false));
  }
}

export function* getActivitiesSaga(action) {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/invoices/member/activities/list`;
  try {
    const invoices = yield call(getRequest, { url, token });
    yield put(getActivitiesSuccess(invoices.data));
  } catch (error) {
    yield put(getActivitiesFail(error));
  }
}

function* invoicesSaga() {
  yield takeEvery(GET_INVOICES_REQUEST, getInvoicesSaga)
  yield takeEvery(ADD_INVOICE_REQUEST, addInvoiceSaga)
  yield takeEvery(ADD_INVOICES_MASSIVELY_REQUEST, addInvoicesMassivelySaga)
  yield takeEvery(DELETE_INVOICE_REQUEST, deleteInvoiceSaga)
  yield takeEvery(GET_ACTIVITIES_REQUEST, getActivitiesSaga)
}

export default invoicesSaga;