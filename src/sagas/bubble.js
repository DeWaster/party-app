import { put, takeEvery } from 'redux-saga/effects';

export function* watchErrors() {
  yield takeEvery('SHOW_ERROR', showError);
}

export function* watchInfos() {
  yield takeEvery('SHOW_INFO', showInfo);
}

export function* showError(action) {
  yield put({ type: 'CHANGE_BUBBLE_MESSAGE', payload: action.payload });
  yield put({ type: 'CHANGE_BUBBLE_TYPE', payload: 'error' });
  yield put({ type: 'SHOW_BUBBLE' });
}

export function* showInfo(action) {
  yield put({ type: 'CHANGE_BUBBLE_MESSAGE', payload: action.payload });
  yield put({ type: 'CHANGE_BUBBLE_TYPE', payload: 'info' });
  yield put({ type: 'SHOW_BUBBLE' });
}
