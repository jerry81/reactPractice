import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component { // React class component - react has many components
    constructor(props) {
        super(props)
        this.state = { // how bind state to props
            value: null,
        }
    }

    render() { // render function 
        return ( // jsx
            <button
                className="square"
                onClick={() => { this.setState({ value: 'X' }) }}>   {/* comments in jsx - curly brackets with slash star - className - specifies css class, setState method from React.Component */}
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          squares: Array(9).fill(null) // sets every value to a static value
      }
    }

    renderSquare(i) {
        return <Square value={i} />; // a function that returns jsx, round paren not necessary
    }

    render() {
        const status = 'Next player: X';

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
                    <Board />  {/* use component as element */}
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

