import { all } from 'redux-saga/effects';
import { watchErrors, watchInfos } from './bubble';

export default function* rootSaga() {
  yield all([watchErrors(), watchInfos()]);
}
