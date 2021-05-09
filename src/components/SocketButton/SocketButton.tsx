import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {startSocket, stopSocket} from '../../store/slices/socketSlice';

const SocketButton: FC = () => {
  const isActive = useAppSelector(store => store.socket.isActiveConnection);
  const dispatch = useAppDispatch();
  return (
    <div style={{width: 100, height: 100}}>
      <button
        disabled={isActive}
        style={{background: isActive ? void 0 : 'green', color: 'white'}}
        type="button"
        onClick={() => dispatch(startSocket())}
      >
        start
      </button>
      <button
        disabled={!isActive}
        style={{background: !isActive ? void 0 : 'red', color: 'white'}}
        type="button"
        onClick={() => dispatch(stopSocket())}
      >
        stop
      </button>
    </div>
  );
};

export default SocketButton;
