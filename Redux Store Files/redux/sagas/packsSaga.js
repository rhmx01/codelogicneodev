import {call, put, takeEvery} from "redux-saga/effects";
import {ADMIN_API_BASE_URL, deleteRequest, getRequest, postRequest} from "../../utils/api";
import {
  ADD_PACK_REQUEST,
  ADD_PACKS_MASSIVELY_REQUEST,
  DELETE_PACK_REQUEST,
  GET_PACKS_REQUEST
} from "../constants/packsConstant";
import {
  addPackFail,
  addPacksMassivelyFail,
  addPacksMassivelySuccess,
  addPackSuccess,
  deletePackFail,
  deletePackSuccess,
  getPacksFail,
  getPacksRequest,
  getPacksSuccess
} from "../actions/packsActions";
import {setAlerts} from "../actions/alertsActions";
import {ALERT_ERROR, ALERT_SUCCESS} from "../constants/alertsConstant";
import {setLoading} from "../actions/authActions";


export function* getPacksSaga(action) {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/packs/list?page=${action.page}&size=${action.size}&searchTerm=${action.search}`;
  try {
    const packs = yield call(getRequest, { url, token });
    yield put(getPacksSuccess(packs.data));
  } catch (error) {
    yield put(getPacksFail(error));
  }
}


export function* addPackSaga(action) {
  const token = sessionStorage.getItem('token');
  const uid = sessionStorage.getItem('uid');
  const url = `${ADMIN_API_BASE_URL}/packs`;
  yield put(setLoading(true));
  const data = action.pack;
  const to = action.to;
  try {
    yield call(postRequest, { url, token, data });
    yield put(addPackSuccess());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
    to('/admin/'+ uid +'/packs/list')
  } catch (error) {
    yield put(addPackFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(false));
  }
}

export function* addPacksMassivelySaga(action) {
  const token = sessionStorage.getItem('token');
  const uid = sessionStorage.getItem('uid');
  const url = `${ADMIN_API_BASE_URL}/packs/mass`;
  yield put(setLoading(true));
  const data = action.packs;
  const to = action.to;
  try {
    yield call(postRequest, { url, token, data });
    yield put(addPacksMassivelySuccess());
    yield put(getPacksRequest());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
    to('/admin/'+ uid +'/packs/list')
  } catch (error) {
    yield put(addPacksMassivelyFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(false));
  }
}


export function* deletePackSaga(action) {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/packs/delete/${action.mid}`;
  yield put(setLoading(true));
  try {
    yield call(deleteRequest, { url, token });
    yield put(deletePackSuccess());
    yield put(getPacksRequest());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
  } catch (error) {
    yield put(deletePackFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(false));
  }
}



function* packsSaga() {
  yield takeEvery(GET_PACKS_REQUEST, getPacksSaga)
  yield takeEvery(ADD_PACK_REQUEST, addPackSaga)
  yield takeEvery(ADD_PACKS_MASSIVELY_REQUEST, addPacksMassivelySaga)
  yield takeEvery(DELETE_PACK_REQUEST, deletePackSaga)
}

export default packsSaga;