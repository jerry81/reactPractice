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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), // sets every value to a static value
      xIsNext: true
    };
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      /> // a function that returns jsx, round paren not necessary
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice(); // copies the array
    squares[i] = this.state.xIsNext ? "X" : "O";
    const next = !this.state.xIsNext;
    this.setState({
      squares: squares,
      xIsNext: next
    });
  }

  render() {
      const winner = calculateWinner(this.state.squares)
    let status
    if (winner) {
        status = `Winnder ${winner}`
    } else {
        status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board /> {/* use component as element */}
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      lines.forEach((line) => {
          const [a,b,c] = line
          if (squares[a] === squares[b] && squares[b] === squares[c]) {
              return squares[a]
          }
      })
      return null
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
