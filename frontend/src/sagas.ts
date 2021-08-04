import { all } from 'redux-saga/effects';
/* PlopJS import placeholder. Do not remove */
import feedPageSagas from '@screens/FeedPage/sagas';
import loginSagas from '@screens/Login/sagas';
import defaultSagas from '@screens/Default/sagas';

import viewPostSagas from '@screens/ViewPost/sagas';

export default function* rootSaga() {
  yield all([
    loginSagas(),
    feedPageSagas(),
    viewPostSagas(),
    /* PlopJS sagas placeholder. Do not remove */
    defaultSagas()
  ]);
}
