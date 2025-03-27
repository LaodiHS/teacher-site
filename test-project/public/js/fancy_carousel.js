class FancyCarousel extends HTMLElement {
    static get observedAttributes() {
      return ['auto-spin', 'spin-interval'];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            position: relative;
            max-width: 800px;
            margin: 0 auto;
            overflow: hidden;
          }
  
          .container {
            display: flex;
            height: 60vh;
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
  
          .slide {
            flex: 0 0 100%;
            position: relative;
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), 
                        opacity 0.6s ease-out;
            transform-style: preserve-3d;
          }
  
          .slide img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            pointer-events: none;
          }
  
          .progress {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            z-index: 10;
          }
  
          .bubble {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
  
          .bubble.active {
            background: rgba(255, 255, 255, 0.9);
          }
  
          .controls {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            z-index: 10;
          }
  
          button {
            background: rgba(0, 0, 0, 0.5);
            border: none;
            color: white;
            padding: 5px 8px;
            cursor: pointer;
          }
  
          button:hover {
            background: rgba(0, 0, 0, 0.8);
          }
  
        </style>
  
        <div class="container"></div>
        <div class="progress"></div>
        <div class="controls">
          <button class="pause">⏸</button>
          <button class="play">▶</button>
        </div>
      `;
  
      this.slides = [];
      this.currentIndex = 0;
      this.autoSpinInterval = null;
    }
  
    connectedCallback() {
      try {
        this.images = JSON.parse(this.getAttribute('images') || '[]');
        this.autoSpin = this.hasAttribute('auto-spin');
        this.spinInterval = parseInt(this.getAttribute('spin-interval')) || 5000;
  
        if (!Array.isArray(this.images) || this.images.length === 0) {
          throw new Error('No images provided for the carousel.');
        }
  
        this.initCarousel();
        this.addEventListeners();
        this.createProgressBubbles();
        if (this.autoSpin) this.startAutoSpin();
      } catch (error) {
        console.error('Carousel Initialization Error:', error.message);
        this.shadowRoot.innerHTML += `<p style="color: red; text-align: center;">Error loading carousel.</p>`;
      }
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'auto-spin') {
        this.autoSpin = this.hasAttribute('auto-spin');
        this.autoSpin ? this.startAutoSpin() : this.stopAutoSpin();
      }
      if (name === 'spin-interval') {
        this.spinInterval = parseInt(newValue) || 5000;
        if (this.autoSpin) {
          this.stopAutoSpin();
          this.startAutoSpin();
        }
      }
    }
  
    initCarousel() {
      const container = this.shadowRoot.querySelector('.container');
      container.innerHTML = '';
      this.slides = [];
  
      this.images.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${imgSrc}" loading="lazy" alt="Slide ${index + 1}" onerror="this.src='fallback.jpg'">`;
        container.appendChild(slide);
        this.slides.push(slide);
      });
    }
  
    createProgressBubbles() {
      const progress = this.shadowRoot.querySelector('.progress');
      progress.innerHTML = '';
  
      this.slides.forEach((_, index) => {
        const bubble = document.createElement('div');
        bubble.className = `bubble ${index === 0 ? 'active' : ''}`;
        bubble.addEventListener('click', () => {
          this.stopAutoSpin();
          this.goToSlide(index);
        });
        progress.appendChild(bubble);
      });
    }
  
    updateProgressBubbles() {
      this.shadowRoot.querySelectorAll('.bubble').forEach((bubble, index) => {
        bubble.classList.toggle('active', index === this.currentIndex);
      });
    }
  
    startAutoSpin() {
      this.stopAutoSpin();
      this.autoSpinInterval = setInterval(() => this.next(), this.spinInterval);
    }
  
    stopAutoSpin() {
      clearInterval(this.autoSpinInterval);
      this.autoSpinInterval = null;
    }
  
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateCarousel();
    }
  
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.updateCarousel();
    }
  
    goToSlide(index) {
      this.currentIndex = index;
      this.updateCarousel();
    }
  
    updateCarousel() {
      this.slides.forEach((slide, index) => {
        slide.style.display = index === this.currentIndex ? 'block' : 'none';
      });
      this.updateProgressBubbles();
    }
  
    addEventListeners() {
      const container = this.shadowRoot.querySelector('.container');
      container.addEventListener('touchstart', (e) => (this.touchStartX = e.touches[0].clientX));
      container.addEventListener('touchend', (e) => {
        const diff = this.touchStartX - e.changedTouches[0].clientX;
        if (diff > 50) this.next();
        else if (diff < -50) this.prev();
      });
  
      this.shadowRoot.querySelector('.play').addEventListener('click', () => this.startAutoSpin());
      this.shadowRoot.querySelector('.pause').addEventListener('click', () => this.stopAutoSpin());
    }
  }
  
  customElements.define('fancy-carousel', FancyCarousel);
  