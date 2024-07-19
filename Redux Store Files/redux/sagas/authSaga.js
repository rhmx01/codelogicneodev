import {call, put, takeEvery} from "redux-saga/effects";
import {loginFail, loginSuccess, setLoading} from '../actions/authActions';
import {toast} from 'react-toastify';
import {apiSignin} from "../../utils/api";
import {TRY_LOGIN} from "../constants/authConstant";
import {setAlerts} from "../actions/alertsActions";
import {ALERT_ERROR} from "../constants/alertsConstant";


function* signin(action) {
  const navigate = action.navigate;
  yield put(setLoading(true));
  try {
    const user = yield call(apiSignin, action.username, action.password);
    sessionStorage.setItem('token', user.data.access_token);
    sessionStorage.setItem('uid', user.data.user.id);
    yield put(loginSuccess(user));
    navigate('/admin/'+ user.data.user.id +'/dashboard')
    yield put(setLoading(false));
    // yield put(updateCurrentRole("STUDENT"));
  } catch (error) {
    yield put(loginFail(error.message));
    yield put(setLoading(false));
    yield put(setAlerts(ALERT_ERROR));
  }
}


//  function* ResetPasswordSaga(action) {
//   const url = `${API_BASE_URL}/auth/password/reset`;
//   const data = action.email
//   yield put(setLoading(true));
//   try {
//     const resp = yield call(postRequest, { url, data });
//     yield put(resetPasswordSuccess(resp.data));
//     yield put(updateUser({resetstatus: resp.data}));
//     yield put(setLoading(false));
//     if (!resp.data) toast.error("L'email n'existe pas");
//   } catch (error) {
//     yield put(resetPasswordFail(error));
//     yield put(setLoading(false));
//   }
// }
//
//
//  function* getUserByToken(action) {
//   const url = `${API_BASE_URL}/auth/user/rtoken/${action.rtoken}`;
//   yield put(setLoading(true));
//   try {
//     const resp = yield call(getRequest, {url});
//     yield put(getUserByTokenSuccess(resp.data));
//     yield put(updateUser({id: resp.data}));
//     yield put(setLoading(false));
//   } catch (error) {
//     yield put(getUserByTokenFail(error));
//     yield put(setLoading(false));
//   }
// }
//
//  function* ResetUserPasswordSaga(action) {
//   const url = `${API_BASE_URL}/auth/password/user/reset`;
//   const data = action.user;
//   const history = action.history;
//   yield put(setLoading(true));
//   try {
//     const resp = yield call(postRequest, { url, data });
//     yield put(resetPasswordSuccess(resp.data));
//     yield put(setLoading(false));
//     history.push("/")
//     toast.success("Opération réussie");
//   } catch (error) {
//     toast.error("Erreur durant l'operation.");
//     yield put(resetPasswordFail(error));
//     yield put(setLoading(false));
//   }
// }

function* authSaga() {
  yield takeEvery(TRY_LOGIN, signin)
}

export default authSaga;