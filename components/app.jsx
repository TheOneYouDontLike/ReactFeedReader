'use strict';

import React from 'react';
import superagent from 'superagent';
import _ from 'lodash';

import './app.style.css';
import AddNewFeedButton from './addNewFeedButton';
import feedsApi from './feedsApi';

let mainElement = document.getElementById('main-container');

let Home = React.createClass({
    getInitialState() {
        return {
            feeds: [],
            currentlyDisplayedContent: {
                content: '',
                title: '',
                date: '',
                author: '',
                link: ''
            }
        };
    },

    componentDidMount() {
        feedsApi.getFeeds((feeds) => this.setState({feeds: feeds}));
    },

    _displayArticle(articleTitle) {
        feedsApi.getArticle(articleTitle, (article) => this.setState({ currentlyDisplayedContent: article }));
    },

    _createMarkup() {
        return { __html: this.state.currentlyDisplayedContent.content };
    },

    _addFeedHandler(feedAddress) {
        feedsApi.addFeed(feedAddress, () => { alert('feed added') });
    },

    render() {
        let articleTitles = _.map(this.state.feeds, (article) => {
            return (
                <div>
                    <span className="app-article-link" onClick={ this._displayArticle.bind(null, article.title) }>{ article.title }</span>
                </div>
            );
        });

        let date = this.state.currentlyDisplayedContent.date ? 'Date: ' + new Date(this.state.currentlyDisplayedContent.date).toString() : null;
        let author = this.state.currentlyDisplayedContent.author ? 'Author: ' + this.state.currentlyDisplayedContent.author : null;

        let addButton = <AddNewFeedButton addFeedHandler={ this._addFeedHandler } />;

        return (
            <div className="Home container-fluid">
                <div className="row">
                    <div className="menu col-md-4">
                        { articleTitles }
                        { addButton }
                    </div>
                    <div className="feeds col-md-8">
                        <div>
                            <div><h1>{ this.state.currentlyDisplayedContent.title }</h1></div>
                        </div>
                        <div>
                            <div>{ date }</div>
                            <div>{ author }</div>
                        </div>
                        <div>
                            <div dangerouslySetInnerHTML={ this._createMarkup() } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<Home />, mainElement);