import React from 'react'
import { connect } from 'react-redux'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import firebaseHelpers from '../utils/firebaseHelpers'
import Navigation from './Navigation'
import PlayersContainer from '../containers/PlayersContainer'
import styles from '../styles'
require('../main.css')
import { authenticateUser } from '../actions/userActions'

@connect((store) => {
    return {
        user: store.user
    };
})

export default class Main extends React.Component {
    
    componentWillMount () {
        authenticateUser();
    }
    
    render () {
        console.log(this.props.user);
        return (
            <div className="container-fluid padding-top">
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
}