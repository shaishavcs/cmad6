import React from 'react';
import { changePassword } from '../actions/Actions';
import store from '../store/blogger_store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Redirect, NavLink } from 'react-router-dom';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        console.log('changePassword: props:'+JSON.stringify(props));
        console.log('changePassword: store.state:'+JSON.stringify(store.getState().user));
        if (store.getState().user && store.getState().user.user) {
            console.log('changePassword: constructor:user present in store:props.'+JSON.stringify(props.user.user));
            this.state = {
                user: this.props.user.user,
                existingPassword: this.props.user.user.password,
                changePassword: {
                    currentPassword: this.props.user.user.password,
                    newPassword: '',
                    repeatPassword: '',
                },
                errorMessage: ' ',
                requiredFieldsEntered: false
            }
        } else {
            this.state = {
                redirect: true
            }
        }
        console.log('changePassword: constructor:state set:'+JSON.stringify(this.state));
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.handleSubmitButtonEnabling = this.handleSubmitButtonEnabling.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log('ChangePassword: componentWillReceiveProps:'+nextProps);
        if (nextProps.user) {
            this.setState( {
                user: this.props.user.user,
                existingPassword: this.props.user.user.password,
                changePassword: {
                    currentPassword: this.props.user.user.password,
                    newPassword: '',
                    repeatPassword: '',
                },
                errorMessage: ' ',
                requiredFieldsEntered: false
            })
        }
    }
    onChange(event) {
        const field = event.target.name;
        const changePasswordState = this.state.changePassword;
        changePasswordState[field] = event.target.value;
        this.setState({
            user: this.state.user,
            changePassword: changePasswordState,
            existingPassword: this.state.existingPassword,
            requiredFieldsEntered: this.state.requiredFieldsEntered
        });
        this.handleSubmitButtonEnabling();
        return this.state;
    }

    handleSubmitButtonEnabling() {
        let errorMessageToSet = '';
        if ((this.state.changePassword.newPassword && this.state.changePassword.repeatPassword) && (this.state.changePassword.newPassword !== this.state.changePassword.repeatPassword)) {
            errorMessageToSet = "The new passwords do not match";
        } else 
        if ((this.state.changePassword.newPassword && this.state.changePassword.repeatPassword) && (this.state.changePassword.newPassword === this.state.changePassword.currentPassword === this.state.changePassword.repeatPassword)) {
                errorMessageToSet = "The new password cannot be same as previous password";
        } else {
                errorMessageToSet = undefined;
        }
        let allFieldsSet = false;
        if (!this.state.changePassword.newPassword || !this.state.changePassword.currentPassword || !this.state.changePassword.repeatPassword) {
            allFieldsSet = false;
        } else {
            allFieldsSet = !errorMessageToSet;
        }
        this.setState({
            user: this.state.user,
            changePassword: this.state.changePassword,
            existingPassword: this.state.existingPassword,
            errorMessage: errorMessageToSet,
            requiredFieldsEntered: allFieldsSet
        });
    }
    onSave(event) {
        if (this.state.user.password) {
            event.preventDefault();
            changePassword(this.state.user.userId, this.state.changePassword);
        }
    }

    render() {
        console.log('changePassword:render:this.state?'+JSON.stringify(this.state.redirect))
        console.log('changePassword:render:this.props.user?'+JSON.stringify(this.props.user))
        if (this.state && this.state.redirect) {
            return (<Redirect to="/login" />);
        }
        if (!this.props.user) {
            return (<Redirect to="/login" />);
        }
        let errorMessageToDisplay = this.state.errorMessage;
        if (this.props.user && this.props.error.currentPasswordMismatch) {
            errorMessageToDisplay = 'The current password is invalid';
        } else if (this.props.user.profileUpdated && this.props.user.profileUpdated == true) {
            return (<Redirect to="/login" />);
        }
        return (
            <div id="changepasswordDivId" className="col-sm-12 col-lg-12 col-xs-12 col-md-12">
            <div className="container col-lg-offset-1">
                <h2>Change Password</h2>
            </div>
            <form className=".form-control form-horizontal">
                <div className="col-lg-10" >
                    <div className="row col-lg-offset-4" style={{'height': '30px'}}>
                        <h6 style={{'color': 'red'}}>{errorMessageToDisplay}</h6>
                    </div>                    
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Current Password</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="password"
                            placeholder="Enter current password" name="currentPassword" onChange={this.onChange} required autoFocus /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>New Password</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="password"
                            placeholder="Enter new password" name="newPassword" onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-offset-2 col-lg-2 panel">
                            <h6>Verify New Password</h6>
                        </div>
                        <div className="col-lg-6 ">
                            <input className="form-control" type="password"
                            placeholder="Repeat Password" name="repeatPassword" onChange={this.onChange} required /> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-offset-2 col-sm-6 col-lg-2 panel">
                            <button className="btn btn-info" id="cancelBtnId" onClick={()=> {this.props.history.replace('/')}}>Cancel</button>
                        </div>
                        <div className="col-sm-6 col-lg-2 panel">
                            <button type="button" disabled={!this.state.requiredFieldsEntered} className="btn btn-primary" onClick={this.onSave}>Change</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        user: state.user,
        error: state.error
    }
}

      
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            changePassword,
            push,
        }, dispatch),
    };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);