class MarkdownRenderer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.currentFile = '';
      this.retryAttempts = 0;
      this.maxRetries = 2;
      
      // Inject all CSS into shadow DOM
      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: block;
          --primary-color: #1976d2;
          --error-color: #d32f2f;
          --border-color: #e0e0e0;
          --text-color: #333;
          --light-text: #666;
          --background-light: #f8f8f8;
          --error-bg: #fff0f0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: var(--text-color);
        }

        .container {
          max-width: min(100%, 1200px);
          margin: 0 auto;
          padding: 1rem;
        }

        .dropdown-container {
          margin-bottom: 1.5rem;
          position: relative;
        }

        select {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background-color: white;
          color: var(--text-color);
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
          transition: border-color 0.2s;
        }

        select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
        }

        .content-container {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1.5rem;
          min-height: 200px;
          overflow-wrap: break-word;
        }

        .loading, .empty {
          padding: 1.5rem;
          background: var(--background-light);
          border-radius: 4px;
          color: var(--light-text);
          text-align: center;
        }

        .error {
          padding: 1.5rem;
          background: var(--error-bg);
          border-radius: 4px;
          color: var(--error-color);
        }

        .file-path {
          font-size: 0.8rem;
          color: var(--light-text);
          margin-top: 1.5rem;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          word-break: break-all;
          opacity: 0.8;
        }

        .retry-btn {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
          font-size: 1rem;
          transition: background-color 0.2s;
        }

        .retry-btn:hover {
          background: #1565c0;
        }

        /* Markdown content styling */
        .content-container h1, 
        .content-container h2, 
        .content-container h3 {
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          line-height: 1.3;
        }

        .content-container p {
          margin-bottom: 1em;
        }

        .content-container pre {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .content-container code {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
          font-size: 0.9em;
        }

        .content-container blockquote {
          border-left: 4px solid #ddd;
          padding-left: 1rem;
          margin-left: 0;
          color: var(--light-text);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .container {
            padding: 0.75rem;
          }
          
          .content-container {
            padding: 1rem;
          }
          
          select {
            padding: 0.65rem;
          }
        }

        @media (max-width: 480px) {
          .content-container {
            padding: 0.75rem;
          }
          
          .loading, .empty, .error {
            padding: 1rem;
          }
        }
      `;
      this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
      // Initialize the component
      this.configureMarked();
      this.renderBaseUI();
      this.setupFileSelector();
    }

    configureMarked() {
      // Load marked.js dynamically with fallback
      if (typeof marked === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        script.onload = () => {
          this.setupMarkedOptions();
          this.initializeAfterDependencies();
        };
        script.onerror = () => {
          console.error('Failed to load marked.js');
          this.showError('Failed to load Markdown processor');
        };
        document.head.appendChild(script);
      } else {
        this.setupMarkedOptions();
        this.initializeAfterDependencies();
      }
    }

    setupMarkedOptions() {
      marked.setOptions({
        highlight: (code, lang) => {
          try {
            if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
              return hljs.highlight(lang, code).value;
            }
            return hljs?.highlightAuto(code).value || code;
          } catch (e) {
            console.error('Syntax highlighting error:', e);
            return code;
          }
        },
        silent: false,
        breaks: true,
        gfm: true
      });
    }

    initializeAfterDependencies() {
      // Load other dependencies if needed
      if (typeof hljs === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js';
        document.head.appendChild(script);
      }
      
      if (typeof DOMPurify === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js';
        document.head.appendChild(script);
      }
    }

    renderBaseUI() {
      const container = document.createElement('div');
      container.className = 'container';
      
      const dropdownContainer = document.createElement('div');
      dropdownContainer.className = 'dropdown-container';
      
      const contentContainer = document.createElement('div');
      contentContainer.className = 'content-container';
      
      const emptyState = document.createElement('div');
      emptyState.className = 'empty';
      emptyState.textContent = 'Select a document from the dropdown above';
      
      contentContainer.appendChild(emptyState);
      container.appendChild(dropdownContainer);
      container.appendChild(contentContainer);
      
      this.shadowRoot.appendChild(container);
    }

    setupFileSelector() {
      const select = this.querySelector('select[slot="files"]');
      if (!select) {
        this.showError('No file selector found in component');
        return;
      }

      const dropdownContainer = this.shadowRoot.querySelector('.dropdown-container');
      const clonedSelect = select.cloneNode(true);
      dropdownContainer.appendChild(clonedSelect);

      clonedSelect.addEventListener('change', async (e) => {
        this.currentFile = e.target.value;
        if (this.currentFile) {
          await this.loadMarkdown(this.currentFile);
        } else {
          this.showEmptyState();
        }
      });
    }

    async loadMarkdown(filePath) {
      if (!filePath) return;
      
      if (!this.isValidPath(filePath)) {
        this.showError('Invalid file path format');
        return;
      }

      this.showLoadingState(filePath);
      this.retryAttempts = 0;

      try {
        await this.attemptFileLoad(filePath);
      } catch (error) {
        console.error('Markdown load failed:', error);
        this.showError(`Failed to load document: ${error.message}`, filePath);
      }
    }

    isValidPath(path) {
      return typeof path === 'string' && 
             path.length > 0 && 
             !path.includes('..') &&
             path.endsWith('.md');
    }

    async attemptFileLoad(filePath) {
      try {
        const response = await fetch(filePath);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        if (!markdown.trim()) {
          throw new Error('File is empty');
        }
        
        this.renderMarkdown(markdown, filePath);
      } catch (error) {
        if (this.shouldRetry(error) && this.retryAttempts < this.maxRetries) {
          this.retryAttempts++;
          await new Promise(resolve => setTimeout(resolve, 1000 * this.retryAttempts));
          await this.attemptFileLoad(filePath);
        } else {
          throw error;
        }
      }
    }

    shouldRetry(error) {
      return error.message.includes('Failed to fetch') || 
             error.message.includes('NetworkError');
    }

    renderMarkdown(markdown, filePath) {
      try {
        marked.parse(markdown); // Test parse first
        
        const dirtyHtml = marked.parse(markdown);
        const cleanHtml = DOMPurify?.sanitize(dirtyHtml) || dirtyHtml;
        
        const contentContainer = this.shadowRoot.querySelector('.content-container');
        contentContainer.innerHTML = `
          ${cleanHtml}
          <div class="file-path">Loaded from: ${filePath}</div>
        `;
      } catch (parseError) {
        console.error('Markdown parsing error:', parseError);
        this.showError(
          `Document contains invalid Markdown: ${parseError.message}`,
          filePath
        );
      }
    }

    showLoadingState(filePath) {
      const contentContainer = this.shadowRoot.querySelector('.content-container');
      contentContainer.innerHTML = `
        <div class="loading">
          Loading document...
          <div class="file-path">Loading: ${filePath}</div>
        </div>
      `;
    }

    showError(message, filePath = '') {
      const contentContainer = this.shadowRoot.querySelector('.content-container');
      const filePathInfo = filePath ? `<div class="file-path">Path: ${filePath}</div>` : '';
      
      contentContainer.innerHTML = `
        <div class="error">
          ${message}
          ${filePathInfo}
          <button class="retry-btn">Retry</button>
        </div>
      `;
      
      contentContainer.querySelector('.retry-btn').addEventListener('click', () => {
        this.loadMarkdown(this.currentFile);
      });
    }

    showEmptyState() {
      const contentContainer = this.shadowRoot.querySelector('.content-container');
      contentContainer.innerHTML = `
        <div class="empty">Select a document from the dropdown above</div>
      `;
    }
  }

  // Define the custom element
  if (!customElements.get('markdown-renderer')) {
    customElements.define('markdown-renderer', MarkdownRenderer);
  }