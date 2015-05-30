'use strict';

import React from 'react';

let ArticleTitle = React.createClass({
    _titleClicked() {
        this.props.titleClickedHandler(this.props.articleTitle);
    },

    render: function() {
        return (
            <div className="ArticleTitle app-article-link" onClick={ this._titleClicked }> { this.props.articleTitle } </div>
        );
    }
});

export default ArticleTitle;