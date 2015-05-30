'use strict';

import React from 'react';
import _ from 'lodash';

import './app.style.css';
import AddNewFeedButton from './addNewFeedButton';
import FeedAddress from './feedAddress';
import feedsApi from './feedsApi';

let mainElement = document.getElementById('main-container');

let Home = React.createClass({
    getInitialState() {
        return {
            feeds: [],
            displayedArticles: [],
            currentlyDisplayedContent: {}
        };
    },

    componentDidMount() {
        feedsApi.getFeeds((feeds) => this.setState({feeds: feeds}));
    },

    _displayFeedArticles(feedAddress) {
        let matchingFeed = _.find(this.state.feeds, (feed) => {
            return feed.address.indexOf(feedAddress) > -1;
        });

        this.setState({ displayedArticles: matchingFeed.articles });
    },

    _displayArticle(articleTitle) {
        this._resetState();

        feedsApi.getArticle(articleTitle, (article) => {
            this.setState({ currentlyDisplayedContent: article });
        });
    },

    _resetState() {
        this.setState({ displayedArticles: [] });
        this.setState({ currentlyDisplayedContent: {} });
    },

    _createMarkup() {
        return { __html: this.state.currentlyDisplayedContent.content };
    },

    _addFeedHandler(feedAddress) {
        feedsApi.addFeed(feedAddress, () => { alert('feed added'); });
    },

    render() {
        let feedAddresses = _.map(this.state.feeds, (feed) => {
            return <FeedAddress addressClickedHandler={ this._displayFeedArticles} feedAddress={ feed.address } key={ feed.address } />;
        });

        let date = this.state.currentlyDisplayedContent.date ? 'Date: ' + new Date(this.state.currentlyDisplayedContent.date).toString() : null;
        let author = this.state.currentlyDisplayedContent.author ? 'Author: ' + this.state.currentlyDisplayedContent.author : null;

        let singleArticle =
            <div>
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
            </div>;

        let addButton = <AddNewFeedButton addFeedHandler={ this._addFeedHandler } />;

        let artilesTitlesToDisplay = _.map(this.state.displayedArticles, (article) => {
            return <div className="app-article-link" onClick={ this._displayArticle.bind(null, article.title) }> { article.title } </div>;
        });

        let contentToDisplay = artilesTitlesToDisplay.length > 0 ? artilesTitlesToDisplay : singleArticle;

        return (
            <div className="Home container-fluid">
                <div className="row">
                    <div className="menu col-md-4">
                        { feedAddresses }
                        { addButton }
                    </div>
                    <div className="feeds col-md-8">
                        { contentToDisplay }
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<Home />, mainElement);