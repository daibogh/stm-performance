import {
  useEffect,
  useRef,
  createContext,
  useState,
  useCallback,
  useMemo,
  FC,
} from 'react';
import io, {Socket} from 'socket.io-client';
type SocketConnectionOptions = {
  isActive: boolean;
  startSocket: () => void;
  stopSocket: () => void;
  subscribeGates: (callbacks: {onOpen: any; onClose: any}) => void;
  subscribe: (eventName: string, callback: any) => any;
};
export const useSocketConnection = (
  props: [boolean, (val: boolean) => void],
) => {
  const [isActive, setOpened] = props;
  const stopSocket = useCallback(() => setOpened(false), [setOpened]);
  const startSocket = useCallback(() => setOpened(true), [setOpened]);
  const socketRef = useRef<Socket | null>(null);
  const subscribersRef = useRef<{[key: string]: any}>({});
  const gatewaySubscribersRef = useRef<{onOpen?: any; onClose?: any}>({});
  const {onOpen, onClose} = gatewaySubscribersRef.current;
  useEffect(() => {
    if (isActive) {
      socketRef.current = io('http://localhost:5000');
      Object.keys(subscribersRef.current).forEach(event =>
        socketRef.current?.on(event, subscribersRef.current[event]),
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
    };
  }, [isActive, onOpen, onClose]);
  return useMemo(
    () => ({
      isActive,
      startSocket,
      stopSocket,
      subscribeGates: (callbacks: {onOpen: any; onClose: any}) => {
        gatewaySubscribersRef.current = callbacks;
      },
      subscribe: (eventName: string, callback: any) =>
        (subscribersRef.current[eventName] = callback),
    }),
    [isActive, startSocket, stopSocket],
  );
};
export const ConnectionCtx = createContext<SocketConnectionOptions>({
  isActive: false,
  startSocket: () => {},
  stopSocket: () => {},
  subscribe: () => {},
  subscribeGates: () => {},
});
export const ConnectionProvider: FC = ({children}) => {
  const stateParams = useState(false);
  const contextParams = useSocketConnection(stateParams);
  return (
    <ConnectionCtx.Provider value={contextParams}>
      {children}
    </ConnectionCtx.Provider>
  );
};
