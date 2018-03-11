import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    let groupedData = _.groupBy(graphData, 'donation_cause');

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
        <BarChart data={this.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" allowDuplicatedCategory={false} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" label />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default BarGraph;