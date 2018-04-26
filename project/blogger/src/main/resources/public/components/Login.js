import React from 'react';
import { loginUser, loginOAuth, fetchBlogsFromServer, loginUserSuccessful } from "../actions/Actions.js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../store/blogger_store.js';
import {Redirect} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {credentials: {username: '', password: ''}}
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    componentWillMount() {
        if (store.getState().auth && store.getState().auth.auth &&  store.getState().auth.auth.loginSuccessful) {
            store.getState().auth.auth.loginSuccessful = true;
        }
        console.log('componentDidMount:store.auth.auth:'+JSON.stringify(store.getState().auth));
    }
    onChange(event) {
        // console.log('onChange:event.target.name is:'+event.target.name);
        // console.log('onChange:event.target.value is:'+event.target.value);
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;
        return this.setState({
            credentials: credentials,
        });
    }

    onSave(event) {
        // alert('onSave:event is:'+JSON.stringify(this.state.credentials));
        event.preventDefault();
        // Below one works but no access token returned
        loginUser(this.state.credentials);
        // fetchBlogsFromServer();
        // loginOAuth(this.state.credentials.username, this.state.credentials.password);
        // const userResponse = loginUser(this.state.credentials);
        // alert('Login:userResource:'+JSON.stringify(userResponse));
        // store.dispatch(loginUserSuccessful(userResponse));

    }
    render() {
        // alert('Login : render: isLoginSuccessful? check storegetState();'+JSON.stringify(store.getState()));
        // if (store.getState().auth) {
        //     alert('Login : store.getState().user && store.getState().auth.token;'+JSON.stringify(store.getState().user && store.getState().auth.token));
        //     if (store.getState().auth.auth) {
        //         alert('Login : store.getState().auth.auth.loginSuccessful;'+JSON.stringify(store.getState().auth.auth.loginSuccessful));
        //     }
        // }
        // console.log('Login:state.error:'+JSON.stringify(store.getState().error));
        // console.log('Login:state.user:'+JSON.stringify(store.getState().user));
        // console.log('Login:state.auth:'+JSON.stringify(store.getState().auth));
        // console.log('Login:state.auth:'+JSON.stringify(store.getState().auth.auth));
        let isThereError = false;
        if (store.getState().user && store.getState().user.user && store.getState().auth && store.getState().auth.auth && store.getState().auth.auth.token) {
            if (store.getState().auth.auth.loginSuccessful && store.getState().auth.auth.token && store.getState().auth.auth.token !== null) {
                return (<Redirect to='/'/>)
            } 
        } else if (store.getState().auth && store.getState().auth.auth && store.getState().auth.auth.loginSuccessful && store.getState().auth.auth.loginSuccessful === false) {
            isThereError = true;
        }
        if (store.getState().error.loginFailed) {
            isThereError = true;
        }
            // console.log('login:render: store.getState()')
            return(
            <div className='row'>
                <div className="container col-lg-offset-1">
                    <h2>Login</h2>
                </div>
                <form className=".form-control form-horizontal">
                    <div className="col-lg-10" >
                    {isThereError ?
                        <div className="row">
                            <div className="col-lg-offset-2 col-lg-2 ">
                                <h6></h6>
                            </div>
                            <div className="col-lg-6 ">
                                <h6 style={{'color': 'red'}}>Invalid credentials provided</h6>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-lg-offset-2 col-lg-2 ">
                                <h6></h6>
                            </div>
                            <div className="col-lg-6 ">
                                <h6></h6>
                            </div>
                        </div>
                        }                                   
                        <div className="row">
                            <div className="col-lg-offset-2 col-lg-2 panel">
                                <h6>Username</h6>
                            </div>
                            <div className="col-lg-6 ">
                                <input className="form-control" type="text"
                                placeholder="Enter Username" name="username" autoComplete="current-username" value={this.state.credentials.username} onChange={this.onChange} required autoFocus/> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-offset-2 col-lg-2 panel">
                                <h6>Password</h6>
                            </div>
                            <div className="col-lg-6 ">
                                <input className="form-control" type="password"
                                placeholder="Enter Password" name="password" autoComplete="current-password" value={this.state.credentials.password} onChange={this.onChange} required /> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-offset-2 col-lg-2 panel">
                                <label >Not a Member?</label>
                                <a href="/signup"><span className="glyphicon glyphicon-pencil"></span> Sign Up</a>
                            </div>
                        </div>
                        {/* <br /> */}
                        {/* <button type="button" >Cancel</button>
                        <button type="button" id="loginBtnId" onClick={this.onSave}>Login</button> */}

                        <div className="row">
                            <div className="col-sm-offset-2 col-sm-6 col-lg-2 panel">
                                {/* <button type="button" className="btn btn-info form-control" id="cancelBtnId" as={NavLink} to={`/`}>Cancel</button> */}
                                <button className="btn btn-info form-control" id="cancelBtnId" onClick={()=> {this.props.history.replace('/')}}>Cancel</button>
                            </div>
                            <div className="col-sm-6 col-lg-2 panel">
                                <button type="submit" className="btn btn-primary form-control" id="loginBtnId" onClick={this.onSave}>Login</button>
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

// function mapDispatchToProps(dispatch) {  
//     return {
//       actions: bindActionCreators(Login, dispatch)
//     };
//   }
//   export default connect(null, mapDispatchToProps)(Login);
  
  
export default Login;



// handleKeyDown = function (e, cb) {
//     if (e.key === 'Enter' && e.shiftKey === false) {
//       e.preventDefault();
//       cb();
//     }
//   };

//   render() {
//     const { handleSubmit } = this.props;
//     const form = (
//       <form
//             onSubmit={handleSubmit}
//             onKeyDown={(e) => { this.handleKeyDown(e, handleSubmit); }}
//       >
//           <textarea placeholder="Type your message..." autoComplete="off" {...text}  />
//         </div>
//         <button type="submit"><span>send</span></button>
//       </form>
//     );
//     return form;
//   }
// }

