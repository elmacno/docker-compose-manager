import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fetch } from '../../../../Services';
import RealtimeLineChart from '../RealtimeLineChart';

class CpuUsageChart extends Component {
  static propTypes = {
    container: PropTypes.string.isRequired
  }

  handleRefresh = async (chart) => {
    const { container } = this.props;
    try {
      let response = await Fetch(`/containers/${container}/stats`);
      let cpuDelta = response.stats.cpu_stats.cpu_usage.total_usage - response.stats.precpu_stats.cpu_usage.total_usage;
      let systemDelta = response.stats.cpu_stats.system_cpu_usage - response.stats.precpu_stats.system_cpu_usage;
      let cpuPercent;
      if (systemDelta > 0.0) {
        cpuPercent = (cpuDelta / systemDelta) * response.stats.cpu_stats.cpu_usage.percpu_usage.length * 10000.0;
      }
      chart.config.data.datasets[0].data.push({
        x: response.stats.read,
        y: cpuPercent
      })
    } catch(error) {
      console.error(`Could not fetch the stats for container ${container}:`, await error);
    }
  }

  render() {
    return <RealtimeLineChart
            title="CPU usage"
            handleRefresh={this.handleRefresh}
            datasets={[{label: 'Total CPU usage', color: '#2E86AB'}]}
            axes={[{type: 'linear', min: 0, max: 100, stepSize: 10}]} />;
  }
}

export default CpuUsageChart;