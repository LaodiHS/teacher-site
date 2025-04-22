class AutoScaleImage extends HTMLElement {
    static observedAttributes = ['src', 'fit', 'aspect', 'alt', 'fallback', 'max'];
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            max-width: 100%;
          }
  
          .aspect-wrapper {
            position: relative;
            width: 100%;
          }
  
          .aspect-inner {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
          }
  
          img {
            width: 100%;
            height: 100%;
            object-fit: var(--fit-mode, contain);
            display: block;
          }
  
          .error {
            display: none;
            width: 100%;
            padding: 1em;
            color: red;
            font-size: 0.9em;
            text-align: center;
          }
  
          .error.visible {
            display: block;
          }
        </style>
        <div class="aspect-wrapper">
          <div class="aspect-inner">
            <img loading="lazy" />
            <div class="error">Image failed to load.</div>
          </div>
        </div>
      `;
  
      this._img = this.shadowRoot.querySelector('img');
      this._error = this.shadowRoot.querySelector('.error');
      this._aspectWrapper = this.shadowRoot.querySelector('.aspect-wrapper');
  
      this._onError = this._onError.bind(this);
      this._onLoad = this._onLoad.bind(this);
      this.resizeObserver = new ResizeObserver(() => this._adjustAspect());
    }
  
    connectedCallback() {
      this._img.addEventListener('error', this._onError);
      this._img.addEventListener('load', this._onLoad);
      this.resizeObserver.observe(this._aspectWrapper);
      this._applyAttributes();
    }
  
    disconnectedCallback() {
      this._img.removeEventListener('error', this._onError);
      this._img.removeEventListener('load', this._onLoad);
      this.resizeObserver.disconnect();
    }
  
    attributeChangedCallback(name, oldVal, newVal) {
      if (oldVal !== newVal) {
        this._applyAttributes();
      }
    }
  
    _applyAttributes() {
      const src = this.getAttribute('src');
      const fit = this.getAttribute('fit') || 'contain';
      const aspect = this.getAttribute('aspect') || '';
      const alt = this.getAttribute('alt') || '';
      const fallback = this.getAttribute('fallback') || '';
      const max = this.getAttribute('max') || '';
  
      this._img.style.setProperty('--fit-mode', fit);
      this._img.alt = alt;
  
      if (src) {
        this._img.src = src;
      }
  
      this._aspectRatio = this._parseAspect(aspect);
      this._fallback = fallback;
  
      this._adjustAspect();
      this._applyMaxSize(max);
    }
  
    _parseAspect(aspect) {
      if (!aspect) return null;
      const parts = aspect.trim().split(':');
      if (parts.length === 2) {
        const w = parseFloat(parts[0]);
        const h = parseFloat(parts[1]);
        if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
          return h / w;
        }
      }
      return null;
    }
  
    _adjustAspect() {
      if (this._aspectRatio) {
        const paddingPercent = this._aspectRatio * 100;
        this._aspectWrapper.style.paddingTop = `${paddingPercent}%`;
      } else {
        this._aspectWrapper.style.paddingTop = '';
      }
    }
  
    _applyMaxSize(max) {
      if (!max) {
        this.style.maxWidth = '';
        this.style.maxHeight = '';
        this._img.style.maxWidth = '';
        this._img.style.maxHeight = '';
        return;
      }
  
      const parts = max.trim().split(/\s+/);
      if (parts.length === 1) {
        this.style.maxWidth = parts[0];
        this.style.maxHeight = '';
        this._img.style.maxWidth = parts[0];
        this._img.style.maxHeight = '';
      } else if (parts.length >= 2) {
        this.style.maxWidth = parts[0];
        this.style.maxHeight = parts[1];
        this._img.style.maxWidth = parts[0];
        this._img.style.maxHeight = parts[1];
      }
    }
  
    _onError() {
      this._error.classList.add('visible');
      if (this._fallback) {
        this._img.src = this._fallback;
        this._fallback = ''; // prevent loop
      }
    }
  
    _onLoad() {
      this._error.classList.remove('visible');
    }
  }
  
  customElements.define('auto-scale-image', AutoScaleImage);
  