import React, { Component } from 'react';
import { connect } from 'react-redux';

import { set_event, set_chart } from '../../actions';
import parse_input from './parse_input';
import data from './data';

class Input extends Component {
  state = { input_data: data, error: '', data_is_valid: false };

  handleChange = evt => {
    this.setState({
      input_data: evt.target.value,
    });
  };

  onGenerateChart = () => {
    const { input_data } = this.state;
    const { set_event } = this.props;

    try {
      const data_parsed = parse_input(input_data);
      if (data_parsed) {
        data_parsed.map(event => set_event(event));
        this.setState({ error: '', data_is_valid: true });
      }
    } catch (error) {
      this.setState({ error: error.message, data_is_valid: false });
    }
  };

  render() {
    const { input_data, error, data_is_valid } = this.state;

    if (data_is_valid) {
      this.props.set_chart(this.props.events);
    }

    return (
      <div className="input">
        <textarea value={input_data} onChange={this.handleChange} />
        {error && <div style={{ color: 'red' }}> {error}</div>}
        <footer>
          <button onClick={this.onGenerateChart}>GENERATE CHART</button>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.events };
};

export default connect(
  mapStateToProps,
  { set_event, set_chart },
)(Input);
