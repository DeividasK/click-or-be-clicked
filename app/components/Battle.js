import React from 'react';
import BattleRow from '../components/BattleRow';
import { createNewBoard } from '../utils/gameHelpers';

export default class Battle extends React.Component {
  constructor (props) {
    super();
    this.state = createNewBoard(props.board);
  }

  componentWillReceiveProps (props) {
    this.setState(createNewBoard(props.board));
  }

  render () {
    return (
      <div id="battleContainer">

        <div className="col-xs-6">
          { this.props.blue }<br />Blue player<br />{ this.state.blue }
        </div>
        <div className="col-xs-6">
          { this.props.red }<br />Red player<br />{ this.state.red }
        </div>

        <div className="col-xs-12">
          { this.state.list.map((row) => { return <BattleRow userColor={ this.props.userColor } blocks={ row.blocks } key={ row.key } gameId={ this.props.gameId }/> })}
        </div>

      </div>
    )
  }
}