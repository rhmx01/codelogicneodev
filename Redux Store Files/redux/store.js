import {configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import authSaga from './sagas/authSaga';
import membersSaga from "./sagas/membersSaga";
import invoicesSaga from "./sagas/invoicesSaga";
import statisticsSaga from "./sagas/statisticsSaga";
import packsSaga from "./sagas/packsSaga";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Specify the reducers to persist
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

// const store  = configureStore({
//     reducer:rootReducer,
//     middleware:()=>[sagaMiddleware]
// });

const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [sagaMiddleware]
});

const persistor = persistStore(store);


sagaMiddleware.run(authSaga);
sagaMiddleware.run(membersSaga);
sagaMiddleware.run(invoicesSaga);
sagaMiddleware.run(packsSaga);
sagaMiddleware.run(statisticsSaga);

export { store, persistor };
