import { createStore, combineReducers, applyMiddleware } from "redux";
import { cashReducer } from "./cashReducer";
import { customerReducer } from "./customerReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { countReducer } from "./counterReducer";
import createSagaMiddleware from "@redux-saga/core";
import { countWatcher } from "../saga/countSaga";
import { rootWatcher } from "../saga";
import { userReducer } from "./userReducer";

const sagaMiddleware = createSagaMiddleware()


const rootReducer = combineReducers({
    cash: cashReducer,
    count: countReducer,
    customers: customerReducer,
    users: userReducer,
})

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher)