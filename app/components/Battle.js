import React from 'react';
import BattleRow from '../components/BattleRow';
import { createNewBoard } from '../utils/gameHelpers';
import { PlayerWrapper } from '../components/PlayerWrapper';

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

        <PlayerWrapper>
            { this.props.blue !== undefined && this.props.blue.name }<br /> <br />Blue player
        </PlayerWrapper>


        <PlayerWrapper addClass="blue">
          { this.state.blue }
        </PlayerWrapper>

        <PlayerWrapper>
          { this.props.red !== undefined && this.props.red.name }<br /> <br />Red player
        </PlayerWrapper>
        
        <PlayerWrapper addClass="red">
          { this.state.red }
        </PlayerWrapper>

        <div className="col-xs-12">
          { this.state.list.map((row) => { return <BattleRow userColor={ this.props.userColor } blocks={ row.blocks } key={ row.key } gameId={ this.props.gameId }/> })}
        </div>

      </div>
    )
  }
}