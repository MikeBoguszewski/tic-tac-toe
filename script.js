const Player = (sign, name) => {
    return { sign, name }
}

const gameController = (function () {
    const player1 = Player('X', 'Player 1')
    const player2 = Player('O', 'Player 2')

    const switchPlayer = function (currentPlayer) {
        if (currentPlayer === player1) {
            currentPlayer = player2
        } else {
            currentPlayer = player1
        }
        return currentPlayer
    }

    const checkGameOver = function (currentPlayer, _board, gameOver, tie) {
        const isMarked = function (currentValue) {
            return currentValue !== null
        }
        if (currentPlayer === player1) {
            if (_board[0] === 'X' && _board[1] === 'X' && _board[2] === 'X') {
                gameOver = true
            } else if (_board[3] === 'X' && _board[4] === 'X' && _board[5] === 'X') {
                gameOver = true
            } else if (_board[6] === 'X' && _board[7] === 'X' && _board[8] === 'X') {
                gameOver = true
            } else if (_board[0] === 'X' && _board[3] === 'X' && _board[6] === 'X') {
                gameOver = true
            } else if (_board[1] === 'X' && _board[4] === 'X' && _board[7] === 'X') {
                gameOver = true
            } else if (_board[2] === 'X' && _board[5] === 'X' && _board[8] === 'X') {
                gameOver = true
            } else if (_board[0] === 'X' && _board[4] === 'X' && _board[8] === 'X') {
                gameOver = true
            } else if (_board[2] === 'X' && _board[4] === 'X' && _board[6] === 'X') {
                gameOver = true
            } else if (_board.every(isMarked)) {
                gameOver = true
                tie = true
            }
        }
        if (currentPlayer === player2) {
            if (_board[0] === 'O' && _board[1] === 'O' && _board[2] === 'O') {
                gameOver = true
            } else if (_board[3] === 'O' && _board[4] === 'O' && _board[5] === 'O') {
                gameOver = true
            } else if (_board[6] === 'O' && _board[7] === 'O' && _board[8] === 'O') {
                gameOver = true
            } else if (_board[0] === 'O' && _board[3] === 'O' && _board[6] === 'O') {
                gameOver = true
            } else if (_board[1] === 'O' && _board[4] === 'O' && _board[7] === 'O') {
                gameOver = true
            } else if (_board[2] === 'O' && _board[5] === 'O' && _board[8] === 'O') {
                gameOver = true
            } else if (_board[0] === 'O' && _board[4] === 'O' && _board[8] === 'O') {
                gameOver = true
            } else if (_board[2] === 'O' && _board[4] === 'O' && _board[6] === 'O') {
                gameOver = true
            } else if (_board.every(isMarked)) {
                gameOver = true
                tie = true
            }
        }
        return {gameOver, tie}
    }

    const displayResults = function (gameOver, tie, currentPlayer) {
        if (gameOver === true && tie === false) {
            const results = document.querySelector('.results')
            results.textContent = `Congratulations, ${currentPlayer.name} wins!`
        }  else if (tie === true) {
            const results = document.querySelector('.results')
            results.textContent = 'It\'s a draw!'
        }
        
        if (gameOver === false) {
            const results = document.querySelector('.results')
            results.textContent = ''
        }
    }

    return {player1, player2, switchPlayer, checkGameOver, displayResults}
})()

const gameBoard = (function () {
    let _board = [null, null, null, null, null, null, null, null, null]
    let _boxes = document.querySelectorAll('.box')
    let currentPlayer = gameController.player1
    let gameOver = false
    let tie = false
    const restartButton = document.querySelector('.restart-button')
    const updateBoard = function () {
        _board.forEach((sign, index) => {
            if (sign === 'X' || sign === 'O') {
                _boxes[index].textContent = sign
            } else if (sign === null) {
                _boxes[index].textContent = ''
            } else return
        })
    }

    const markBox = function (index, _board) {
        if (_board[index] === null) {
            _board[index] = currentPlayer.sign
        } else {
            return
        }
    }

    const restart = function () {
        gameOver = false
        tie = false
        _board = [null, null, null, null, null, null, null, null, null]
        console.log(_board)
        updateBoard()
        console.log('restarting')
    }

    const markPlayerTurn = function () {
        const playerHeader1 = document.querySelector('[data-player="1"]')
        const playerHeader2 = document.querySelector('[data-player="2"]')
        if (currentPlayer === gameController.player1) {
            playerHeader1.classList.add('active')
            playerHeader2.classList.remove('active')
        } else if (currentPlayer === gameController.player2) {
            playerHeader2.classList.add('active')
            playerHeader1.classList.remove('active')
        } 
    }

    _boxes.forEach(box => {
        box.addEventListener('click', (event) => {
            let index = event.target.dataset.index
            if (gameOver === false) {
                markBox(index, _board)
                updateBoard()
                gameOver = gameController.checkGameOver(currentPlayer, _board, gameOver, tie)
                tie = gameOver.tie
                gameOver = gameOver.gameOver
                gameController.displayResults(gameOver, tie, currentPlayer)
                currentPlayer = gameController.switchPlayer(currentPlayer)
                markPlayerTurn()
            }
            
        })
    });

    restartButton.addEventListener('click', restart)

    return {
        updateBoard
    }
}
)()





gameBoard.updateBoard()
