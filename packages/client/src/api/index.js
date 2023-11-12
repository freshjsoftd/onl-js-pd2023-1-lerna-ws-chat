import axios from 'axios';
import {io} from 'socket.io-client';
// ==================================
import { createMessageSuccess, createMessageError } from '../actions/actionCreators';
import store from '../store';
import { SOCKET_EVENTS} from '../constant/constants';

const axiosOptions = {
  baseURL: 'http://localhost:5000/api'
}
const http = axios.create(axiosOptions);

export const getMessages = () => http.get('/messages')

const socket = io('ws://localhost:5000')

export const createMessage = (data) => {
  socket.emit(SOCKET_EVENTS.NEW_MESSAGE, data);
}

socket.on(SOCKET_EVENTS.NEW_MESSAGE, (newMessage) => {
  store.dispatch(createMessageSuccess(newMessage));
});

socket.on(SOCKET_EVENTS.MESSAGE_ERROR, (error) => {
  store.dispatch(createMessageError(error));
});
