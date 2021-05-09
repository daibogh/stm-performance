import {FC, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {StoreContext} from '../../store/mobx';
const SocketButton: FC = () => {
  const {
    socket: {isActiveConnection, start, stop},
  } = useContext(StoreContext);
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

export default observer(SocketButton);
