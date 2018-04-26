import React from 'react';

let CollapsiblePreview = props => {

    const { blogId, blogContent } = props;


    const hrefForCollapsiblePanel = "#"+blogId;
    const collapsiblePanelId = blogId;

    return (
        <div className="panel-group">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                    <a data-toggle="collapse" href={hrefForCollapsiblePanel}><h4>Preview as Markup</h4></a>
                    </h4>
                </div>
                <div id={collapsiblePanelId} className="panel-collapse collapse">

                    <div id={blogId} className="panel-body"><div id={blogId} dangerouslySetInnerHTML={createMarkup(blogContent)} /></div>
                    <div className="panel-footer">
                    </div>
                </div>
            </div>
        </div>
    );


    function createMarkup(blogContent) {
        return {__html: blogContent};
    };

};

export default CollapsiblePreview;