import {call, put, takeEvery} from "redux-saga/effects";
import {ADMIN_API_BASE_URL, getRequest} from "../../utils/api";
import {
  getDashboardStatisticsFail,
  getDashboardStatisticsSuccess,
  getStatisticsFail,
  getStatisticsSuccess
} from "../actions/statisticsActions";
import {GET_DASHBOARD_STATISTICS_REQUEST, GET_STATISTICS_REQUEST} from "../constants/statisticsConstant";


export function* getStatisticsSaga() {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/data/statistics`;
  try {
    const statistics = yield call(getRequest, { url, token });
    yield put(getStatisticsSuccess(statistics.data));
  } catch (error) {
    yield put(getStatisticsFail(error));
  }
}
export function* getDashboardStatisticsSaga() {
  const token = sessionStorage.getItem('token');
  const url = `${ADMIN_API_BASE_URL}/data/dashboard/statistics`;
  try {
    const statistics = yield call(getRequest, { url, token });
    yield put(getDashboardStatisticsSuccess(statistics.data));
  } catch (error) {
    yield put(getDashboardStatisticsFail(error));
  }
}


function* statisticsSaga() {
  yield takeEvery(GET_STATISTICS_REQUEST, getStatisticsSaga)
  yield takeEvery(GET_DASHBOARD_STATISTICS_REQUEST, getDashboardStatisticsSaga)
}

export default statisticsSaga;