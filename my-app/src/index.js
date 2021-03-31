import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      /> // a function that returns jsx, round paren not necessary
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)} {/* composing with function */}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
} // end board

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        { 
          squares: Array(9).fill(null), 
          xIsNext: true,
        }
      ], // sets every value to a static value
      xIsNext: true,
      currentIdx: 0
    };
  }

  handleClick(i) {
    const squares = this.state.history[this.state.currentIdx].squares.slice(); // copies the array
    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";
    const snap = this.state.history.slice();
    const next = !this.state.xIsNext;
    snap.push({ squares, xIsNext: next });
    this.setState({
      history: snap,
      xIsNext: next,
      currentIdx: this.state.currentIdx + 1
    });
  }

  jumpToStep(idx) {
    console.log('ready to jump to ', idx)
    const newHistory = this.state.history.slice(0, idx + 1)
    console.log('newHistory is ', newHistory)
    this.setState({
      history: newHistory,
      xIsNext: newHistory[idx].xIsNext,
      currentIdx: idx
    })
  }

  renderHistory() {
    return this.state.history.slice().map((_, idx) => {
      return <div className="historyIndex" key={idx} onClick={() => { this.jumpToStep(idx)}}>{idx + 1}</div>;
    });
  }

  render() {
    const winner = calculateWinner(
      this.state.history[this.state.currentIdx].squares
    );
    console.log("winner is ", winner);
    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={i => {
              this.handleClick(i);
            }}
            squares={this.state.history[this.state.currentIdx].squares}
          />
          {/* use component as element */}
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            History
            {this.renderHistory()}
          </ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  console.log("squares inside is ", squares);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let returned = null;
  lines.forEach(line => {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log("winner found", squares[a]);
      returned = squares[a];
    }
  });
  return returned;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
