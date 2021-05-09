import {useLayoutEffect, useCallback} from 'react';
type StartMarkFunction = () => void;
export const usePerformanceMeasure = ({
  startMark,
  endMark,
  measureMark,
}: {
  startMark: string;
  endMark: string;
  measureMark: string;
}): StartMarkFunction => {
  useLayoutEffect(() => {
    performance.mark(endMark);
    try {
      performance.measure(measureMark, startMark, endMark);
    } catch (e) {
      console.log(e);
    }
  });
  return useCallback(() => performance.mark(startMark), [startMark]);
};
