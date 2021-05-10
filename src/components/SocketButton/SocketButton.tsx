import {FC} from 'react';
import {useAtom, useAction} from '@reatom/react';
import {
  socketAtom,
  startSocketAction,
  stopSocketAction,
} from '../../store/reatom/socketAtom';
const SocketButton: FC = () => {
  const isActiveConnection = useAtom(socketAtom);
  const start = useAction(startSocketAction);
  const stop = useAction(stopSocketAction);
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
