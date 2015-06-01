'use strict';

import React from 'react';
import _ from 'lodash';

import './app.style.css';
import AddNewFeedButton from './addNewFeedButton';
import FeedAddress from './feedAddress';
import Article from './article';
import ArticleTitle from './articleTitle';
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

    _addFeedHandler(feedAddress) {
        feedsApi.addFeed(feedAddress, () => { alert('feed added'); });
    },

    render() {
        let feedAddresses = _.map(this.state.feeds, (feed) => {
            return <FeedAddress addressClickedHandler={ this._displayFeedArticles} feedAddress={ feed.address } key={ feed.address } />;
        }, this);

        let addButton = <AddNewFeedButton addFeedHandler={ this._addFeedHandler } />;

        let articlesTitlesToDisplay = _.map(this.state.displayedArticles, (article) => {
            return <ArticleTitle titleClickedHandler={ this._displayArticle } articleTitle={ article.title } key={ article.title } />;
        }, this);

        let singleArticle = <Article article={ this.state.currentlyDisplayedContent } />;

        let contentToDisplay = articlesTitlesToDisplay.length > 0 ? articlesTitlesToDisplay : singleArticle;

        return (
            <div className="Home container-fluid">
                <div className="row">
                    <div className="menu col-md-4">
                        { addButton }
                        <div className="feed-addresses">
                            { feedAddresses }
                        </div>
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