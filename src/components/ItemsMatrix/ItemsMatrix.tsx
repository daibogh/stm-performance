import {Socket} from 'socket.io-client';
import {FC, useCallback, useMemo} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {setMatrix, updateMatrix} from '../../store/slices/matrixSlice';
const ItemsMatrix: FC = () => {
  const matrix = useAppSelector(store => store.matrix.value);
  const dispatch = useAppDispatch();
  const onOpenSocket = useCallback((socket: Socket) => {
    console.log('try to emit matrix:get');
    socket.emit('matrix:get');
  }, []);
  const listeners = useMemo(
    () => ({
      'matrix:value': (value: {backgroundColor: string}[][]) => {
        dispatch(setMatrix(value));
      },
      'matrix:update': (value: {
        position: [number, number];
        backgroundColor: string;
      }) => {
        dispatch(updateMatrix(value));
        performance.mark('matrix:update--start');
      },
    }),
    [dispatch],
  );
  useSocketConnection({onOpen: onOpenSocket, listeners});
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${matrix.length}, 1px)`,
        }}
      >
        {matrix.map((row, rowIdx) =>
          row.map((elem, columnIdx) => (
            <div
              key={`row=${rowIdx}-column=${columnIdx}`}
              style={{
                width: 1,
                height: 1,
                backgroundColor: elem.backgroundColor,
              }}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default ItemsMatrix;
