import {combineReducers} from 'redux'
import pointsReducer from "./reducers/pointsReducer";
import authReducer from "./reducers/authReducer";
import membersReducer from "./reducers/membersReducer";
import invoicesReducer from "./reducers/invoicesReducer";
import statisticsReducer from "./reducers/statisticsReducer";
import alertsReducer from "./reducers/alertsReducer";
import packsReducer from "./reducers/packsReducer";

export default combineReducers({
    points: pointsReducer,
    auth: authReducer,
    members: membersReducer,
    invoices: invoicesReducer,
    statistics: statisticsReducer,
    alerts: alertsReducer,
    packs: packsReducer
})