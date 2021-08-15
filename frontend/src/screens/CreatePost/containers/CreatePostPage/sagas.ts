import {
  fetchTagsRoutine,
  sendImageRoutine,
  sendPostRoutine,
  fetchUserProfileRoutine,
  fetchPostRoutine, sendPRRoutine,
  getPostVersionsRoutine, editPostRoutine, setLoaderRoutine
} from '../../routines/index';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import createPostService from '@screens/CreatePost/services/createPost';
import { Routine } from 'redux-saga-routines';

function* sendImage(action) {
  const formData = new FormData();
  formData.append('file', action.payload.file);
  try {
    const response = yield call(createPostService.sendImage, formData);
    yield put(sendImageRoutine.success(response));
    toastr.success('Success', 'Image was sent!');
  } catch (error) {
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sending image failed!');
  }
}

function* sendPost(action) {
  try {
    yield put(setLoaderRoutine.success({ isLoading: true, isLoaded: null }));
    const response = yield call(createPostService.sendPost, action.payload);
    yield put(sendPostRoutine.success(response));
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: true }));
    toastr.success('Success', 'Post was sent!');
  } catch (error) {
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: null }));
    yield put(sendImageRoutine.failure(error?.message));
    toastr.error('Error', 'Sending post failed!');
  }
}

function* watchSendImageRequest() {
  yield takeEvery(sendImageRoutine.TRIGGER, sendImage);
}

function* watchSendPostRequest() {
  yield takeEvery(sendPostRoutine.TRIGGER, sendPost);
}

function* fetchData(id) {
  try {
    const response = yield call(createPostService.getData, id.payload);
    yield put(fetchUserProfileRoutine.success(response));
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: null }));
  } catch (error) {
    yield put(fetchUserProfileRoutine.failure(error?.message));
  }
}

export function* getPostVersions() {
  try {
    const response = yield call(createPostService.getPostVersions);
    yield put(getPostVersionsRoutine.success(response));
  } catch (ex) {
    yield put(getPostVersionsRoutine.failure(ex.message));
  }
}

function* watchPostVersions() {
  yield takeEvery(getPostVersionsRoutine.TRIGGER, getPostVersions);
}

function* fetchTags() {
  try {
    const response = yield call(createPostService.getTags);
    const allTags = [];
    response.forEach(element => {
      const tag = { key: element.id, value: element.id, text: element.name };
      allTags.push(tag);
    });
    yield put(fetchTagsRoutine.success(allTags));
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: null }));
  } catch (error) {
    yield put(fetchTagsRoutine.failure(error?.message));
    toastr.error('Error', 'Loading tags failed!');
  }
}

function* watchGetDataRequest() {
  yield takeEvery(fetchUserProfileRoutine.TRIGGER, fetchData);
}

function* watchFetchTagsRequest() {
  yield takeEvery(fetchTagsRoutine.TRIGGER, fetchTags);
}

function* fetchPost({ payload }: Routine<any>) {
  try {
    yield put(setLoaderRoutine.success({ isLoading: true, isLoaded: null }));
    const response = yield call(createPostService.getPost, payload);
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: null }));

    yield put(fetchPostRoutine.success(response));
  } catch (error) {
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: null }));
    yield put(fetchPostRoutine.failure(error?.message));
    toastr.error('Error', 'Loading post failed');
  }
}

function* watchFetchPost() {
  yield takeEvery(fetchPostRoutine.TRIGGER, fetchPost);
}

function* sendPR({ payload }: Routine<any>) {
  try {
    yield put(setLoaderRoutine.success({ isLoading: true, isLoaded: null }));
    const response = yield call(createPostService.sendPR, payload);
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: true }));

    yield put(sendPRRoutine.success(response));
    toastr.success('Success', 'Pull request has been created');
  } catch (error) {
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: null }));
    yield put(sendPRRoutine.failure(error?.message));
    toastr.error('Error', 'Loading PR failed');
  }
}

function* watchSendPR() {
  yield takeEvery(sendPRRoutine.TRIGGER, sendPR);
}

function* editPost({ payload }: Routine<any>) {
  try {
    yield put(setLoaderRoutine.success({ isLoading: true, isLoaded: null }));
    const response = yield call(createPostService.editPost, payload);
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: true }));

    yield put(editPostRoutine.success(response));
    toastr.success('Success', 'Post has been edited');
  } catch (error) {
    yield put(setLoaderRoutine.success({ isLoading: false, isLoaded: null }));
    yield put(editPostRoutine.failure(error?.message));
    toastr.error('Error', 'Editing post failed');
  }
}

function* watchEditPost() {
  yield takeEvery(editPostRoutine.TRIGGER, editPost);
}

export default function* defaultPageSagas() {
  yield all([
    watchPostVersions(),
    watchSendImageRequest(),
    watchSendPostRequest(),
    watchGetDataRequest(),
    watchFetchTagsRequest(),
    watchFetchPost(),
    watchSendPR(),
    watchEditPost()
  ]);
}
