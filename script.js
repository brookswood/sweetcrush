class SweetCrushGame {
    constructor() {
        this.boardSize = 8;
        this.candyTypes = ['🍭', '🍬', '🧁', '🍪', '🍩', '🍰'];
        this.candyColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        this.board = [];
        this.selectedCandy = null;
        this.score = 0;
        this.level = 1;
        this.moves = 30;
        this.targetScore = 1000;
        this.isAnimating = false;
        this.powerUps = {
            bomb: 3,
            rainbow: 2,
            shuffle: 1
        };
        
        this.initializeGame();
        this.bindEvents();
    }

    initializeGame() {
        this.createBoard();
        this.generateBoard();
        this.updateUI();
    }

    createBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            const candy = document.createElement('div');
            candy.className = 'candy';
            candy.dataset.index = i;
            gameBoard.appendChild(candy);
        }
    }

    generateBoard() {
        this.board = [];
        
        // Generate random board ensuring no initial matches
        for (let i = 0; i < this.boardSize * this.boardSize; i++) {
            let candyType;
            let attempts = 0;
            
            do {
                candyType = Math.floor(Math.random() * this.candyTypes.length);
                attempts++;
            } while (this.wouldCreateMatch(i, candyType) && attempts < 50);
            
            this.board[i] = candyType;
        }
        
        this.renderBoard();
    }

    wouldCreateMatch(index, candyType) {
        const row = Math.floor(index / this.boardSize);
        const col = index % this.boardSize;
        
        // Check horizontal match
        if (col >= 2) {
            if (this.board[index - 1] === candyType && this.board[index - 2] === candyType) {
                return true;
            }
        }
        
        // Check vertical match
        if (row >= 2) {
            if (this.board[index - this.boardSize] === candyType && 
                this.board[index - this.boardSize * 2] === candyType) {
                return true;
            }
        }
        
        return false;
    }

    renderBoard() {
        const candyElements = document.querySelectorAll('.candy');
        
        candyElements.forEach((element, index) => {
            const candyType = this.board[index];
            element.textContent = this.candyTypes[candyType];
            element.className = `candy ${this.candyColors[candyType]}`;
            element.dataset.index = index;
        });
    }

    bindEvents() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.addEventListener('click', this.handleCandyClick.bind(this));
        
        // Power-up buttons
        document.querySelectorAll('.power-up').forEach(button => {
            button.addEventListener('click', this.handlePowerUpClick.bind(this));
        });
        
        // Modal buttons
        document.getElementById('nextLevelBtn').addEventListener('click', this.nextLevel.bind(this));
        document.getElementById('restartBtn').addEventListener('click', this.restartGame.bind(this));
    }

    handleCandyClick(event) {
        if (this.isAnimating || this.moves <= 0) return;
        
        const candyElement = event.target.closest('.candy');
        if (!candyElement) return;
        
        const index = parseInt(candyElement.dataset.index);
        
        if (!this.selectedCandy) {
            this.selectCandy(index);
        } else if (this.selectedCandy === index) {
            this.deselectCandy();
        } else if (this.areAdjacent(this.selectedCandy, index)) {
            this.swapCandies(this.selectedCandy, index);
        } else {
            this.deselectCandy();
            this.selectCandy(index);
        }
    }

    selectCandy(index) {
        this.selectedCandy = index;
        document.querySelector(`[data-index="${index}"]`).classList.add('selected');
    }

    deselectCandy() {
        if (this.selectedCandy !== null) {
            document.querySelector(`[data-index="${this.selectedCandy}"]`).classList.remove('selected');
            this.selectedCandy = null;
        }
    }

    areAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / this.boardSize);
        const col1 = index1 % this.boardSize;
        const row2 = Math.floor(index2 / this.boardSize);
        const col2 = index2 % this.boardSize;
        
        const rowDiff = Math.abs(row1 - row2);
        const colDiff = Math.abs(col1 - col2);
        
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }

    async swapCandies(index1, index2) {
        this.isAnimating = true;
        
        // Swap in board array
        [this.board[index1], this.board[index2]] = [this.board[index2], this.board[index1]];
        
        // Animate swap
        await this.animateSwap(index1, index2);
        
        // Check for matches
        const matches = this.findMatches();
        
        if (matches.length > 0) {
            this.moves--;
            this.updateUI();
            await this.processMatches(matches);
            this.deselectCandy();
        } else {
            // Swap back if no matches
            [this.board[index1], this.board[index2]] = [this.board[index2], this.board[index1]];
            await this.animateSwap(index1, index2);
            this.deselectCandy();
        }
        
        this.isAnimating = false;
        this.checkGameState();
    }

    async animateSwap(index1, index2) {
        const element1 = document.querySelector(`[data-index="${index1}"]`);
        const element2 = document.querySelector(`[data-index="${index2}"]`);
        
        const temp1 = {
            text: element1.textContent,
            className: element1.className
        };
        
        element1.style.transform = 'scale(0.8)';
        element2.style.transform = 'scale(0.8)';
        
        await this.delay(150);
        
        element1.textContent = element2.textContent;
        element1.className = element2.className;
        element2.textContent = temp1.text;
        element2.className = temp1.className;
        
        element1.style.transform = '';
        element2.style.transform = '';
        
        await this.delay(150);
    }

    findMatches() {
        const matches = new Set();
        
        // Check horizontal matches
        for (let row = 0; row < this.boardSize; row++) {
            let count = 1;
            let currentType = this.board[row * this.boardSize];
            
            for (let col = 1; col < this.boardSize; col++) {
                const index = row * this.boardSize + col;
                
                if (this.board[index] === currentType) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let i = col - count; i < col; i++) {
                            matches.add(row * this.boardSize + i);
                        }
                    }
                    count = 1;
                    currentType = this.board[index];
                }
            }
            
            if (count >= 3) {
                for (let i = this.boardSize - count; i < this.boardSize; i++) {
                    matches.add(row * this.boardSize + i);
                }
            }
        }
        
        // Check vertical matches
        for (let col = 0; col < this.boardSize; col++) {
            let count = 1;
            let currentType = this.board[col];
            
            for (let row = 1; row < this.boardSize; row++) {
                const index = row * this.boardSize + col;
                
                if (this.board[index] === currentType) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let i = row - count; i < row; i++) {
                            matches.add(i * this.boardSize + col);
                        }
                    }
                    count = 1;
                    currentType = this.board[index];
                }
            }
            
            if (count >= 3) {
                for (let i = this.boardSize - count; i < this.boardSize; i++) {
                    matches.add(i * this.boardSize + col);
                }
            }
        }
        
        return Array.from(matches);
    }

    async processMatches(matches) {
        // Animate matched candies
        await this.animateMatches(matches);
        
        // Add to score
        const baseScore = matches.length * 10;
        const multiplier = Math.max(1, Math.floor(matches.length / 3));
        this.score += baseScore * multiplier;
        
        // Create particles
        this.createParticles(matches);
        
        // Remove matched candies
        matches.forEach(index => {
            this.board[index] = null;
        });
        
        // Drop candies
        await this.dropCandies();
        
        // Fill empty spaces
        this.fillEmptySpaces();
        
        // Check for new matches
        const newMatches = this.findMatches();
        if (newMatches.length > 0) {
            await this.processMatches(newMatches);
        }
    }

    async animateMatches(matches) {
        matches.forEach(index => {
            const element = document.querySelector(`[data-index="${index}"]`);
            element.classList.add('matched');
        });
        
        await this.delay(600);
    }

    createParticles(matches) {
        const container = document.getElementById('particleContainer');
        
        matches.forEach(index => {
            const element = document.querySelector(`[data-index="${index}"]`);
            const rect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            for (let i = 0; i < 6; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = (rect.left - containerRect.left + rect.width / 2) + 'px';
                particle.style.top = (rect.top - containerRect.top + rect.height / 2) + 'px';
                particle.style.background = this.getRandomColor();
                
                const dx = (Math.random() - 0.5) * 100;
                const dy = (Math.random() - 0.5) * 100;
                particle.style.setProperty('--dx', dx + 'px');
                particle.style.setProperty('--dy', dy + 'px');
                
                container.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1000);
            }
        });
    }

    getRandomColor() {
        const colors = ['#ff6b9d', '#4facfe', '#43e97b', '#ffeaa7', '#a29bfe', '#fd79a8'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    async dropCandies() {
        let moved = false;
        
        for (let col = 0; col < this.boardSize; col++) {
            let writeIndex = this.boardSize - 1;
            
            for (let row = this.boardSize - 1; row >= 0; row--) {
                const index = row * this.boardSize + col;
                
                if (this.board[index] !== null) {
                    if (writeIndex !== row) {
                        const newIndex = writeIndex * this.boardSize + col;
                        this.board[newIndex] = this.board[index];
                        this.board[index] = null;
                        moved = true;
                        
                        // Animate falling
                        const element = document.querySelector(`[data-index="${newIndex}"]`);
                        element.classList.add('falling');
                        element.textContent = this.candyTypes[this.board[newIndex]];
                        element.className = `candy falling ${this.candyColors[this.board[newIndex]]}`;
                    }
                    writeIndex--;
                }
            }
        }
        
        if (moved) {
            await this.delay(500);
            document.querySelectorAll('.falling').forEach(el => el.classList.remove('falling'));
        }
    }

    fillEmptySpaces() {
        for (let col = 0; col < this.boardSize; col++) {
            for (let row = 0; row < this.boardSize; row++) {
                const index = row * this.boardSize + col;
                
                if (this.board[index] === null) {
                    let candyType;
                    let attempts = 0;
                    
                    do {
                        candyType = Math.floor(Math.random() * this.candyTypes.length);
                        attempts++;
                    } while (this.wouldCreateMatch(index, candyType) && attempts < 50);
                    
                    this.board[index] = candyType;
                    
                    const element = document.querySelector(`[data-index="${index}"]`);
                    element.textContent = this.candyTypes[candyType];
                    element.className = `candy falling ${this.candyColors[candyType]}`;
                }
            }
        }
        
        setTimeout(() => {
            document.querySelectorAll('.falling').forEach(el => el.classList.remove('falling'));
        }, 500);
    }

    handlePowerUpClick(event) {
        if (this.isAnimating || this.moves <= 0) return;
        
        const powerUpType = event.currentTarget.dataset.type;
        
        if (this.powerUps[powerUpType] > 0) {
            this.powerUps[powerUpType]--;
            this.updateUI();
            this.usePowerUp(powerUpType);
        }
    }

    async usePowerUp(type) {
        this.isAnimating = true;
        
        switch (type) {
            case 'bomb':
                await this.useBomb();
                break;
            case 'rainbow':
                await this.useRainbow();
                break;
            case 'shuffle':
                await this.useShuffle();
                break;
        }
        
        this.isAnimating = false;
        this.checkGameState();
    }

    async useBomb() {
        // Remove random 9 candies in a 3x3 area
        const centerRow = Math.floor(Math.random() * (this.boardSize - 2)) + 1;
        const centerCol = Math.floor(Math.random() * (this.boardSize - 2)) + 1;
        const matches = [];
        
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const index = (centerRow + dr) * this.boardSize + (centerCol + dc);
                matches.push(index);
            }
        }
        
        await this.processMatches(matches);
    }

    async useRainbow() {
        // Remove all candies of a random type
        const targetType = Math.floor(Math.random() * this.candyTypes.length);
        const matches = [];
        
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] === targetType) {
                matches.push(i);
            }
        }
        
        await this.processMatches(matches);
    }

    async useShuffle() {
        this.isAnimating = true;
        
        // Shuffle the board
        for (let i = this.board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.board[i], this.board[j]] = [this.board[j], this.board[i]];
        }
        
        // Animate shuffle
        document.querySelectorAll('.candy').forEach(el => {
            el.style.transform = 'scale(0) rotate(180deg)';
        });
        
        await this.delay(300);
        this.renderBoard();
        
        document.querySelectorAll('.candy').forEach(el => {
            el.style.transform = '';
        });
        
        this.isAnimating = false;
    }

    updateUI() {
        document.getElementById('score').textContent = this.score.toLocaleString();
        document.getElementById('level').textContent = this.level;
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('targetScore').textContent = this.targetScore.toLocaleString();
        
        // Update progress bar
        const progress = Math.min(100, (this.score / this.targetScore) * 100);
        document.getElementById('progressFill').style.width = progress + '%';
        
        // Update power-up counts
        document.getElementById('bombCount').textContent = this.powerUps.bomb;
        document.getElementById('rainbowCount').textContent = this.powerUps.rainbow;
        document.getElementById('shuffleCount').textContent = this.powerUps.shuffle;
    }

    checkGameState() {
        if (this.score >= this.targetScore) {
            this.showModal('Level Complete!', `Congratulations! You've reached the target score of ${this.targetScore.toLocaleString()}.`);
        } else if (this.moves <= 0) {
            this.showModal('Game Over!', 'You\'ve run out of moves. Try again!');
        }
    }

    showModal(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').textContent = message;
        document.getElementById('gameOverlay').classList.add('show');
    }

    hideModal() {
        document.getElementById('gameOverlay').classList.remove('show');
    }

    nextLevel() {
        this.level++;
        this.moves = 30;
        this.targetScore = Math.floor(this.targetScore * 1.5);
        this.score = 0;
        
        // Add power-ups for new level
        this.powerUps.bomb += 2;
        this.powerUps.rainbow += 1;
        if (this.level % 3 === 0) {
            this.powerUps.shuffle += 1;
        }
        
        this.hideModal();
        this.generateBoard();
        this.updateUI();
    }

    restartGame() {
        this.level = 1;
        this.score = 0;
        this.moves = 30;
        this.targetScore = 1000;
        this.powerUps = { bomb: 3, rainbow: 2, shuffle: 1 };
        
        this.hideModal();
        this.generateBoard();
        this.updateUI();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SweetCrushGame();
}); 