import React from 'react';
import { Range } from 'immutable';
import { Bar } from 'react-chartjs-2';

function makeChartData(chartData) {
  return {
    labels: new Range(0, chartData.count() + 1).map(() => '').toArray(),
    datasets: [
      {
        label: '',
        borderWidth: 0,
        data: chartData.toArray()
      }
    ]
  };
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: false,
      gridLines: {
        display: false,
        offsetGridLines: false
      },
      categoryPercentage: 1,
      barPercentage: 0.6
    }],
    yAxes: [{
      display: true,
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100
      }
    }]
  },
  legend: {
    display: false
  }
};

const BillablePercentageChart = (props) => (
  <Bar
    data={makeChartData(props.data)}
    options={options}
    height={200}
    redraw
  />
);

BillablePercentageChart.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default BillablePercentageChart;
