import { put, takeEvery } from 'redux-saga/effects';
import { incrementCreator, ASYNC_INCREMENT, INCREMENT, decrementCreator, ASYNC_DECREMENT } from '../store/counterReducer';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* incrementWorker() {
    yield delay(200)
    yield put(incrementCreator())
}

export function* decrementWorker() {
    yield delay(200)
    yield put(decrementCreator())
}


export function* countWatcher() {
    yield takeEvery(ASYNC_INCREMENT, incrementWorker)
    yield takeEvery(ASYNC_DECREMENT, decrementWorker)
}