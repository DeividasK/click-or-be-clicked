import React from 'react';
import { BattleRow } from '../components/BattleRow';
import { BattleBlock } from './BattleBlock';

import { createNewBoard } from '../utils/gameHelpers';
import { PlayerWrapper } from '../components/PlayerWrapper';
import { Counter } from './Counter';

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
            { this.props.blue !== undefined && this.props.blue.name }
        </PlayerWrapper>


        <PlayerWrapper addClass="blue">
          { this.state.blue }
        </PlayerWrapper>

        <PlayerWrapper>
          { this.props.red !== undefined && this.props.red.name }
        </PlayerWrapper>

        <PlayerWrapper addClass="red">
          { this.state.red }
        </PlayerWrapper>

        <Counter count={ this.props.count }/>

        <div className="col-xs-12">
          { this.state.list.map((row) => {
            return (
              <BattleRow key={ row.key }>
                { row.blocks.map((block) => {
                  return ( <BattleBlock
                    userColor={ this.props.userColor }
                    key={ block.key }
                    blockId={ block.key }
                    color={ block.color }
                    gameId={ this.props.gameId }
                    handleClick={ this.props.onClick }
                  /> );
                })}
              </BattleRow>
            )
          })}
        </div>

      </div>
    )
  }
}