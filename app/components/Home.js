var React = require('react');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Click or BE clicked</h1>
                <p className='lead'>Speed is your friend.</p>
                <Link to='/battle'>
                  Start the battle
                </Link>
            </div>
        )
    }
});

module.exports = Home;