import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from "../actions/Actions.js";
import { NavLink } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        // alert('SignUp: constructor:'+JSON.stringify(props));
        super(props);
        this.state = {
            user: {
                userId: '', 
                password: '',
                firstName: '',
                lastName: '',
                emailId: '',
                phoneNumber: '',
                alternateEmailId: '',
                company: '',
                address: {
                    streetAddress: '',
                    city: '',
                    state: '',
                    country: '',
                    zipCode: ''
                }
            }
        }
        this.onChange = this.onChange.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    onChange(event) {
        // console.log('onChange:event.target.name is:'+event.target.name);
        // console.log('onChange:event.target.value is:'+event.target.value);
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        return this.setState({
            user: user
        });
    }

    onChangeAddress(event) {
        // console.log('onChange:event.target.name is:'+event.target.name);
        console.log('onChange:event.target.value is:'+event.target.value);
        const field = event.target.name;
        const user = this.state.user;
        console.log('onChangeAddresss:user is:'+JSON.stringify(user));
        const address = this.state.user.address;
        address[field] = event.target.value;
        user['address'] = address;
        return this.setState({
            user: user
        });
    }
    onSave(event) {
        alert('onSave:event is:'+JSON.stringify(this.state.user));
        event.preventDefault();
        registerUser(this.state.user);
    }

    render() {
        return (
            <div id="signupDivId" className="col-sm-12 col-lg-12 col-xs-12 col-md-12">
                <form className="content" action="/">
                    <div className="container">
                        <h2>Sign Up</h2>
                        <p>Note: Please fill all the details marked by red border.</p>
                        <hr />
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>Username</b></label>
                            <input type="text" placeholder="Unique Username for login" name="userId" value={this.state.user.username} onChange={this.onChange} required />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="password"  value={this.state.user.password} onChange={this.onChange} required />
                        </div>

                        {/* <label for="psw-repeat"><b>Repeat Password</b></label> */}
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>Repeat Password</b></label>
                            <input type="password" placeholder="Repeat Password" name="psw-repeat"  />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>First Name</b></label>
                            <input type="text" placeholder="First Name" name="firstName"  value={this.state.user.firstName} onChange={this.onChange}  />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>Last Name</b></label>
                            <input type="text" placeholder="Last Name" name="lastName"  value={this.state.user.lastName} onChange={this.onChange}  />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" name="emailId"  value={this.state.user.emailId} onChange={this.onChange} required />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>Alternate Email</b></label>
                            <input type="text" placeholder="Enter Alternate Email for Account Recovery" name="alternateEmailId"  value={this.state.user.alternateEmailId} onChange={this.onChange} />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>Company</b></label>
                            <input type="text" placeholder="Company you work for" name="company"  value={this.state.user.company} onChange={this.onChange} />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <label ><b>Address</b></label>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <div className="panel">
                                <label ><b>Street Address</b></label>
                                <input type="text" placeholder="House Name/Number and Street" name="streetAddress"  value={this.state.user.address.streetAddress} onChange={this.onChangeAddress}  />
                            </div>
                            <div className="panel">
                                <label ><b>City</b></label>
                                <input type="text" placeholder="City" name="city"  value={this.state.user.address.city} onChange={this.onChangeAddress}  />
                            </div>
                            <div className="panel">
                                <label ><b>State</b></label>
                                <input type="text" placeholder="State" name="state" value={this.state.user.address.state} onChange={this.onChangeAddress}  />
                            </div>
                            <div className="panel">
                                <label ><b>Country</b></label>
                                <input type="text" placeholder="Country" name="country" value={this.state.user.address.country} onChange={this.onChangeAddress}  />
                            </div>
                            <div className="panel">
                                <label ><b>PIN Code</b></label>
                                <input type="text" placeholder="PIN/Zip code" name="zipCode" value={this.state.user.address.zipCode} onChange={this.onChangeAddress}  />
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <p>By creating an account you agree to our <a href="#" style={{color: 'dodgerblue'}}>Terms & Privacy</a>.</p>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-10 col-xs-10">
                            <span className="cancelbtn">
                                <NavLink to={`/`} blog={this.props.blog}>Cancel</NavLink>
                            </span>
                            {/* <button type="button" className="cancelbtn">Cancel</button> */}
                            <button type="submit" className="signupbtn" onClick={this.onSave}>Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default SignUp;