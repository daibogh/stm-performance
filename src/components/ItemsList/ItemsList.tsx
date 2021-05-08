import {FC, useCallback, useLayoutEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Socket} from 'socket.io-client';
import {setList, updateList} from '../../store/slices/listSlice';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {stopSocket, startSocket} from '../../store/slices/socketSlice';
import {SocketButton} from '../SocketButton';
const ItemsList: FC = () => {
  const items = useAppSelector(store => store.list.value);
  const dispatch = useAppDispatch();
  const onOpenSocket = useCallback((socket: Socket) => {
    socket.emit('list:get');
  }, []);
  const listeners = useMemo(
    () => ({
      'list:value': (value: number[]) => {
        dispatch(
          setList(
            value.map(item => ({
              backgroundColor: `rgb(${Math.floor(
                Math.random() * 255,
              )},${Math.floor(Math.random() * 255)},${Math.floor(
                Math.random() * 255,
              )})`,
              width: item,
            })),
          ),
        );
      },
      'list:update': (value: [number]) => {
        dispatch(updateList(value));
        performance.mark('list:update--start');
      },
    }),
    [dispatch],
  );
  useSocketConnection({onOpen: onOpenSocket, listeners});
  useLayoutEffect(() => {
    performance.mark('list:update--end');
    try {
      performance.measure(
        're-render',
        'list:update--start',
        'list:update--end',
      );
      if (items.every(elem => elem.width >= 100)) {
        dispatch(stopSocket());
      }
    } catch (e) {
      console.log(e);
    }
  });
  return (
    <div>
      <ul>
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              background: item.backgroundColor,
              width: item.width,
            }}
          />
        ))}
      </ul>
    </div>
  );
};
export default ItemsList;
