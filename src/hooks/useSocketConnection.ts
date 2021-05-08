import {useEffect, useRef} from 'react';
import io, {Socket} from 'socket.io-client';
import {useAppSelector, useAppDispatch} from '../hooks';

export const useSocketConnection = (props: {
  onOpen?: (socket: Socket) => void;
  onClose?: () => void;
  listeners: {[key: string]: (args: any) => void};
}) => {
  const {listeners, onOpen, onClose} = props;
  const isActive = useAppSelector(store => store.socket.isActiveConnection);
  const dispatch = useAppDispatch();
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (isActive) {
      socketRef.current = io('http://localhost:5000');
      Object.keys(props.listeners).forEach(event =>
        socketRef.current?.on(event, listeners[event]),
      );
      if (onOpen) {
        onOpen(socketRef.current);
      }
    } else {
      if (!!socketRef.current) {
        socketRef.current.disconnect();
        if (onClose) {
          onClose();
        }
      }
    }
    return () => {
      socketRef.current?.disconnect();
      if (onClose) {
        onClose();
      }
    };
  }, [isActive, dispatch, props.listeners, onOpen, listeners, onClose]);
};
