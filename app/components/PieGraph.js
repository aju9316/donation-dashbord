import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

class BarGraph extends Component {
  constructor(props) {
    super(props);

    this.initialzeData = this.initialzeData.bind(this);
    this.initialzeData(this.props.graphData);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.graphData !== nextProps.graphData) {
      this.initialzeData(nextProps.graphData);
    }
  }
  initialzeData(graphData) {
    this.data       = [];
    let groupedData = _.groupBy(graphData, 'donor_age_group');

    for (let key in groupedData) {
      this.data.push({
        key: key,
        amount: _.sumBy(groupedData[key], 'donation_amount')
      })
    }
  }
  render() {
    return (
      <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        <PieChart>
          <Pie data={this.data} dataKey="amount" nameKey="key" fill="#8884d8" label/>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    )
  }
}

export default BarGraph;