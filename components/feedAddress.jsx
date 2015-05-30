'use strict';

import React from 'react';

let FeedAddress = React.createClass({
    _addressClicked() {
        this.props.addressClickedHandler(this.props.feedAddress);
    },

    render() {
        return (
            <div className="app-article-link" onClick={ this._addressClicked }>{ this.props.feedAddress }</div>
        );
    }
});

export default FeedAddress;