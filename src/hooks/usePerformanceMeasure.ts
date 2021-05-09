import {useLayoutEffect, useCallback} from 'react';
type StartMarkFunction = () => void;
type CollectPerformanceFunction = () => void;
export const usePerformanceMeasure = ({
  startMark,
  endMark,
  measureMark,
}: {
  startMark: string;
  endMark: string;
  measureMark: string;
}): {
  startMark: StartMarkFunction;
  collectPerformanceList: CollectPerformanceFunction;
} => {
  useLayoutEffect(() => {
    performance.mark(endMark);
    try {
      performance.measure(measureMark, startMark, endMark);
    } catch (e) {
      console.log(e);
    }
  });
  return {
    startMark: useCallback(() => {
      performance.mark(startMark);
    }, [startMark]),
    collectPerformanceList: useCallback(
      () => performance.getEntriesByName(measureMark),
      [measureMark],
    ),
  };
};
