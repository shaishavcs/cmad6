import React from 'react';
import Blog from './Blog.js';

class BloggerHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<div className="col-lg-9">
                <div className="col-lg-2">
                <h4><small>Title</small></h4>
                </div>
                <div className="col-lg-7">
                <input className='Field'><small>Title</small></input>
                </div>
	            <div id="blogListDivId">
                    {this.props.initialValues ?
                        <div className="col-sm-9">
                            {Object.keys(this.props.initialValues).map((blog, key) => (
                                <Blog key={key} blog={this.props.initialValues[key]} />
                            ))}
                        </div>
                        : 
                        <div className="col-sm-9">
                            <label>No blogs to list</label>
                        </div>
                    }
                </div>
            </div>
        );
    }
};
