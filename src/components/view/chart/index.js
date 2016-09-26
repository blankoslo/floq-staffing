import React from 'react';
import { Line } from 'react-chartjs';

function makeChartData(chartData) {
  return {
    labels: chartData.map((w) => `Week ${w.week}`).toArray(),
    datasets: [
      {
        fillColor: 'transparent',
        strokeColor: 'black',
        data: chartData.map((w) => Math.round((w.staffed / w.staffable) * 100)).toArray()
      }
    ]
  };
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scaleLabel: '<%=value%>%',
  tooltipTitleTemplate: '<%= label%>%',
  tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>%',
  legend: {
    display: false
  }
};

const BillablePercentageChart = (props) => {
  const chartData = makeChartData(props.data);
  return <Line data={chartData} options={options} width={props.width} height={200} />;
};

BillablePercentageChart.propTypes = {
  data: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
};

export default BillablePercentageChart;
