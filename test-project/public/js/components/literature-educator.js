 class LiteratureEducator extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          :host {
            --primary-color: #3a4a69;
            --accent-color: #e74c3c;
            --text-color: #2c3e50;
            --card-bg: #fff5f3;
            display: block;
            font-family: 'Merriweather', serif;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }

          .grid {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }

          .book-card {
            background: var(--card-bg);
            border-radius: 16px;
            padding: 2rem;
            position: relative;
            overflow: hidden;
            transition: transform 0.3s ease;
            border: 2px solid var(--accent-color);
          }

          .book-card:hover {
            transform: rotate(-1deg) scale(1.02);
          }

          .grade-tag {
            position: absolute;
            top: 15px;
            right: -30px;
            background: var(--accent-color);
            color: white;
            padding: 0.5rem 2rem;
            transform: rotate(45deg);
            font-weight: bold;
            font-size: 0.9rem;
          }

          .card-header {
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .card-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto;
            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.1));
          }

          h2 {
            color: var(--primary-color);
            margin: 1rem 0 0.5rem;
            font-size: 1.6rem;
          }

          .authors {
            color: var(--accent-color);
            font-style: italic;
            margin-bottom: 1rem;
          }

          .features {
            list-style: none;
            padding: 0;
            margin: 1rem 0;
          }

          .feature-item {
            padding: 0.8rem;
            margin: 0.5rem 0;
            background: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            transition: background 0.2s;
          }

          .feature-item:hover {
            background: #ffece9;
          }

          .feature-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
          }

          .interactive-badge {
            margin-top: 1rem;
            padding: 0.5rem;
            background: var(--primary-color);
            color: white;
            border-radius: 20px;
            display: inline-block;
            font-size: 0.9rem;
          }

          @media (max-width: 768px) {
            .grid {
              grid-template-columns: 1fr;
            }
            
            .book-card {
              padding: 1.5rem;
            }
          }
        </style>

        <div class="container">
          <div class="grid">
            <!-- Middle School Card -->
            <div class="book-card">
              <div class="grade-tag">G6-G8</div>
              <div class="card-header">
                <svg class="card-icon" viewBox="0 0 24 24">
                  <path fill="var(--primary-color)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h2>Foundational Classics</h2>
                <div class="authors">Shakespeare • Poe • Lu Xun</div>
              </div>
              <ul class="features">
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Bilingual Annotation System
                </li>
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  Interactive Vocabulary Games
                </li>
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M12 15c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z"/>
                    <circle cx="12" cy="7" r="3"/>
                    <path d="M6 18.7c.7-1.1 2.1-1.7 3.5-1.7h5c1.4 0 2.8.6 3.5 1.7"/>
                  </svg>
                  Cultural Comparison Activities
                </li>
              </ul>
              <div class="interactive-badge">Earn 3D Reading Badges!</div>
            </div>

            <!-- High School Card -->
            <div class="book-card">
              <div class="grade-tag">G9-G12</div>
              <div class="card-header">
                <svg class="card-icon" viewBox="0 0 24 24">
                  <path fill="var(--primary-color)" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                </svg>
                <h2>Advanced Analysis</h2>
                <div class="authors">Fitzgerald • Austen • Dickens</div>
              </div>
              <ul class="features">
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                  Thesis Statement Builder
                </li>
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z"/>
                  </svg>
                  Historical Context VR Tours
                </li>
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                  </svg>
                  Debate & Discussion Leaderboards
                </li>
              </ul>
              <div class="interactive-badge">Unlock Author Avatars!</div>
            </div>

            <!-- College Prep Card -->
            <div class="book-card">
              <div class="grade-tag">University</div>
              <div class="card-header">
                <svg class="card-icon" viewBox="0 0 24 24">
                  <path fill="var(--primary-color)" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
                <h2>Master Works</h2>
                <div class="authors">Hemingway • Woolf • Twain</div>
              </div>
              <ul class="features">
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                  </svg>
                  Literary Theory Framework
                </li>
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                  </svg>
                  Cross-Cultural Analysis
                </li>
                <li class="feature-item">
                  <svg class="feature-icon" viewBox="0 0 24 24">
                    <path fill="var(--accent-color)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
                  </svg>
                  Creative Adaptation Projects
                </li>
              </ul>
              <div class="interactive-badge">Join Global Book Clubs!</div>
            </div>
          </div>
        </div>
      `;
    }
  }

  customElements.define('literature-educator', LiteratureEducator);