import React, {FC} from 'react';
import {VictoryChart, VictoryLine, VictoryTheme, VictoryAxis} from 'victory';
const PerformanceChart: FC<any> = ({data}: any) => {
  return (
    <div style={{width: 600, height: 600}}>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: {stroke: '#c43a31'},
            parent: {border: '1px solid #ccc'},
          }}
          data={data.map(({startTime, duration}: any) => ({
            x: startTime,
            y: duration,
          }))}
          // x="startTime"
          // y="duration"
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
