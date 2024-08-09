import { put } from 'redux-saga/effects';
import {
	createMessageError,
	createMessageRequest,
	// createMessageSuccess,
	getMessagesError,
	getMessagesRequest,
	getMessagesSuccess,
} from '../actions/actionCreators';

import * as API from './../api';

export function* getMessagesSaga() {
	yield put(getMessagesRequest());
	try {
		const { data } = yield API.getMessages();
		yield put(getMessagesSuccess(data));
	} catch (error) {
		yield put(getMessagesError(error));
	}
}
export function* createMessageSaga({ payload }) {
	yield put(createMessageRequest());
	try {
		// yield put(createMessageSuccess(payload));
		yield API.createMessage(payload);
	} catch (error) {
		yield put(createMessageError(error));
	}
}
