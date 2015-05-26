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
            currentlyDisplayedContent: {
                content: '',
                title: '',
                date: '',
                author: '',
                link: 'woof woof'
            }
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
                this.setState({ currentlyDisplayedContent: data.body });
            });
    },

    _createMarkup() {
        return { __html: this.state.currentlyDisplayedContent.content };
    },

    render() {
        let articleTitles = _.map(this.state.articles, (article) => {
            return (
                <div className="row">
                    <span className="app-article-link" onClick={ this._displayArticle.bind(null, article.title) }>{ article.title }</span>
                </div>
            );
        });

        let date = this.state.currentlyDisplayedContent.date ? 'Date: ' + new Date(this.state.currentlyDisplayedContent.date).toString() : null;
        let author = this.state.currentlyDisplayedContent.author ? 'Author: ' + this.state.currentlyDisplayedContent.author : null;

        return (
            <div className="Home container">
                <div className="row">
                    <div className="menu col-md-4">{ articleTitles }</div>
                    <div className="feeds col-md-8">
                        <div className="row">
                            <div className="col-md-12"><h1>{ this.state.currentlyDisplayedContent.title }</h1></div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">{ date }</div>
                            <div className="col-md-6">{ author }</div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" dangerouslySetInnerHTML={ this._createMarkup() } />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<Home />, mainElement);