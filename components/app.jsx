'use strict';

import React from 'react';

let mainElement = document.getElementById('main-container');

let Home = React.createClass({
    render() {
        return (
            <div className="Home">It's working</div>
        );
    }
});

React.render(<Home />, mainElement);