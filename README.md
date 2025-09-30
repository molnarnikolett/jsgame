# JavaScript Game Website

This is a **JavaScript-based game website** developed as part of university coursework.  
The project demonstrates interactive gameplay with dynamic elements, user interface handling, and basic game logic implementation.

## Features

### Game Board
- Generates a game board with variable sizes: 4x4, 6x6, or 8x8.
- Randomly places 4, 6, or 8 starting level-1 technologies at the beginning of the game.

### Gameplay
- Players can generate new level-1 technologies on empty tiles or using the "DRAW" button.
- Matching two identical elements merges them into a higher-level technology.
- Scoring system: completing technology chains adds points to both total score and individual technology score.

### User Interface
- Start screen allows the player to enter their name and select a difficulty level.
- Game UI displays the player’s name, current score, and the time associated with the selected difficulty level.
- Visual enhancements include tooltips (displayed after hovering over an element for 3 seconds), animations, and icons.

### Game Management
- Game time decreases every second according to the selected difficulty (10-15-20 minutes).
- The game ends when the time runs out, displaying a Game Over popup with the final score.

## Technologies
- JavaScript
- HTML & CSS
- Web browser (client-side execution)

## Usage
1. Open `index.html` in a web browser.  
2. Enter your name and select a difficulty level.  
3. Play the game by generating technologies, merging them, and accumulating points.  
4. When the time ends, a Game Over popup will display your final score.
