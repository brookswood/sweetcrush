# 🍭 Sweet Crush - Candy Match Game

A visually stunning and engaging Candy Crush clone built with HTML5, CSS3, and JavaScript. Experience beautiful animations, particle effects, and addictive match-3 gameplay!

## 🎮 Game Features

### ✨ Visual Excellence
- **Stunning gradients and animations** with smooth CSS transitions
- **Particle effects** when candies are matched
- **Beautiful candy emojis** representing different candy types
- **Glassmorphism design** with backdrop blur effects
- **Responsive design** that works on all devices

### 🎯 Gameplay Features
- **Classic match-3 mechanics** - match 3 or more candies in a row or column
- **8x8 game board** with 6 different candy types
- **Cascade matching** - new candies fall and create chain reactions
- **Power-ups system** with three special abilities:
  - 💣 **Bomb**: Destroys a 3x3 area of candies
  - 🌈 **Rainbow**: Removes all candies of one type
  - 🔄 **Shuffle**: Randomly rearranges the entire board

### 📊 Progression System
- **Level progression** with increasing difficulty
- **Target score system** - reach the goal to advance
- **Limited moves** adds strategic challenge
- **Score multipliers** for larger matches
- **Power-up rewards** for completing levels

## 🕹️ How to Play

### Basic Gameplay
1. **Click a candy** to select it (it will glow)
2. **Click an adjacent candy** to swap positions
3. **Match 3 or more** candies of the same type horizontally or vertically
4. **Matched candies disappear** and new ones fall from above
5. **Chain reactions** can create combo matches for bonus points

### Winning & Losing
- **Win**: Reach the target score before running out of moves
- **Lose**: Run out of moves before reaching the target
- **Advance**: Complete levels to unlock higher challenges

### Power-ups
- **Bomb (💣)**: Click to destroy a random 3x3 area
- **Rainbow (🌈)**: Click to remove all candies of a random type
- **Shuffle (🔄)**: Click to randomly rearrange all candies

### Scoring
- **Base score**: 10 points per candy matched
- **Multiplier bonus**: Extra points for larger matches
- **Chain reactions**: Cascading matches give bonus points

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Docker (for containerized deployment)
- No additional software or dependencies required for local play!

### Installation Options

#### Option 1: Docker Deployment (Recommended)
1. **Clone or download** this repository
2. **Build and run** with Docker Compose
3. **Access the game** at http://localhost:3099

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the directory
cd candycrush-clone

# Build and run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t sweet-crush .
docker run -d -p 3099:3099 --name sweet-crush-game sweet-crush

# Access the game at http://localhost:3099
```

#### Option 2: Local Development
1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Start playing** immediately!

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the directory
cd candycrush-clone

# Open in browser (or double-click index.html)
open index.html
```

### Docker Commands

```bash
# Start the game
docker compose up -d

# Stop the game
docker compose down

# View logs
docker compose logs -f

# Rebuild after changes
docker compose up -d --build
```

### Easy Deployment Script

For convenience, use the included deployment script:

```bash
# Make executable (first time only)
chmod +x deploy.sh

# Start the game
./deploy.sh start

# Stop the game
./deploy.sh stop

# Restart the game
./deploy.sh restart

# View logs
./deploy.sh logs

# Check status
./deploy.sh status

# Clean up everything
./deploy.sh clean

# See all options
./deploy.sh help
```

## 🎨 Game Design

### Color Scheme
- **Red Candies**: Lollipops with pink-red gradients
- **Blue Candies**: Cool blue to cyan gradients
- **Green Candies**: Fresh mint green gradients
- **Yellow Candies**: Warm golden yellow gradients
- **Purple Candies**: Rich purple gradients
- **Orange Candies**: Vibrant orange-pink gradients

### Animations
- **Hover effects**: Candies scale and rotate on mouse over
- **Selection glow**: Selected candies pulse with golden light
- **Match animation**: Matched candies spin and fade out
- **Falling animation**: New candies drop from above
- **Particle bursts**: Colorful particles explode from matches

## 📱 Responsive Design

The game automatically adapts to different screen sizes:
- **Desktop**: Full sidebar with power-ups and progress
- **Tablet**: Optimized layout for touch interaction
- **Mobile**: Compact design with stacked elements

## 🔧 Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure and game layout
- **CSS3**: Advanced styling, animations, and responsive design
- **JavaScript ES6+**: Game logic, object-oriented programming
- **Google Fonts**: Typography (Fredoka One, Poppins)
- **Docker**: Containerized deployment with nginx
- **Nginx**: High-performance web server for static file serving

### Key Features
- **Object-oriented design** with a single SweetCrushGame class
- **Async/await** for smooth animation sequencing
- **Event delegation** for efficient click handling
- **CSS Grid** for perfect game board layout
- **CSS Custom Properties** for dynamic particle animations

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 Game Balance

### Difficulty Progression
- **Level 1**: Target score 1,000 points
- **Each level**: Target increases by 50%
- **Power-up rewards**: 2 bombs, 1 rainbow per level
- **Shuffle bonus**: Every 3rd level

### Strategy Tips
- **Plan ahead**: Look for potential matches before making moves
- **Create cascades**: Set up chain reactions for bonus points
- **Save power-ups**: Use them strategically when stuck
- **Target large matches**: 4+ candies give score multipliers

## 🏆 Achievements & Challenges

### Try to achieve:
- **Perfect level**: Complete a level with moves to spare
- **Chain master**: Create 5+ cascade matches in one move
- **Power-up expert**: Complete a level using all power-ups
- **Speed runner**: Complete levels as quickly as possible

## 🔮 Future Enhancements

Potential features for future versions:
- **Sound effects** and background music
- **Local storage** for saving progress
- **Different game modes** (timed, endless, puzzle)
- **Special candy types** (striped, wrapped, etc.)
- **Leaderboards** and achievements system
- **Themes** and customizable candy sets

## 🤝 Contributing

Feel free to contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Enjoy Playing!

Have fun crushing candies and reaching new high scores! The game is designed to be both visually appealing and strategically challenging. Share your best scores and favorite power-up combinations!

---

*Built with ❤️ and lots of candy-inspired creativity!* # sweetcrush
