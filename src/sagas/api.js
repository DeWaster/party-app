import { takeLatest, put, call } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from '../actions/api';

import config from '../config';

export function* watchLogins() {
  yield takeLatest('LOGIN/FETCH', postLogin);
}

export function* postLogin(action) {
  try {
    const response = yield call(fetch, `${config.apiUrl}/api/1/login`, {
      method: 'POST',
      body: JSON.stringify({
        password: action.payload,
      }),
    });
    if (response.status === 200) {
      const resBody = yield response.json();
      yield put(loginSuccess(resBody));
      window.location.reload();
    } else {
      yield put(loginFailed());
      return;
    }
  } catch (e) {
    yield put(loginFailed());
    return;
  }
}
