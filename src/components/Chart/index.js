import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Chart as GoogleChart } from 'react-google-charts';

class Chart extends Component {
  render() {
    return (
      <div>
        {this.props.chart_data.length > 0 && (
          <GoogleChart
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            width="100%"
            height="40vh"
            data={this.props.chart_data}
            options={{ legend: { position: 'right' } }}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { chart_data: state.chart_data };
};

export default connect(mapStateToProps)(Chart);
