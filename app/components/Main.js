import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navigation from './Navigation';
import PlayersContainer from '../containers/PlayersContainer';
import styles from '../styles';

require('../main.css');


var Main = React.createClass({
    render: function() {
        return (
            <div className="container-fluid" style={ styles.space }>
                <div className="row">
                    <div className="col-sm-12">
                        <Navigation />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-9 col-sm-push-3">
                        <ReactCSSTransitionGroup
                            transitionName="appear"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}>
                            
                            {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
                        
                        </ReactCSSTransitionGroup>
                    </div>
                    <div className="col-sm-3 col-sm-pull-9">
                        <PlayersContainer />
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Main;