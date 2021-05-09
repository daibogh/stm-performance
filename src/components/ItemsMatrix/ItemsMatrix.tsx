import {Socket} from 'socket.io-client';
import {FC, useCallback, useMemo} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useSocketConnection} from '../../hooks/useSocketConnection';
import {setMatrix, updateMatrix} from '../../store/slices/matrixSlice';
import {usePerformanceMeasure} from '../../hooks/usePerformanceMeasure';
const ItemsMatrix: FC = () => {
  const matrix = useAppSelector(store => store.matrix.value);
  const dispatch = useAppDispatch();
  const startMark = usePerformanceMeasure({
    startMark: 'matrix:update--start',
    endMark: 'matrix:update--end',
    measureMark: 'matrix:re-render',
  });
  const onOpenSocket = useCallback((socket: Socket) => {
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
        startMark();
      },
    }),
    [dispatch, startMark],
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
