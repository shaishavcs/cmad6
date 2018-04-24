import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { updateProfile } from '../actions/Actions';
import store from '../store/blogger_store.js';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        console.log("EditProfile:store.getState().user.user:"+JSON.stringify(store.getState().user.user));
        this.state = {
            user: store.getState().user.user,
            errorMessage: ' ',
            requiredFieldsEntered: true 
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmitButtonEnabling = this.handleSubmitButtonEnabling.bind(this);
        this.save = this.save.bind(this);
    }

    onChange(event) {
        // console.log('onChange:event.target.name is:'+event.target.name);
        // console.log('onChange:event.target.value is:'+event.target.value);
        console.log('onChange:event.target.value is:'+event.target.value);
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user: user,
            requiredFieldsEntered: this.state.requiredFieldsEntered
        });
        this.handleSubmitButtonEnabling();
        console.log('onChange:event.target.value is:'+JSON.stringify(this.state));
        return this.state;
    }
    handleSubmitButtonEnabling() {
        // check if the 2 passwords entered do not match
        let allFieldsSet = false;
        if (!this.state.user.emailId) {
            allFieldsSet = false;
        } else {
            allFieldsSet = true;
        }
        this.setState({
            user: this.state.user,
            requiredFieldsEntered: allFieldsSet
        });
    }

    save() {
        console.log('Submitting Profile changes.......'+this.state.user);
        this.state.user["token"] = '';
        updateProfile(this.state.user, this.state.user.userId);
    }

    render() {
        const firstName = this.state.user.firstName? this.state.user.firstName:'';
        const lastName = this.state.user.lastName? this.state.user.lastName:'';
        const emailId = this.state.user.emailId? this.state.user.emailId:'';
        const alternateEmailId = this.state.user.alternateEmailId? this.state.user.alternateEmailId:'';
        const phoneNumber = this.state.user.phoneNumber? this.state.user.phoneNumber:'';
        const disabledBtn = !this.state.requiredFieldsEntered;

        return (
            <div id="updateProfileDivId" className="col-sm-12 col-lg-12 col-xs-12 col-md-12">
            <div className="container col-lg-offset-1">
                <h2>Edit Profile</h2>
            </div>
            <form className=".form-control form-horizontal">
                <div className="col-lg-10" >
                    <div className="row col-lg-offset-4" style={{'height': '30px'}}>
                        <h6 style={{'color': 'red'}}>{this.state.errorMessage}</h6>
                    </div>                    
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>First Name</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter first name" name="firstName" value={firstName} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Last Name</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter last name" name="lastName" value={lastName} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Primary Email</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter primary emaid" name="emailId" value={emailId} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Alternate Email</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter alternate email" name="alternateEmailId" value={alternateEmailId} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Phone Number</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter phone number" name="phoneNumber" value={phoneNumber} onChange={this.onChange} required /> 
                        </div>
                    </div>
                        {/* <p>Address:</p>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                                <label ><b>Street Address</b></label>
                                <input type="text" placeholder="House Name/Number and Street" name="lname" value={streetAddress} required />
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                                <label ><b>City</b></label>
                                <input type="text" placeholder="City" name="lname" value={city} required />
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                                <label ><b>State</b></label>
                                <input type="text" placeholder="State" name="lname" value={state} required />
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                                <label ><b>Country</b></label>
                                <input type="text" placeholder="Country" name="lname" value={country} required />
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                                <label ><b>PIN/Zip Code</b></label>
                                <input type="text" placeholder="PIN/Zip code" name="lname" value={zipCode} required />
                            </div>
                        </div> */}
                    <div className="row">
                        <div className="col-sm-offset-2 col-sm-6 col-lg-2 panel">
                            {/* <button type="button" className="btn btn-info form-control" id="cancelBtnId" as={NavLink} to={`/`}>Cancel</button> */}
                            <button className="btn btn-info" id="cancelBtnId" onClick={()=> {this.props.history.replace('/')}}>Cancel</button>
                        </div>
                        <div className="col-sm-6 col-lg-2 panel">
                            <button type="button" disabled={!this.state.requiredFieldsEntered} className="btn btn-primary" onClick={this.save}>Update</button>
                        </div>
                    </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default EditProfile;