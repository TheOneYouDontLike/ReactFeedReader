'use strict';

var React = require('react');

var mainElement = document.getElementById('main-container');

var Home = React.createClass({
    render() {
        return (
            <div className="Home">It's working</div>
        );
    }
});

React.render(<Home />, mainElement);