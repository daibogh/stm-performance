import {FC, useContext} from 'react';

import { ConnectionCtx } from '../../hooks/useSocketConnection';
const SocketButton: FC = () => {
  const {isActive: isActiveConnection, startSocket: start, stopSocket: stop} = useContext(ConnectionCtx);
  return (
    <div style={{width: 100, height: 100}}>
      <button
        disabled={isActiveConnection}
        style={{
          background: isActiveConnection ? void 0 : 'green',
          color: 'white',
        }}
        type="button"
        onClick={() => start()}
      >
        start
      </button>
      <button
        disabled={!isActiveConnection}
        style={{
          background: !isActiveConnection ? void 0 : 'red',
          color: 'white',
        }}
        type="button"
        onClick={() => stop()}
      >
        stop
      </button>
    </div>
  );
};

export default SocketButton;
