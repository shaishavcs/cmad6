import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from "../actions/Actions.js";
import { NavLink } from 'react-router-dom';
import store from '../store/blogger_store.js';
import {Redirect} from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
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
            },
            repeatPassword: '',
            errorMessage: ' ',
            requiredFieldsEntered: false
        }
        this.onChange = this.onChange.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handleSubmitButtonEnabling = this.handleSubmitButtonEnabling.bind(this);
    }
    onChange(event) {
        // console.log('onChange:event.target.name is:'+event.target.name);
        // console.log('onChange:event.target.value is:'+event.target.value);
        // console.log('onChange:event.target.value is:'+event.target.value);
        const field = event.target.name;
        const user = this.state.user;
        const repeatPassword = this.state.repeatPassword;
        if (field === "repeatPassword") {
            this.state['repeatPassword'] = event.target.value;
        } else {
            user[field] = event.target.value;
        }
        this.setState({
            user: user,
            repeatPassword: this.state.repeatPassword,
            requiredFieldsEntered: this.state.requiredFieldsEntered
        });
        this.handleSubmitButtonEnabling();
        // console.log('onChange:event.target.value is:'+JSON.stringify(this.state));
        return this.state;
    }

    onChangeAddress(event) {
        // console.log('onChange:event.target.name is:'+event.target.name);
        // console.log('onChangeAddress:event.target.value is:'+event.target.value);
        const field = event.target.name;
        const user = this.state.user;
        // console.log('onChangeAddresss:user is:'+JSON.stringify(user));
        const address = this.state.user.address;
        address[field] = event.target.value;
        user['address'] = address;
        this.setState({
            user: user,
            repeatPassword: this.state.repeatPassword,
            requiredFieldsEntered: this.state.requiredFieldsEntered
        });
        this.handleSubmitButtonEnabling();
        return this.state;
    }

    handleSubmitButtonEnabling() {
        let errorMessageToSet = '';
        // check if the 2 passwords entered do not match
        if ((this.state.user.password && this.state.repeatPassword) && (this.state.user.password !== this.state.repeatPassword)) {
            errorMessageToSet = "The entered passwords do not match";
        }
        let allFieldsSet = false;
        if (!this.state.user.userId || !this.state.user.password || !this.state.user.emailId) {
            allFieldsSet = false;
        } else {
            allFieldsSet = true;
        }
        this.setState({
            user: this.state.user,
            repeatPassword: this.state.repeatPassword,
            errorMessage: errorMessageToSet,
            requiredFieldsEntered: allFieldsSet
        });
    }
    onSave(event) {
        if (this.state.user.password)
        event.preventDefault();
        registerUser(this.state.user);
    }

    render() {
        if (store.getState().user && store.getState().user.userRegistered) {
            return (<Redirect to="/login" />);
        }
        const disabledBtn = !this.state.requiredFieldsEntered;
        console.log("btnClass:"+JSON.stringify(disabledBtn));
        return (
            <div className='row'>
            <div className="container col-lg-offset-1">
                <h2>Sign Up</h2>
            </div>
            <form className=".form-control form-horizontal">
                <div className="col-lg-10" >
                    <div className="row col-lg-offset-4" style={{'height': '30px'}}>
                        <h6 style={{'color': 'red'}}>{this.state.errorMessage}</h6>
                    </div>                    
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Username</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter Username" name="userId" autoComplete="current-username" value={this.state.user.username} onChange={this.onChange} required autoFocus/> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Password</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="password"
                            placeholder="Enter Password" name="password" value={this.state.user.password} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Repeat Password</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="password"
                            placeholder="Repeat Password" name="repeatPassword" value={this.state.repeatPassword} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>First Name</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter first name" name="firstName" value={this.state.user.firstName} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Last Name</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter last name" name="lastName" value={this.state.user.lastName} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Primary Email</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter primary emaid" name="emailId" value={this.state.user.emailId} onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Alternate Email</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter alternate email" name="alternateEmailId" value={this.state.user.alternateEmailId} onChange={this.onChange} /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Phone Number</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="text"
                            placeholder="Enter phone number" name="phoneNumber" value={this.state.user.phoneNumber} onChange={this.onChange} /> 
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <label >Not a Member?</label>
                            <a href="/signup"><span className="glyphicon glyphicon-pencil"></span> Sign Up</a>
                        </div>
                    </div> */}
                    {/* <br /> */}
                    {/* <button type="button" >Cancel</button>
                    <button type="button" id="loginBtnId" onClick={this.onSave}>Login</button> */}

                    <div className="row">
                        <div className="col-sm-offset-2 col-sm-6 col-lg-2 panel">
                            {/* <button type="button" className="btn btn-info form-control" id="cancelBtnId" as={NavLink} to={`/`}>Cancel</button> */}
                            <button className="btn btn-info form-control" id="cancelBtnId" onClick={()=> {this.props.history.replace('/')}}>Cancel</button>
                        </div>
                        <div className="col-sm-6 col-lg-2 panel">
                            <button type="button" disabled={!this.state.requiredFieldsEntered} className="btn btn-primary form-control" id="registerBtnId" onClick={this.onSave}>Register</button>
                        </div>
                    </div>

                    {/* <div className="row" style={{'backgroundcolor': '#f1f1f1'}}>
                        <div className="col-sm-offset-2 col-sm-6 col-lg-2 panel">
                            <span className="psw"><a href="Forgotpassword">Forgot password?</a></span>
                        </div>
                    </div> */}
                </div>
            </form>
            </div>
        );
    }
}
       
export default SignUp;     
