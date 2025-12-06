import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TwsActionTypes } from './types';

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { wsConnect, wsDisconnect, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (wsConnect.match(action)) {
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError('WebSocket error'));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (parsedData.success) {
            const { success, ...restParsedData } = parsedData;
            dispatch(onMessage(restParsedData));
          } else {
            dispatch(onError(parsedData.message || 'WebSocket error from server'));
          }
        };

        socket.onclose = (event) => {
          dispatch(onClose());
        };

        if (wsSendMessage && wsSendMessage.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }
        
        if (wsDisconnect.match(action)) {
          socket.close();
          socket = null; 
        }
      }

      next(action);
    };
  };
};