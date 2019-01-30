import { select, takeLatest, put, call } from 'redux-saga/effects';
import { loginFailed, loginSuccess } from '../actions/auth';
import {
  fetchPhotosSuccess,
  fetchPhotosFailed,
  fetchPhotoSuccess,
  fetchPhotoFailed,
} from '../actions/gallery';

import config from '../config';

export function* watchLogins() {
  yield takeLatest('LOGIN/FETCH', postLogin);
}

export function* watchGallery() {
  yield takeLatest('GALLERY/FETCH_PHOTOS', fetchPhotos);
  yield takeLatest('GALLERY/FETCH_PHOTO', fetchPhoto);
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

export function* fetchPhotos(action) {
  const state = yield select();
  try {
    const response = yield call(fetch, `${config.apiUrl}/api/1/images`, {
      method: 'GET',
      headers: {
        Authorization: state.auth.apiKey,
      },
    });
    if (response.status === 200) {
      const resBody = yield response.json();
      yield put(fetchPhotosSuccess(resBody));
    } else {
      yield put(fetchPhotosFailed());
      return;
    }
  } catch (e) {
    yield put(fetchPhotosFailed());
    return;
  }
}

export function* fetchPhoto(action) {
  const state = yield select();
  try {
    const response = yield call(
      fetch,
      `${config.apiUrl}/api/1/images/${action.payload}`,
      {
        method: 'GET',
        headers: {
          Authorization: state.auth.apiKey,
        },
      }
    );
    if (response.status === 200) {
      const resBody = yield response.json();
      yield put(fetchPhotoSuccess(resBody));
    } else {
      yield put(fetchPhotoFailed());
      return;
    }
  } catch (e) {
    yield put(fetchPhotoFailed());
    return;
  }
}
