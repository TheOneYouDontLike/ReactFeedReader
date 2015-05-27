'use strict';

import React from 'react';

let AddNewFeedButton = React.createClass({
    _addFeed() {
        let feedAddress = this.refs.feedAddress.getDOMNode().value;

        this.props.addFeedHandler(feedAddress);
    },

    render() {
        return (
            <div className="AddNewFeedButton">
                <div className="input-group">
                    <div className="input-group-btn">
                        <button type="button" className="btn btn-default" onClick={ this._addFeed }>Add feed</button>
                    </div>
                    <input type="text" ref="feedAddress" className="form-control" />
                </div>
            </div>
        );
    }
});

export default AddNewFeedButton;