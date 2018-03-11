import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import BarGraph from './BarGraph';
import PieGraph from './PieGraph';
import MultiBarGraph from './MultiBarGraph';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    let donorArray = window.localStorage.getItem('donors');
    donorArray     = donorArray ? JSON.parse(donorArray) : []
    
    this.state = {
      donor_name     : '',
      donor_age_group: '',
      donor_city     : '',
      donation_cause  : '',
      donation_amount: '',
      ageOptions     : [],
      cityOptions    : [],
      typeOptions    : [],
      donors         : donorArray
    }

    this.handleDonorName     = this.handleDonorName.bind(this);
    this.handleDonorAgeGroup = this.handleDonorAgeGroup.bind(this);
    this.handleDonorCity     = this.handleDonorCity.bind(this);
    this.handleCause         = this.handleCause.bind(this);
    this.handleAmount        = this.handleAmount.bind(this);
    this.submitClick         = this.submitClick.bind(this);
  }
  componentDidMount() {
    let ageGroups = ['18-23', '24-29', '30-35', '36-41', '42-47', '48-53', '54-59', '60-65', '66-71', '72-77', '78-83', '84-89', '90-95', '96-101'];
    let cities    = ['Mumbai', 'Pune', 'New Delhi', 'Bengaluru', 'Kolkata'];
    let type      = ['Children Welfare', 'Women Safety', 'Other'];

    let ageOpts   = [];
    let cityOpts  = [];
    let typeOpts  = [];

    for( let i = 0; i < ageGroups.length; i++ ) {
      ageOpts.push(<option>{ageGroups[i]}</option>);
    }

    for( let i = 0; i < cities.length; i++ ) {
      cityOpts.push(<option>{cities[i]}</option>);
    }

    for( let i = 0; i < type.length; i++ ) {
      typeOpts.push(<option>{type[i]}</option>);
    }

    this.setState({
      ageOptions : ageOpts,
      cityOptions: cityOpts,
      typeOptions: typeOpts
    });
  }
  handleDonorName(e) {
    this.setState({
      donor_name: e.target.value
    });
  }
  handleDonorAgeGroup(e) {
    if(e.target.value !== 'select...'){
      this.setState({
        donor_age_group: e.target.value
      });
    }
  }
  handleDonorCity(e) {
    if(e.target.value !== 'select...'){
      this.setState({
        donor_city: e.target.value
      });
    }
  }
  handleCause(e) {
    if(e.target.value !== 'select...'){
      this.setState({
        donation_cause: e.target.value
      });
    }
  }
  handleAmount(e) {
    this.setState({
      donation_amount: e.target.value
    });
  }
  submitClick() {
    if(this.state.donor_name
      && this.state.donor_age_group
      && this.state.donor_city
      && this.state.donation_cause
      && this.state.donation_amount) {
        let donorArray = window.localStorage.getItem('donors');
        donorArray     = donorArray ? JSON.parse(donorArray) : []

        let donationObject = {
          donor_name     : this.state.donor_name,
          donor_age_group: this.state.donor_age_group,
          donor_city     : this.state.donor_city,
          donation_cause : this.state.donation_cause,
          donation_amount: +this.state.donation_amount
        }

        donorArray.push(donationObject);
        window.localStorage.setItem('donors', JSON.stringify(donorArray));

        this.setState({
          donor_name     : '',
          donor_age_group: '',
          donor_city     : '',
          donation_cause : '',
          donation_amount: '',
          donors         : donorArray
        });
      }
      else
        alert('All fields are mandatory');
  }
	render() {
		return (
			<div className="container">
        <div class="page-header">
          <h1>Social Welfare <small>Dashboard for donations analytics</small></h1>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div class="panel panel-default">
              <div class="panel-heading">Donations by Cause</div>
              <div class="panel-body">
                <BarGraph graphData={this.state.donors} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div class="panel panel-default">
              <div class="panel-heading">Donations by Age Group</div>
              <div class="panel-body">
                <PieGraph graphData={this.state.donors} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div class="panel panel-default">
              <div class="panel-heading">Donations by City and Cause</div>
              <div class="panel-body">
                <MultiBarGraph graphData={this.state.donors} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div class="panel panel-default">
              <div class="panel-heading">Donation Form</div>
              <div class="panel-body">
                <form>
                  <div className="form-group">
                    <label>Donor Name</label>
                    <input className="form-control" value={this.state.donor_name} onChange={this.handleDonorName} />
                  </div>
                  <div className="form-group">
                    <label>Donor Age group</label>
                    <select className="form-control" value={this.state.donor_age_group} onChange={this.handleDonorAgeGroup}>
                      <option>select...</option>
                      {this.state.ageOptions}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Donor City</label>
                    <select className="form-control" value={this.state.donor_city} onChange={this.handleDonorCity}>
                      <option>select...</option>
                      {this.state.cityOptions}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Donation Cause</label>
                    <select className="form-control" value={this.state.donation_cause} onChange={this.handleCause}>
                      <option>select...</option>
                      {this.state.typeOptions}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Amount (in rupees)</label>
                    <input className="form-control" value={this.state.donation_amount} onChange={this.handleAmount} />
                  </div>
                  <input type="button" className="btn btn-primary" value="Save" onClick={this.submitClick} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
		)
	}
}

export default Dashboard;