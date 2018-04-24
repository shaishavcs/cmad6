import React from 'react';
import Redirect from 'react-router-dom';

class Logout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // make the server call  and logout and go to main page.
    }

    render() {
        return (<Redirect to='/'/>)

            // <div>
            //     <li><a href="#" onClick={this.logoutSelected}>Logout</a></li>
            // </div>
            
            // <div id="signupDivId" className="col-sm-12 col-lg-12 col-xs-12 col-md-12">
            //     <form className="content" action="/">
            //         <div className="container">
            //             <h4>You have been logged out successuflly! </h4>
            //             <hr/>
            //             <h3>Click the Home button to view latest blogs...!</h3>
            //         </div>
            //     </form>
            //     <Redirect to="/" />
            // </div>
    };
}
export default Logout;