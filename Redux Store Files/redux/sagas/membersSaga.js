import {call, put, takeEvery} from "redux-saga/effects";
import {ADMIN_API_BASE_URL, deleteRequest, getRequest, postRequest} from "../../utils/api";
import {
  ADD_MEMBER_REQUEST,
  ADD_MEMBERS_MASSIVELY_REQUEST,
  DELETE_MEMBER_REQUEST,
  GET_MEMBERS_REQUEST
} from "../constants/membersConstant";
import {
  addMemberFail,
  addMembersMassivelyFail,
  addMembersMassivelySuccess,
  addMemberSuccess,
  deleteMemberFail,
  deleteMemberSuccess,
  getMembersFail,
  getMembersRequest,
  getMembersSuccess
} from "../actions/membersActions";
import {setAlerts} from "../actions/alertsActions";
import {ALERT_ERROR, ALERT_SUCCESS} from "../constants/alertsConstant";
import {setLoading} from "../actions/authActions";


export function* getMembersSaga(action) {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/members/list?page=${action.page}&size=${action.size}&searchTerm=${action.search}`;
  try {
    const members = yield call(getRequest, { url, token });
    yield put(getMembersSuccess(members.data));
  } catch (error) {
    yield put(getMembersFail(error));
  }
}


export function* addMemberSaga(action) {
  const token = sessionStorage.getItem('token');
  const uid = sessionStorage.getItem('uid');
  const url = `${ADMIN_API_BASE_URL}/members`;
  yield put(setLoading(true));
  const data = action.member;
  const to = action.to;
  try {
    yield call(postRequest, { url, token, data });
    yield put(addMemberSuccess());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
    to('/admin/'+ uid +'/members/list')
  } catch (error) {
    yield put(addMemberFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(false));
  }
}

export function* addMembersMassivelySaga(action) {
  const token = sessionStorage.getItem('token');
  const uid = sessionStorage.getItem('uid');
  const url = `${ADMIN_API_BASE_URL}/members/mass`;
  yield put(setLoading(true));
  const data = action.members;
  const to = action.to;
  try {
    yield call(postRequest, { url, token, data });
    yield put(addMembersMassivelySuccess());
    yield put(getMembersRequest());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
    to('/admin/'+ uid +'/members/list')
  } catch (error) {
    yield put(addMembersMassivelyFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(false));
  }
}


export function* deleteMemberSaga(action) {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/members/delete/${action.mid}`;
  yield put(setLoading(true));
  try {
    yield call(deleteRequest, { url, token });
    yield put(deleteMemberSuccess());
    yield put(getMembersRequest());
    yield put(setAlerts(ALERT_SUCCESS));
    yield put(setLoading(false));
  } catch (error) {
    yield put(deleteMemberFail(error));
    yield put(setAlerts(ALERT_ERROR));
    yield put(setLoading(false));
  }
}



function* membersSaga() {
  yield takeEvery(GET_MEMBERS_REQUEST, getMembersSaga)
  yield takeEvery(ADD_MEMBER_REQUEST, addMemberSaga)
  yield takeEvery(ADD_MEMBERS_MASSIVELY_REQUEST, addMembersMassivelySaga)
  yield takeEvery(DELETE_MEMBER_REQUEST, deleteMemberSaga)
}

export default membersSaga;