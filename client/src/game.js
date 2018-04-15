import React, { Component, PureComponent } from "react";
import * as Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
const Suits = ["diamonds", "clubs", "spades", "hearts"];
const Ranks = [
  "A",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {
        diamonds: [],
        clubs: [],
        spades: [],
        hearts: []
      },
      shuffled: []
    };
  }

  componentwillMount() {
    var shuffle = [];

    Suits.map(suit => {
      shuffle.push(
        Ranks.map(rank => {
          return { rank, suit };
        })
      );
    });
    this.setState({ shuffled: shuffle });
    console.log(shuffle);
  }

  render() {
    const { shuffled } = this.state;
    return (
      <div className="game-body">
        <div className="foundation">
          {Suits.map(value => {
            return <Foundation suits={value} deck={this.state.deck[value]} />;
          })}
        </div>
        <div className="table">
          {shuffled.map(card => {
            return <Card suit={card.suit} rank={card.rank} />;
          })}
        </div>
      </div>
    );
  }
}
// Implement DropZone For CardHolders
class Foundation extends PureComponent {
  render() {
    return (
      <Dropzone onDrop={this._onDrop} size={150}>
        <div>Drop some files here!</div>
      </Dropzone>
    );
  }
}

const canDrop = (props, target) => {
  return props.suit === target.suit;
};

Foundation.propTypes = {
  suit: "",
  cards: [],
  topCard: {}
};

const cardSource = {
  beginDrag(props) {
    return {
      suit: props.suit,
      rank: props.rank
    };
  }
};
// Implement Drag Source for card with rank and suit
class Card extends Component {
  static propTypes = {
    rank: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,

    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { isDragging, connectDragSource, suit, rank } = this.props;
    return connectDragSource(
      <div className={`card${suit}`} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {rank}
      </div>
    );
  }
}

export default Game;
