'use strict';

import React from 'react';

import './article.style.css';

let Article = React.createClass({
    _createMarkup() {
        return { __html: this.props.article.content };
    },

    render: function() {
        let date = this.props.article.date ? 'Date: ' + new Date(this.props.article.date).toString() : null;
        let author = this.props.article.author ? 'Author: ' + this.props.article.author : null;

        return (
            <div className="Article">
                <div>
                    <div><h1>{ this.props.article.title }</h1></div>
                </div>
                <div>
                    <div>{ date }</div>
                    <div>{ author }</div>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={ this._createMarkup() } />
                </div>
            </div>
        );
    }
});

export default Article;