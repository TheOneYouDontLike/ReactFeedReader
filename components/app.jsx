'use strict';

import React from 'react';
import superagent from 'superagent';
import _ from 'lodash';

let mainElement = document.getElementById('main-container');

let Home = React.createClass({
    getInitialState() {
        return {
            articles: []
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

    render() {
        let articleTitles = _.map(this.state.articles, (article) => {
            return (
                <div className="row">{ article.title }</div>
            );
        });

        return (
            <div className="Home container-fluid">
                { articleTitles }
            </div>
        );
    }
});

React.render(<Home />, mainElement);