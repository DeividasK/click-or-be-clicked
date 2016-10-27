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
          Blue<br />{ this.state.blue }
        </div>
        <div className="col-xs-6">
          Red<br />{ this.state.red }
        </div>

        <div className="col-xs-12">
          { this.state.list.map((row) => { return <BattleRow blocks={ row.blocks } key={ row.key } gameId={ this.props.gameId }/> })}
        </div>

      </div>
    )
  }
}