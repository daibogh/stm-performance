import React, {FC} from 'react';
import {VictoryChart, VictoryBar, VictoryTheme, VictoryAxis} from 'victory';
const PerformanceChart: FC<any> = ({data}: any) => {
  return (
    <div style={{width: 600, height: 600}}>
      <VictoryChart>
        <VictoryBar
          theme={VictoryTheme.material}
          data={data}
          x="startTime"
          y="duration"
        />
        <VictoryAxis
          label="start time (ms)"
          style={{
            axisLabel: {padding: 30},
          }}
        />
        <VictoryAxis
          dependentAxis
          label="duration (ms)"
          style={{
            axisLabel: {padding: 40},
          }}
        />
      </VictoryChart>
    </div>
  );
};
export default PerformanceChart;
