// Ensure you load D3.js in your HTML page:
// <script src="https://d3js.org/d3.v6.min.js"></script>

class MagicNumberForest extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.comboCache = new Map();
    this.currentQuestIndex = 0;
    this.quests = [
      { n: 5, k: 2, description: 'Find 2 acorns in 5 trees!' },
      { n: 7, k: 3, description: 'Find 3 berries in 7 bushes!' },
      { n: 4, k: 1, description: 'Find 1 flower in 4 meadows!' }
    ];
    this.debounceTimer = null;
    this.initializeComponent();
  }

  connectedCallback() {
    try {
      this.loadAssets();
      this.renderGame();
      this.setupQuest();
      window.addEventListener('resize', this.debounce(() => this.onResize(), 200));
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  // Setup basic containers and elements
  initializeComponent() {
    // Create containers: game, quest panel, and SVG for the triangle
    this.gameContainer = document.createElement('div');
    this.gameContainer.id = 'game-container';
    this.questContainer = document.createElement('div');
    this.questContainer.id = 'quest-container';
    this.svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgContainer.setAttribute('id', 'triangle-svg');
    this.svgContainer.setAttribute('width', '100%');
    this.svgContainer.setAttribute('height', '400');

    // Pixel the Fox element (our character)
    this.pixel = document.createElement('div');
    this.pixel.id = 'pixel';
    this.pixel.textContent = '🦊';
    this.pixel.style.position = 'absolute';
    this.pixel.style.transition = 'all 0.5s ease';

    // Append elements to the shadow DOM
    this.shadowRoot.appendChild(this.gameContainer);
    this.gameContainer.appendChild(this.questContainer);
    this.gameContainer.appendChild(this.svgContainer);
    this.shadowRoot.appendChild(this.pixel);
  }

  loadAssets() {
    // Load Google Fonts and basic CSS styling for animations and responsive layout
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');

      :host {
        display: block;
        position: relative;
        font-family: 'Comic Neue', sans-serif;
      }
      
      #game-container {
        position: relative;
        width: 100%;
      }
      
      #quest-container {
        text-align: center;
        margin-bottom: 10px;
        font-size: 1.2em;
        color: #333;
      }
      
      #triangle-svg {
        background: #e0f7fa;
        border: 2px solid #4dd0e1;
      }
      
      .stone {
        fill: #ffcc80;
        stroke: #e65100;
        stroke-width: 1;
        cursor: pointer;
      }
      
      .stone-text {
        font-size: 14px;
        fill: #4e342e;
        pointer-events: none;
      }
      
      /* Highlight for target stone */
      .target {
        stroke: #ffeb3b;
        stroke-width: 3;
      }
      
      /* Wobble animation for incorrect answer */
      @keyframes wobble {
        0% { transform: translate(0, 0); }
        25% { transform: translate(-5px, 0); }
        50% { transform: translate(5px, 0); }
        75% { transform: translate(-5px, 0); }
        100% { transform: translate(0, 0); }
      }
      .wobble {
        animation: wobble 0.5s;
      }
      
      /* Confetti style */
      .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        background: red;
        opacity: 0.8;
        border-radius: 50%;
      }
      
      /* Pixel the Fox styling */
      #pixel {
        font-size: 30px;
        z-index: 10;
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  // Render the game scene using D3.js (SVG-based Pascal's Triangle)
  renderGame() {
    const rows = 10; // total rows for Pascal's Triangle
    this.stoneData = this.generateStoneData(rows);
    const cellSize = 50;
    const rowHeight = 50;
    
    // Adjust SVG height based on rows
    this.svgContainer.setAttribute('height', rows * rowHeight + 50);
    
    // Use D3.js to render stones
    const svg = d3.select(this.svgContainer);
    svg.selectAll('*').remove(); // Clear previous renders

    // Group for stones
    const stonesGroup = svg.append('g').attr('id', 'stones-group');
    
    // Render each stone as a circle
    stonesGroup.selectAll('circle')
      .data(this.stoneData)
      .enter()
      .append('circle')
      .attr('class', 'stone')
      .attr('cx', d => (d.k - d.n / 2) * cellSize + (this.svgContainer.clientWidth / 2))
      .attr('cy', d => d.n * rowHeight + 30)
      .attr('r', 20)
      .on('click', (event, d) => {
        try {
          this.validateAnswer(d, event.currentTarget);
        } catch (error) {
          console.error('Error on stone click:', error);
        }
      });
    
    // Add text labels for stones
    stonesGroup.selectAll('text')
      .data(this.stoneData)
      .enter()
      .append('text')
      .attr('class', 'stone-text')
      .attr('x', d => (d.k - d.n / 2) * cellSize + (this.svgContainer.clientWidth / 2))
      .attr('y', d => d.n * rowHeight + 35)
      .attr('text-anchor', 'middle')
      .text(d => this.calculateCombination(d.n, d.k));
    
    // Position Pixel at starting position (top center)
    const startX = (this.svgContainer.clientWidth / 2) - 15;
    const startY = 10;
    this.pixel.style.left = `${startX}px`;
    this.pixel.style.top = `${startY}px`;
  }

  // Generate data for each stone (node) in Pascal's Triangle
  generateStoneData(rows) {
    let stones = [];
    for (let n = 0; n < rows; n++) {
      for (let k = 0; k <= n; k++) {
        stones.push({ n, k });
      }
    }
    return stones;
  }

  // Calculate combination C(n,k) with memoization
  calculateCombination(n, k) {
    const key = `${n}-${k}`;
    if (this.comboCache.has(key)) return this.comboCache.get(key);
    let res = (k === 0 || k === n) ? 1 : this.calculateCombination(n - 1, k - 1) + this.calculateCombination(n - 1, k);
    this.comboCache.set(key, res);
    return res;
  }

  // Initialize the quest system and load saved progress
  setupQuest() {
    const savedQuest = localStorage.getItem('magicNumberForestQuestIndex');
    if (savedQuest !== null) {
      this.currentQuestIndex = parseInt(savedQuest, 10);
    }
    this.currentQuest = this.quests[this.currentQuestIndex];
    this.currentQuest.target = this.calculateCombination(this.currentQuest.n, this.currentQuest.k);
    this.updateQuestUI();
    this.highlightTargetStone();
  }

  updateQuestUI() {
    this.questContainer.textContent = this.currentQuest.description + ` (Target: ${this.currentQuest.target})`;
  }

  // Highlight the target stone by adding a special class and a treasure icon
  highlightTargetStone() {
    d3.select(this.svgContainer).selectAll('.stone').classed('target', false);
    d3.select(this.svgContainer).selectAll('.stone')
      .filter(d => d.n === this.currentQuest.n && d.k === this.currentQuest.k)
      .classed('target', true);

    // Remove previous treasure icons and add one above the target stone
    d3.select(this.svgContainer).selectAll('.treasure').remove();
    d3.select(this.svgContainer).selectAll('.stone')
      .filter(d => d.n === this.currentQuest.n && d.k === this.currentQuest.k)
      .each((d, i, nodes) => {
        const stone = d3.select(nodes[i]);
        const cx = +stone.attr('cx');
        const cy = +stone.attr('cy');
        d3.select(this.svgContainer)
          .append('text')
          .attr('class', 'treasure')
          .attr('x', cx)
          .attr('y', cy - 25)
          .attr('text-anchor', 'middle')
          .text('🎁');
      });
  }

  // Validate the player's answer and provide interactive feedback
  validateAnswer(d, stoneElement) {
    try {
      const answer = this.calculateCombination(d.n, d.k);
      if (answer === this.currentQuest.target) {
        this.playSound('success');
        this.animatePixelTo(stoneElement);
        this.showConfetti();
        this.advanceQuest();
      } else {
        this.playSound('error');
        // Apply wobble effect for incorrect answer
        d3.select(stoneElement).classed('wobble', true);
        setTimeout(() => d3.select(stoneElement).classed('wobble', false), 500);
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  }

  // Animate Pixel the Fox to the target stone
  animatePixelTo(stoneElement) {
    const cx = stoneElement.getAttribute('cx');
    const cy = stoneElement.getAttribute('cy');
    const rect = this.svgContainer.getBoundingClientRect();
    const targetX = parseFloat(cx) + rect.left - 15; // offset to center the fox
    const targetY = parseFloat(cy) + rect.top - 15;
    this.pixel.style.left = `${targetX}px`;
    this.pixel.style.top = `${targetY}px`;
  }

  // Create a simple confetti animation effect
  showConfetti() {
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.background = this.randomColor();
      confetti.style.left = Math.random() * this.clientWidth + 'px';
      confetti.style.top = '0px';
      this.shadowRoot.appendChild(confetti);
      setTimeout(() => {
        confetti.style.transition = 'all 1s ease-out';
        confetti.style.top = this.clientHeight + 'px';
        confetti.style.opacity = '0';
      }, 10);
      setTimeout(() => confetti.remove(), 1100);
    }
  }

  randomColor() {
    const colors = ['#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb',
                    '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Advance the quest and update progress (using localStorage)
  advanceQuest() {
    this.currentQuestIndex++;
    if (this.currentQuestIndex >= this.quests.length) {
      this.questContainer.textContent = 'Congratulations! You unlocked the Math Explorer badge 🏅';
      localStorage.removeItem('magicNumberForestQuestIndex');
    } else {
      this.currentQuest = this.quests[this.currentQuestIndex];
      this.currentQuest.target = this.calculateCombination(this.currentQuest.n, this.currentQuest.k);
      localStorage.setItem('magicNumberForestQuestIndex', this.currentQuestIndex);
      this.updateQuestUI();
      this.highlightTargetStone();
    }
  }

  // Play simple sound effects using the Web Audio API
  playSound(type) {
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      oscillator.type = type === 'success' ? 'triangle' : 'sawtooth';
      oscillator.frequency.setValueAtTime(type === 'success' ? 440 : 220, context.currentTime);
      oscillator.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.2);
    } catch (error) {
      console.warn('Web Audio API not supported', error);
    }
  }

  debounce(func, delay) {
    return () => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(func, delay);
    };
  }

  onResize() {
    this.renderGame();
    this.highlightTargetStone();
  }
}

customElements.define('magic-number-forest', MagicNumberForest);
