import { all } from 'redux-saga/effects';
import { watchErrors } from './error';

export default function* rootSaga() {
  yield all([watchErrors()]);
}
