// ========================================
// GAMEBOARD MODULE (IIFE - Single Instance)
// ========================================
const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    
    const getBoard = () => board;
    
    const setCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }
        return false;
    };
    
    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };
    
    const isFull = () => {
        return board.every(cell => cell !== '');
    };
    
    return { getBoard, setCell, reset, isFull };
})();

// ========================================
// PLAYER FACTORY
// ========================================
const Player = (name, marker) => {
    return { name, marker };
};

// ========================================
// GAME CONTROLLER MODULE (IIFE - Single Instance)
// ========================================
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;
    
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal \
        [2, 4, 6]  // Diagonal /
    ];
    
    const startGame = (player1Name, player2Name) => {
        players = [
            Player(player1Name, 'X'),
            Player(player2Name, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.reset();
    };
    
    const getCurrentPlayer = () => players[currentPlayerIndex];
    
    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };
    
    const checkWinner = () => {
        const board = Gameboard.getBoard();
        
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: getCurrentPlayer(), combination };
            }
        }
        return null;
    };
    
    const playRound = (cellIndex) => {
        if (gameOver) return null;
        
        const currentPlayer = getCurrentPlayer();
        
        // Try to place marker
        if (!Gameboard.setCell(cellIndex, currentPlayer.marker)) {
            return null; // Cell already taken
        }
        
        // Check for winner
        const result = checkWinner();
        if (result) {
            gameOver = true;
            return { type: 'win', winner: result.winner, combination: result.combination };
        }
        
        // Check for tie
        if (Gameboard.isFull()) {
            gameOver = true;
            return { type: 'tie' };
        }
        
        // Switch to next player
        switchPlayer();
        return { type: 'continue' };
    };
    
    const isGameOver = () => gameOver;
    
    return { 
        startGame, 
        getCurrentPlayer, 
        playRound, 
        isGameOver 
    };
})();

// ========================================
// DISPLAY CONTROLLER MODULE (IIFE - Single Instance)
// ========================================
const DisplayController = (() => {
    const setupScreen = document.getElementById('setupScreen');
    const gameScreen = document.getElementById('gameScreen');
    const gameboardDiv = document.getElementById('gameboard');
    const turnDisplay = document.getElementById('turnDisplay');
    const gameResult = document.getElementById('gameResult');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    const init = () => {
        startBtn.addEventListener('click', startGame);
        restartBtn.addEventListener('click', restartGame);
    };
    
    const startGame = () => {
        const player1Name = player1Input.value.trim() || 'Player 1';
        const player2Name = player2Input.value.trim() || 'Player 2';
        
        GameController.startGame(player1Name, player2Name);
        
        setupScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        renderBoard();
        updateTurnDisplay();
    };
    
    const restartGame = () => {
        gameScreen.classList.add('hidden');
        setupScreen.classList.remove('hidden');
        gameResult.classList.add('hidden');
    };
    
    const renderBoard = () => {
        gameboardDiv.innerHTML = '';
        const board = Gameboard.getBoard();
        
        board.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.index = index;
            cellDiv.textContent = cell;
            
            if (cell !== '') {
                cellDiv.classList.add('taken');
                cellDiv.classList.add(cell.toLowerCase());
            }
            
            cellDiv.addEventListener('click', handleCellClick);
            gameboardDiv.appendChild(cellDiv);
        });
    };
    
    const handleCellClick = (e) => {
        if (GameController.isGameOver()) return;
        
        const cellIndex = parseInt(e.target.dataset.index);
        const result = GameController.playRound(cellIndex);
        
        if (!result) return; // Cell was taken
        
        renderBoard();
        
        if (result.type === 'win') {
            displayWinner(result.winner, result.combination);
        } else if (result.type === 'tie') {
            displayTie();
        } else {
            updateTurnDisplay();
        }
    };
    
    const updateTurnDisplay = () => {
        const currentPlayer = GameController.getCurrentPlayer();
        turnDisplay.textContent = `${currentPlayer.name}'s turn (${currentPlayer.marker})`;
    };
    
    const displayWinner = (winner, combination) => {
        gameResult.textContent = `🎉 ${winner.name} wins!`;
        gameResult.classList.remove('hidden', 'tie');
        gameResult.classList.add('win');
        
        // Highlight winning cells
        const cells = document.querySelectorAll('.cell');
        combination.forEach(index => {
            cells[index].classList.add('winning');
        });
        
        turnDisplay.textContent = 'Game Over!';
    };
    
    const displayTie = () => {
        gameResult.textContent = "It's a tie! 🤝";
        gameResult.classList.remove('hidden', 'win');
        gameResult.classList.add('tie');
        turnDisplay.textContent = 'Game Over!';
    };
    
    return { init };
})();

// ========================================
// INITIALIZE THE GAME
// ========================================
DisplayController.init();