import { put, takeLatest, all } from 'redux-saga/effects';
//import config from '../config';

function* actionWatcher() {
  //yield takeLatest('FETCH_WEATHER', fetchWeather);
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
