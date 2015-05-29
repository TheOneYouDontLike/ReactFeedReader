'use strict';

import React from 'react';
import superagent from 'superagent';
import _ from 'lodash';

import './app.style.css';
import AddNewFeedButton from './addNewFeedButton';
import feedsApi from './feedsApi';

let mainElement = document.getElementById('main-container');

let contentType = {
    FEED: 'feed',
    ARTICLE: 'article'
};

let Home = React.createClass({
    getInitialState() {
        return {
            feeds: [],
            displayedArtiles: [],
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

    _displayFeedArticles(feedAddress) {
        console.log(feedAddress);
        console.log(this.state.feeds);
        let articles = _(this.state.feeds)
        .map((feed) => {
            if (feed.address.indexOf(feedAddress) > -1) {
                return feed.articles;
            }
        })
        .first();

        console.log(articles);
        this.setState({ displayedArtiles: articles });
    },

    _displayArticle(articleTitle) {
        feedsApi.getArticle(contentPath, (article) => this.setState({ currentlyDisplayedContent: article }));
    },

    _createMarkup() {
        return { __html: this.state.currentlyDisplayedContent.content };
    },

    _addFeedHandler(feedAddress) {
        feedsApi.addFeed(feedAddress, () => { alert('feed added') });
    },

    render() {
        let feedAddresses = _.map(this.state.feeds, (feed) => {
            return (
                <div>
                    <span className="app-article-link" onClick={ this._displayFeedArticles.bind(null, feed.address) }>{ feed.address }</span>
                </div>
            );
        });

        let date = this.state.currentlyDisplayedContent.date ? 'Date: ' + new Date(this.state.currentlyDisplayedContent.date).toString() : null;
        let author = this.state.currentlyDisplayedContent.author ? 'Author: ' + this.state.currentlyDisplayedContent.author : null;

        let singleArticle = <div>
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

        let artilesTitlesToDisplay = _.map(this.state.displayedArtiles, (article) => {
            return <div className="app-article-link" onClick={ this._displayArticle.bind(null, article.title) }> { article.title } </div>;
        });

        let contentToDisplay = artilesTitlesToDisplay ? artilesTitlesToDisplay : singleArticle;

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