import React from 'react';
// import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import store from '../store/blogger_store.js';
import { connect } from 'react-redux';
import { logout } from '../actions/Actions.js';
import * as BloggerActions from '../actions/Actions.js';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
// import Redirect from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);
        // alert("Header: constructor:props:"+JSON.stringify(props));
        // this.state = {
        //     isOpen: false,
        //     // initialValues: props.initialValues,
        //     // loginSuccessful: props.user.loginSuccessful,
        //     // user: props.user.user
        // };
        this.logoutSelected = this.logoutSelected.bind(this);
        // this.toggle = this.toggle.bind(this);
    }
    // toggle() {
    //     this.setState({
    //       isOpen: !this.state.isOpen
    //     });
    // }
    
    logoutSelected() {
        console.log('logoout action started: confirming from user first:');
        if(confirm('Are you sure you want to logout?')) {
            console.log('logout action started: got user confirmation:this.props.user.userId'+JSON.stringify(this.props.user.user.userId));
            logout(this.props.user.user.userId);
        }
        // window.location.replace('/');
        // make server call and logout
    }
    render () {
        // alert('Header:render:this.props?:'+JSON.stringify(this.props));
        const isUserLoggedIn = this.props.user && this.props.user.user && this.props.auth && this.props.auth.auth && this.props.auth.auth.loginSuccessful;
        // alert('Header:render:isUserLoggedIn?:'+JSON.stringify(isUserLoggedIn));
        // alert('Header:render:this.props.loginSuccessful?:'+JSON.stringify(this.props.user.loginSuccessful));
        // alert('Header:render:this.props.user.loginSuccessful?:'+JSON.stringify(this.props.user));

        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="row">
                        <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>                        
                        </button>
                        <a className="navbar-brand" href="#">
                            <span className="span-logo">
                                {/* <!-- <img src="images/evince_navbar.jpg" /> --> */}
                                </span>
                                </a>
                                
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                        {isUserLoggedIn ? 
                            <ul className="nav navbar-nav">
                                <li className="active"><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/all">All Blogs</NavLink></li>
                            </ul>
                            :
                            <ul className="nav navbar-nav">
                                <li className="active"><NavLink to="/">Home</NavLink></li>
                            </ul>
                        }                            
                        {isUserLoggedIn ? 
                            <ul className="nav navbar-nav navbar-right">
                                {/* <li><NavLink to="/logout"><span className="glyphicon glyphicon-log-out"></span> Logout</NavLink></li> */}
                                <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">{this.props.user.user.firstName}
                                    <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                    <li><NavLink to="/editProfile">Edit Profile</NavLink></li>
                                    <li><NavLink to="/changePassword">Change Password</NavLink></li>
                                    {/* <li><NavLink to="/logout">Logout</NavLink></li> */}
                                    <li><a href="#" onClick={this.logoutSelected}>Logout</a></li>
                                    {/* <li><a href="#" onClick={() => {if(confirm('Are you sure you want to logout?')) {this.logoutSelected};}}>Logout</a></li> */}
                                    {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } /> */}
                                    </ul>
                                </li>
                            </ul> 

                            :
                            <ul className="nav navbar-nav navbar-right">
                                <li><NavLink to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</NavLink></li> 
                                <li><NavLink to="/signup"><span className="glyphicon glyphicon-pencil"></span> SignUp</NavLink></li>
                            </ul>
                        }
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


function mapStateToProps(state) {
    // alert('Header:mapStateToProps:state: '+JSON.stringify(state));
    return {
        auth: state.auth,
        user: state.user
    };
    // return {
    //     initialValues: state,
    // };
//    const auth=state.auth;
//    alert('Header:mapStateToProps:state.auth: '+JSON.stringify(auth));
    // return auth;
}
     
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            BloggerActions,
            push,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header;