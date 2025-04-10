
  class InfoFooter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            padding: 2rem 1rem;
            background: #f8f9fa;
            border-top: 1px solid #e0e0e0;
          }

          .grid-container {
            display: grid;
            gap: 2rem;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            max-width: 1200px;
            margin: 0 auto;
          }

          .grid-item {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s ease;
          }

          .grid-item:hover {
            transform: translateY(-5px);
          }

          .qr-code {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .qr-code img {
            width: 150px;
            height: 150px;
            margin-bottom: 1rem;
          }

          .copyright {
            grid-column: 1 / -1;
            text-align: center;
            margin-top: 2rem;
            color: #666;
            font-size: 0.9rem;
          }

          h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.2rem;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          li {
            margin-bottom: 0.5rem;
            font-color: #3498db
          }

          a {
            color: #3498db;
            text-decoration: none;
          }

          @media (max-width: 768px) {
            .grid-container {
              grid-template-columns: 1fr;
            }
            
            .grid-item {
              width: 100%;
              margin-bottom: 1rem;
            }
          }
        </style>

        <div class="grid-container">
          <div class="grid-item contact-info">
            <h3>Contact Information</h3>
            <slot name="contact-primary"></slot>
          </div>

          <div class="grid-item certifications">
            <h3>Certifications</h3>
            <slot name="certifications"></slot>
          </div>

          <div class="grid-item qr-code">
            <h3>WeChat</h3>
            <slot name="wechat-qr">
              <img src="placeholder-qr.png" alt="WeChat QR Code">
            </slot>
          </div>

          <div class="grid-item contact-info">
            <h3>Additional Contacts</h3>
            <slot name="contact-secondary"></slot>
          </div>

          <div class="copyright">
            <slot name="copyright">
              © 2023 Your Company Name. All rights reserved.
            </slot>
          </div>
        </div>
      `;
    }
  }

  customElements.define('info-footer', InfoFooter);
