import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class MultiBarGraph extends Component {
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
    let groupCity   = _.groupBy(graphData, 'donor_city');

    for (let city in groupCity) {
      let graphObject = {};
      let groupedType = _.groupBy(groupCity[city], 'donation_cause');
      for (let type in groupedType) {
        graphObject[type] = _.sumBy(groupedType[type], 'donation_amount')
      }
      graphObject.city = city
      this.data.push(graphObject)
    }
  }
  render() {
    return (
      <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        <BarChart data={this.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" allowDuplicatedCategory={false} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Children Welfare" fill="#8884d8" />
          <Bar dataKey="Women Safety" fill="#396AB1" />
          <Bar dataKey="Other" fill="#DA70D6" />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}

export default MultiBarGraph;