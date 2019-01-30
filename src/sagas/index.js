import { all } from 'redux-saga/effects';
import { watchErrors, watchInfos } from './bubble';
import { watchLogins, watchGallery } from './api';

export default function* rootSaga() {
  yield all([watchErrors(), watchInfos(), watchLogins(), watchGallery()]);
}
