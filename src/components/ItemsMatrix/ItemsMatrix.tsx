import {Socket} from 'socket.io-client';
import {FC, useCallback, useMemo, useContext, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {ConnectionCtx, useSocketConnection} from '../../hooks/useSocketConnection';
import {setMatrix, updateMatrix} from '../../store/slices/matrixSlice';
import {usePerformanceMeasure} from '../../hooks/usePerformanceMeasure';
const ItemsMatrix: FC = () => {
  const matrix = useAppSelector(store => store.matrix.value);
  const dispatch = useAppDispatch();
  const measureProps = useMemo(
    () => ({
      startMark: 'matrix:update--start',
      endMark: 'matrix:update--end',
      measureMark: 'matrix:re-render',
    }),
    [],
  );
  const {startMark, collectPerformanceList} = usePerformanceMeasure(
    measureProps,
  );
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
        startMark();
        dispatch(updateMatrix(value));
      },
    }),
    [dispatch, startMark],
  );
  const onCloseSocket = useCallback(() => {
    console.log(collectPerformanceList());
  }, [collectPerformanceList]);
  const {subscribe, subscribeGates} = useContext(ConnectionCtx)
  useEffect(() => {
    subscribeGates({onOpen: onOpenSocket, onClose: onCloseSocket})
    Object.entries(listeners).forEach(([event, callback]) => subscribe(event, callback))
    
  },[listeners, onCloseSocket, onOpenSocket, subscribe, subscribeGates]);
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
