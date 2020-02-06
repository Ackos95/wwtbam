import { call } from 'redux-saga/effects';


export function* appSaga() {
  yield call([console, console.log], 'Hello from saga!');
}
