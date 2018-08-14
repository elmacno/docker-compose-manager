import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fetch } from '../../../../Services';
import RealtimeLineChart from '../RealtimeLineChart';

class MemoryUsageChart extends Component {
  static propTypes = {
    container: PropTypes.string.isRequired
  };

  handleRefresh = async chart => {
    const { container } = this.props;
    try {
      let response = await Fetch(`/containers/${container}/stats`);
      chart.config.data.datasets[0].data.push({
        x: response.stats.read,
        y: response.stats.memory_stats.usage / (1024 * 1024)
      });
      chart.config.data.datasets[1].data.push({
        x: response.stats.read,
        y: response.stats.memory_stats.max_usage / (1024 * 1024)
      });
      chart.config.options.title.text = `Memory usage (${Math.round(
        (response.stats.memory_stats.limit / (1024 * 1024 * 1024)) * 100
      ) / 100}GB limit)`;
    } catch (error) {
      console.error(
        `Could not fetch the stats for container ${container}:`,
        await error
      );
    }
  };

  render() {
    return (
      <RealtimeLineChart
        title="Memory usage"
        handleRefresh={this.handleRefresh}
        datasets={[
          { label: 'Memory usage (MB)', color: '#BDE4A8' },
          { label: 'Max memory usage (MB)', color: '#F5F749' }
        ]}
        axes={[{ type: 'linear', min: 0 }]}
      />
    );
  }
}

export default MemoryUsageChart;
