class LatexRenderer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      const style = `
        <style>
          :host {
            display: block;
            font-family: sans-serif;
            padding: 1em;
            box-sizing: border-box;
            width: 100%;
          }
          .container {
            display: flex;
            flex-direction: column;
            gap: 1em;
            width: 100%;
          }
          select, textarea, input[type='file'], button {
            width: 100%;
            font-size: 1rem;
            padding: 0.5em;
            box-sizing: border-box;
          }
          textarea {
            min-height: 200px;
            resize: vertical;
          }
          .output {
            margin-top: 1em;
            width: 100%;
            overflow-x: auto;
          }
          @media (min-width: 768px) {
            .container {
              flex-direction: row;
              gap: 2em;
            }
            select, textarea, input[type='file'], button {
              flex: 1;
            }
          }
        </style>
      `;
  
      this.shadowRoot.innerHTML = `
        ${style}
        <div class="container">
          <select></select>
          <input type="file" accept=".tex" />
          <button id="export-html">Export as HTML</button>
          <textarea placeholder="Edit LaTeX here..."></textarea>
        </div>
        <div class="output"></div>
      `;
  
      this.select = this.shadowRoot.querySelector('select');
      this.textarea = this.shadowRoot.querySelector('textarea');
      this.output = this.shadowRoot.querySelector('.output');
      this.fileInput = this.shadowRoot.querySelector('input[type="file"]');
      this.exportButton = this.shadowRoot.getElementById('export-html');
  
      this.select.addEventListener('change', () => this.loadSelectedFile());
      this.textarea.addEventListener('input', () => this.renderLatex());
      this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
      this.exportButton.addEventListener('click', () => this.exportAsHTML());
    }
  
    connectedCallback() {
      const fileList = (this.getAttribute('files') || '')
        .split(',')
        .map(f => f.trim())
        .filter(Boolean);
  
      this.populateDropdown(fileList);
      if (fileList.length) {
        // Set the first file as the default selected option
        this.select.value = fileList[0];
        this.loadFile(fileList[0]);
      }
    }
  
    populateDropdown(fileList) {
      this.select.innerHTML = ''; // Clear any existing options
      for (const file of fileList) {
        const option = document.createElement('option');
        option.value = file;
        option.textContent = file.split('/').pop();
        this.select.appendChild(option);
      }
    }
  
    async loadSelectedFile() {
      const url = this.select.value;
      await this.loadFile(url);
    }
  
    async loadFile(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const text = await response.text();
        this.textarea.value = text;
        this.renderLatex();
      } catch (err) {
        this.output.innerHTML = `<p style="color:red;">${err.message}</p>`;
      }
    }
  
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file || !file.name.endsWith('.tex')) return;
      const text = await file.text();
      this.textarea.value = text;
      this.renderLatex();
    }
  
    renderLatex() {
      const full = this.textarea.value;
      const match = full.match(/\\begin\{document\}([\s\S]*)\\end\{document\}/);
      const bodyOnly = match ? match[1].trim() : full;
      try {
        const generator = new latexjs.HtmlGenerator({ hyphenate: false });
        latexjs.parse(bodyOnly, { generator });
        this.output.innerHTML = '';
        this.output.appendChild(generator.domFragment());
      } catch (e) {
        this.output.innerHTML = `<pre style="color:red;">${e.message}</pre>`;
      }
    }
  
    exportAsHTML() {
      const html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Exported LaTeX</title>
        <script src='https://unpkg.com/latex.js/dist/latex.min.js'></script></head>
        <body>${this.output.innerHTML}</body></html>`;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'latex-export.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  }
  
  customElements.define('latex-renderer', LatexRenderer);