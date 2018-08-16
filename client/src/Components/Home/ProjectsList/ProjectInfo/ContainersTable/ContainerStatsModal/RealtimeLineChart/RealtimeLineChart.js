import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';

class RealtimeLineChart extends Component {
  static propTypes = {
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        color: PropTypes.string
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    axes: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        min: PropTypes.number,
        max: PropTypes.number,
        stepSize: PropTypes.number
      })
    ).isRequired,
    handleRefresh: PropTypes.func.isRequired
  };

  render() {
    const { datasets, title, axes, handleRefresh } = this.props;
    const chartDatasets = datasets.map(dataset => ({
      label: dataset.label,
      backgroundColor: dataset.color,
      borderColor: dataset.color,
      fill: false,
      lineTension: 0,
      data: []
    }));
    const chartOptions = {
      title: { display: true, text: title },
      scales: {
        xAxes: axes.map(() => ({ type: 'realtime' })),
        yAxes: axes.map(axis => ({
          type: axis.type,
          ticks: { min: axis.min, max: axis.max, stepSize: axis.stepSize }
        }))
      },
      plugins: {
        streaming: {
          duration: 50000,
          refresh: 1000,
          delay: 2000,
          onRefresh: handleRefresh
        }
      }
    };
    return <Line data={{ datasets: chartDatasets }} options={chartOptions} />;
  }
}

export default RealtimeLineChart;
