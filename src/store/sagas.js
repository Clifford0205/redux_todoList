import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionTypes.js';
import { initListAction } from './actionCreators';
function* getInitList() {
  try {
    const response = yield fetch('http://localhost:5555/students', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    // if (!response.ok) throw new Error(response.statusText);
    const jsonObject = yield response.json();
    const action = initListAction(jsonObject);
    console.log(action);
    yield put(action);
  } catch (e) {
    console.log(e);
  }
}
//generator 函數
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}

export default mySaga;
