import { all, call, put, takeEvery } from 'redux-saga/effects';
import viewPageService from '@screens/ViewPost/services/viewPage';
import { toastr } from 'react-redux-toastr';
import {
  fetchDataRoutine, fetchHighlightsRoutine,
  leaveReactionOnPostViewPageRoutine,
  saveHighlightRoutine
} from '@screens/ViewPost/routines';
import feedPageService from '@screens/FeedPage/services/feedPage';

function* fetchData(action) {
  try {
    const response = yield call(viewPageService.getData, action.payload);
    yield put(fetchDataRoutine.success(response));
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* fetchHighlights(action) {
  try {
    const response = yield call(viewPageService.getHighlights, action.payload);
    yield put(fetchHighlightsRoutine.success(response));
  } catch (error) {
    yield put(fetchDataRoutine.failure(error?.message));
    toastr.error('Error', 'Loading data failed');
  }
}

function* saveHighlight(action) {
  try {
    const response = yield call(viewPageService.saveHighlight, action.payload);
    yield put(saveHighlightRoutine.success(response));
    toastr.success('Success', 'Highlight saved');
  } catch (error) {
    yield put(saveHighlightRoutine.failure(error?.message));
    toastr.error('Error', 'Saving highlight failed');
  }
}

function* leaveReaction(action) {
  try {
    const response = yield call(feedPageService.likePost, action.payload);
    const postReaction = {
      response,
      difference: response?.id ? 1 : -1,
      reactionStatus: action.payload.liked
    };
    yield put(leaveReactionOnPostViewPageRoutine.success(postReaction));
  } catch (error) {
    yield put(leaveReactionOnPostViewPageRoutine.failure(error?.message));
    toastr.error('Error', 'Leave reaction on post failed');
  }
}

function* watchDataRequest() {
  yield takeEvery(fetchDataRoutine.TRIGGER, fetchData);
}

function* watchSaveHighlight() {
  yield takeEvery(saveHighlightRoutine.TRIGGER, saveHighlight);
}

function* watchFetchHighlights() {
  yield takeEvery(fetchHighlightsRoutine.TRIGGER, fetchHighlights);
}

function* watchLeaveReactionOnPost() {
  yield takeEvery(leaveReactionOnPostViewPageRoutine.TRIGGER, leaveReaction);
}
export default function* viewPostPageSagas() {
  yield all([
    watchDataRequest(),
    watchLeaveReactionOnPost(),
    watchSaveHighlight(),
    watchFetchHighlights()
  ]);
}

