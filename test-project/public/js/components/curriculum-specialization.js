
  class CurriculumSpecialization extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          :host {
            --primary-color: #2c3e50;
            --secondary-color: #3498db;
            --text-color: #34495e;
            --card-bg: #f9f9f9;
            display: block;
            font-family: 'Segoe UI', system-ui, sans-serif;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }

          .grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            transition: transform 0.2s;
            border: 1px solid #e0e0e0;
          }

          .card:hover {
            transform: translateY(-5px);
          }

          .icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: var(--secondary-color);
          }

          h3 {
            color: var(--primary-color);
            margin: 0 0 1rem;
            font-size: 1.4rem;
          }

          .features {
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: left;
          }

          .features li {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-color);
          }

          .features li svg {
            width: 18px;
            height: 18px;
            fill: var(--secondary-color);
            flex-shrink: 0;
          }

          @media (max-width: 480px) {
            .grid {
              grid-template-columns: 1fr;
            }
            
            .card {
              padding: 1.5rem;
            }
          }
        </style>

        <div class="container">
          <div class="grid">
            <div class="card">
              <div class="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>IB Specialist</h3>
              <ul class="features">
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  Diploma Programme Expertise
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  TOK & EE Support
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  Holistic Approach
                </li>
              </ul>
            </div>

            <div class="card">
              <div class="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3>AP Expert</h3>
              <ul class="features">
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  30+ Subjects Covered
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  College Credit Prep
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  Exam Strategies
                </li>
              </ul>
            </div>

            <div class="card">
              <div class="icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3>A-Levels Pro</h3>
              <ul class="features">
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  Subject Specialization
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  UK Curriculum Focus
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                  Exam Technique Mastery
                </li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }
  }

  customElements.define('curriculum-specialization', CurriculumSpecialization);

