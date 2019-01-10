import { put, takeEvery } from 'redux-saga/effects';

export function* watchErrors() {
  yield takeEvery('SHOW_ERROR', showError);
}

export function* showError(action) {
  yield put({ type: 'CHANGE_ERROR_MESSAGE', payload: action.payload });
  yield put({ type: 'SHOW_ERROR_SNACK' });
}
