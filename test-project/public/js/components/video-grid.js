
class VideoGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          contain: content;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
          gap: 1rem;
          padding: 1rem;
          position: relative;
        }

        .video-wrapper {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease, z-index 0.3s ease;
          aspect-ratio: 16/9;
        }

        .video-wrapper video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          background: #000;
        }

        .video-wrapper.active {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90vw;
          height: 90vh;
          z-index: 1000;
        }

        .video-wrapper.active video {
          object-fit: contain;
        }

        .error-message {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem;
          background: #ffe6e6;
          border: 2px solid #ff4444;
          color: #cc0000;
          height: 100%;
          width: 100%;
          aspect-ratio: 16/9;
        }

        .error-message p {
          margin: 0;
          font-family: sans-serif;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
          }
        }
      </style>
      <div class="grid"></div>
    `;
    
    this.grid = this.shadowRoot.querySelector('.grid');
    this.activeVideo = null;
  }

  connectedCallback() {
    this.cloneVideos();
    this.addEventListeners();
    window.addEventListener('resize', this.handleWindowResize.bind(this));
  }

  cloneVideos() {
    const videos = Array.from(this.querySelectorAll('video'));
    videos.forEach(originalVideo => {
      const wrapper = document.createElement('div');
      wrapper.className = 'video-wrapper';
      
      const video = originalVideo.cloneNode(true);
      video.controls = true;
      
      // Add error handling
      video.addEventListener('error', (e) => 
        this.handleVideoError(wrapper, video));
      
      wrapper.appendChild(video);
      this.grid.appendChild(wrapper);
    });
  }

  handleVideoError(wrapper, video) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
      <p>Error loading video:<br>
      <strong>${video.src}</strong><br>
      ${this.getErrorText(video.error)}
      </p>
    `;
    
    // Replace video with error message
    wrapper.replaceChild(errorMessage, video);
    wrapper.style.cursor = 'default';
  }

  getErrorText(error) {
    if (!error) return 'Unknown error';
    switch(error.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        return 'Video loading aborted';
      case MediaError.MEDIA_ERR_NETWORK:
        return 'Network error';
      case MediaError.MEDIA_ERR_DECODE:
        return 'Decoding error';
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return 'Format not supported';
      default:
        return 'Playback error';
    }
  }

  addEventListeners() {
    this.grid.querySelectorAll('.video-wrapper').forEach(wrapper => {
      const video = wrapper.querySelector('video');
      if (!video) return; // Skip if replaced by error message
      
      wrapper.addEventListener('click', (e) => {
        if (e.target === video) return;
        this.toggleVideo(wrapper, video);
      });
      
      video.addEventListener('play', () => this.handleVideoPlay(wrapper));
      video.addEventListener('pause', () => this.handleVideoPause(wrapper));
      video.addEventListener('ended', () => this.handleVideoPause(wrapper));
    });
  }

  toggleVideo(wrapper, video) {
    if (!video || wrapper.querySelector('.error-message')) return;
    
    if (wrapper.classList.contains('active')) {
      video.pause();
    } else {
      if (this.activeVideo) {
        this.activeVideo.wrapper.classList.remove('active');
        this.activeVideo.video.pause();
      }
      wrapper.classList.add('active');
      video.play().catch(error => {
        this.handleVideoError(wrapper, video);
        wrapper.classList.remove('active');
      });
      this.activeVideo = { wrapper, video };
    }
  }

  // ... (keep other methods unchanged from previous version)

}

customElements.define('video-grid', VideoGrid);
