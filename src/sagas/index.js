import { all } from 'redux-saga/effects';
import { watchErrors, watchInfos } from './bubble';
import { watchLogins } from './api';

export default function* rootSaga() {
  yield all([watchErrors(), watchInfos(), watchLogins()]);
}
