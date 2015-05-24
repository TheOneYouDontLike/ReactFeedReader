'use strict';

import React from 'react';
import superagent from 'superagent';
import _ from 'lodash';

import './app.style.css';

let mainElement = document.getElementById('main-container');

let Home = React.createClass({
    getInitialState() {
        return {
            articles: [],
            currentlyDisplayedArticle: {}
        };
    },

    componentDidMount() {
        superagent
            .get('/feeds')
            .accept('application/json')
            .end((error, data) => {
                this.setState({articles: data.body});
            });
    },

    _displayArticle(articleTitle) {
        superagent
            .get('/article/' + articleTitle)
            .accept('application/json')
            .end((error, data) => {
                this.setState({ currentlyDisplayedArticle: data.body });
            });
    },

    _createMarkup() {
        return { __html: this.state.currentlyDisplayedArticle.content };
    },

    render() {
        let articleTitles = _.map(this.state.articles, (article) => {
            return (
                <div className="row">
                    <span className="app-article-link" onClick={ this._displayArticle.bind(null, article.title) }>{ article.title }</span>
                </div>
            );
        });

        return (
            <div className="Home container">
                <div className="row">
                    <div className="menu col-md-4">{ articleTitles }</div>
                    <div className="feeds col-md-8">
                        <div dangerouslySetInnerHTML={ this._createMarkup() } />
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<Home />, mainElement);