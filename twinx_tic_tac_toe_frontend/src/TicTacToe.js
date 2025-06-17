import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * Main Container for TwinX Tic Tac Toe game.
   * Features: 3x3 grid, click to play, game status/winner display, color theme
   * Colors: primary: #4CAF50, secondary: #FFC107, accent: #2196F3, light theme
   */

  // Game state: holds board array, turn, winner, and status
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const PLAYER_X = "X";
  const PLAYER_O = "O";

  // Checks if someone has won or the board is full
  function checkForWinner(board) {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diags
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    // No winner
    return null;
  }

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    // ignore if game over or cell filled
    if (winner || board[idx]) return;

    const updatedBoard = board.slice();
    updatedBoard[idx] = isXNext ? PLAYER_X : PLAYER_O;
    setBoard(updatedBoard);

    const maybeWinner = checkForWinner(updatedBoard);
    if (maybeWinner) {
      setWinner(maybeWinner);
      setIsDraw(false);
    } else if (updatedBoard.every(cell => cell)) {
      setIsDraw(true);
      setWinner(null);
    } else {
      setIsXNext(!isXNext);
    }
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  }

  // Build status message
  let status;
  if (winner) {
    status = `Winner: ${winner === PLAYER_X ? "Player 1 (X)" : "Player 2 (O)"}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status =
      `Next Turn: ${isXNext ? "Player 1 (X)" : "Player 2 (O)"}`;
  }

  // Color theme
  const colors = {
    primary: "#4CAF50",
    secondary: "#FFC107",
    accent: "#2196F3",
    lightBG: "#f8f9fa"
  };

  // Styles
  const styles = {
    container: {
      maxWidth: 370,
      margin: "36px auto",
      padding: 24,
      background: colors.lightBG,
      borderRadius: 16,
      boxShadow: "0 4px 28px rgba(36,59,99,0.10)",
      textAlign: "center"
    },
    heading: {
      color: colors.primary,
      fontWeight: 600,
      fontSize: "2.1rem",
      letterSpacing: "0.01em"
    },
    status: {
      fontWeight: 500,
      fontSize: "1.25rem",
      margin: "14px 0 18px",
      color: winner
        ? colors.primary
        : isDraw
        ? colors.accent
        : colors.accent
    },
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 72px)",
      gridTemplateRows: "repeat(3, 72px)",
      gap: 6,
      margin: "18px 0 22px"
    },
    square: {
      width: 72,
      height: 72,
      fontSize: "2.3rem",
      fontWeight: "700",
      color: colors.primary,
      background: "#fff",
      border: `2.4px solid ${colors.primary}`,
      borderRadius: 9,
      cursor: "pointer",
      transition: "background 0.15s"
    },
    squareO: {
      color: colors.secondary,
      borderColor: colors.secondary
    },
    disabledSquare: {
      cursor: "default",
      opacity: 0.70
    },
    restartBtn: {
      background: colors.primary,
      color: "#fff",
      padding: "11px 28px",
      border: "none",
      borderRadius: 7,
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 2px 8px #bdecd196",
      marginTop: 6,
      transition: "background 0.18s"
    }
  };

  // Renders the 3x3 board
  function renderBoard() {
    return (
      <div style={styles.board} aria-label="tic-tac-toe-board" tabIndex={0}>
        {board.map((cell, idx) => {
          // Dynamic style for X or O
          const isO = cell === PLAYER_O;
          let squareStyle = {
            ...styles.square,
            ...(isO ? styles.squareO : {}),
            ...(board[idx] || winner || isDraw ? styles.disabledSquare : {})
          };
          return (
            <button
              key={idx}
              style={squareStyle}
              aria-label={`Cell ${idx+1} ${cell ? cell : "empty"}`}
              // Only allow click if not filled & no winner/draw
              onClick={() => handleSquareClick(idx)}
              disabled={!!board[idx] || !!winner || !!isDraw}
            >
              {cell}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section style={styles.container}>
      <header>
        <div style={styles.heading}>TwinX Tic Tac Toe</div>
      </header>
      <div style={styles.status}>{status}</div>
      {renderBoard()}
      {(winner || isDraw) && (
        <button style={styles.restartBtn} onClick={handleRestart} aria-label="Restart Game">
          Restart Game
        </button>
      )}
      <footer style={{ marginTop: 32, fontSize: "0.97rem", color: "#666" }}>
        <span style={{ color: colors.primary }}>Player 1</span>: X &ensp; | &ensp;
        <span style={{ color: colors.secondary }}>Player 2</span>: O
      </footer>
    </section>
  );
}

export default TicTacToe;

