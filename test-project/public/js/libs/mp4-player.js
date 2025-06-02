class Mp4Player extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initEvents();
  }

  render() {
    const width = this.getAttribute('width') || '640';
    const height = this.getAttribute('height') || '360';
    const src = this.getAttribute('src') || '';

    this.shadow.innerHTML = `
      <style>
        .player-container {
          max-width: 100%;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          background: black;
          position: relative;
          font-family: sans-serif;
        overflow: hidden;

      height:1200px
        }

        video {
          width: 100%;
          height: auto;
          display: block;
          background: black;
          
         
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          background: rgba(0,0,0,0.6);
          color: white;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }

        button {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          padding: 6px 10px;
        }

        button:hover, button:focus {
          background: rgba(255,255,255,0.1);
          outline: none;
        }

        .error {
          color: red;
          padding: 10px;
          background: #ffe6e6;
          font-size: 14px;
          display: none;
        }

        .loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
          color: white;
          background: rgba(0,0,0,0.5);
          padding: 8px 12px;
          border-radius: 6px;
          display: none;
        }
      </style>

      <div class="player-container">
        <video width="${width}" height="${height}" preload="auto">
          <source src="${src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="controls">
          <button id="playPause">▶️</button>
          <button id="mute">🔊</button>
          <button id="fullscreen">⛶</button>
        </div>
        <div class="loader" id="loader">Buffering...</div>
        <div class="error" id="error"></div>
      </div>
    `;
  }

  initEvents() {
    const video = this.shadow.querySelector('video');
    const playPauseBtn = this.shadow.querySelector('#playPause');
    const muteBtn = this.shadow.querySelector('#mute');
    const fullscreenBtn = this.shadow.querySelector('#fullscreen');
    const errorBox = this.shadow.querySelector('#error');
    const loader = this.shadow.querySelector('#loader');

    const showLoader = () => loader.style.display = 'block';
    const hideLoader = () => loader.style.display = 'none';

    // Show loader until ready to play
    showLoader();

    // Reload explicitly
    video.load();

    video.addEventListener('canplaythrough', () => {
      hideLoader();
    });

    video.addEventListener('waiting', showLoader);
    video.addEventListener('playing', hideLoader);

    playPauseBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play().then(() => {
          playPauseBtn.textContent = '⏸️';
        }).catch(err => {
          errorBox.textContent = `Play failed: ${err.message}`;
          errorBox.style.display = 'block';
        });
      } else {
        video.pause();
        playPauseBtn.textContent = '▶️';
      }
    });

    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      muteBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    fullscreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
    });

    video.addEventListener('error', () => {
      const err = video.error;
      let msg = 'An unknown error occurred.';
      if (err) {
        switch (err.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            msg = 'Video load aborted.';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            msg = 'Network error – check your connection.';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            msg = 'Video decode error – check format and encoding.';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            msg = 'Unsupported video format.';
            break;
        }
      }
      errorBox.textContent = msg;
      errorBox.style.display = 'block';
      hideLoader();
    });

    video.addEventListener('ended', () => {
      playPauseBtn.textContent = '▶️';
    });
  }
}

customElements.define('mp4-player', Mp4Player);
