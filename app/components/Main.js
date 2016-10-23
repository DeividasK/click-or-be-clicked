import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navigation from './Navigation';
import PlayersContainer from '../containers/PlayersContainer';
import styles from '../styles';

require('../main.css');


var Main = React.createClass({
    render: function() {
        return (
            <div className="container" style={ styles.space }>
                <div className="row">
                    <div className="col-sm-12">
                        <Navigation />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-3">
                        <PlayersContainer />
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
            </div>
        )
    }
});

module.exports = Main;