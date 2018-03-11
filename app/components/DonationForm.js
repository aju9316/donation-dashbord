import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DonationForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      donor_name     : '',
      donor_age      : '',
      donor_city     : '',
      donation_type  : '',
      donation_amount: 0,
      ageOptions     : []
    }

    this.handleDonorName = this.handleDonorName.bind(this);
    this.handleDonorAge  = this.handleDonorAge.bind(this);
    this.handleDonorCity = this.handleDonorCity.bind(this);
    this.handleType      = this.handleType.bind(this);
    this.handleAmount    = this.handleAmount.bind(this);
  }
  componentDidMount() {
    let ageGroups = ['18-23', '24-29', '30-35', '36-41', '42-47', '48-53', '54-59', '60-65', '66-71', '72-77', '78-83', '84-89', '90-95', '96-101'];
    let opts      = []

    for( let i = 0; i < ageGroups.length; i++ ) {
      opts.push(<option>{ageGroups[i]}</option>);
    }

    this.setState({
      ageOptions: opts
    })
  }
  handleDonorName(e) {
    this.setState({
      donor_name: e.target.value
    });
  }
  handleDonorAge(e) {
    this.setState({
      donor_age: e.target.value
    });
  }
  handleDonorCity(e) {
    this.setState({
      donor_city: e.target.value
    });
  }
  handleType(e) {
    this.setState({
      donation_type: e.target.value
    });
  }
  handleAmount(e) {
    this.setState({
      donation_amount: e.target.value
    });
  }
	render() {
		return (
      <form>
        <div className="form-group">
          <label>Donor Name</label>
          <input className="form-control" value={this.state.donor_name} onChange={this.handleDonorName} />
        </div>
        <div className="form-group">
          <label>Donor Age group</label>
          <select className="form-control">
            {this.state.ageOptions}
          </select>
        </div>
        <div className="form-group">
          <label>Donor City</label>
          <input className="form-control" value={this.state.donor_city} onChange={this.handleDonorCity} />
        </div>
        <div className="form-group">
          <label>Donation Type</label>
          <input className="form-control" value={this.state.donation_type} onChange={this.handleType} />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input className="form-control" value={this.state.donation_amount} onChange={this.handleAmount} />
        </div>
      </form>
		)
	}
}

export default DonationForm;