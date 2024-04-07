import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function getWinner(gameBoard, players) {
  let winner;

  WINNING_COMBINATIONS.forEach(comb => {
    const firstSymbol = gameBoard[comb[0].row][comb[0].column];
    const secondSymbol = gameBoard[comb[1].row][comb[1].column];
    const thirdSymbol = gameBoard[comb[2].row][comb[2].column];

    if (firstSymbol
      && firstSymbol === secondSymbol
      && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol];
    }
  });
  return winner;
}

function getGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(inner => [...inner])];

  for (const board of gameTurn) {
    const { square, player } = board;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const PLAYERS = {
  'X': "Player 1",
  'O': "Player 2"
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  let activePlayer = deriveActivePlayer(gameTurn);
  let hasDraw;

  function onSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevGameTurn) => {
      activePlayer = deriveActivePlayer(prevGameTurn);

      const updatedGameTurn = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevGameTurn]
      return updatedGameTurn;
    })
  }

  function handleRematch(){
    setGameTurn([]);
  }
  
  let gameBoard = getGameBoard(gameTurn);  
  let winner = getWinner(gameBoard, players);

  function handlePlayerName(symbol, name){
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: name
      }
    })
  }

  hasDraw = gameTurn.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerName}
          />

          <Player
            name="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver 
            winner={winner} 
            rematch={handleRematch}
          />
        )}
        <GameBoard 
          onSelectSquare={onSelectSquare} 
          board={gameBoard}
         />

      </div>
      <Log gameTurn={gameTurn} />
    </main>
  )
}

export default App


