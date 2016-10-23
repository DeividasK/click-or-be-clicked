import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navigation from './Navigation';
import Players from './Players';
import styles from '../styles';

require('../main.css');


var Main = React.createClass({
    render: function() {
        return (
            <div className="container" style={ styles.space }>
                <Navigation />
                
                
                <div className="col-sm-3">
                    <Players />
                </div>

                <div className="col-sm-9">
                    <ReactCSSTransitionGroup
                        transitionName="appear"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        
                        {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
                    
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
});

module.exports = Main;