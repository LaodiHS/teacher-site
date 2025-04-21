

const pdfjsLib = window['pdfjs-dist/build/pdf'];
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

class DocumentViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.documents = [];
    this.selectedDocument = null;
    this.pdfDoc = null;
    this.state = {
      pdfPage: 1,
      totalPages: 1,
      isRendering: false,
      error: null
    };
  }

  static get observedAttributes() {
    return ['documents'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'documents') {
      try {
        this.documents = JSON.parse(newValue);
        if (!Array.isArray(this.documents)) throw new Error('Documents must be an array');
        this.selectedDocument = this.documents[0] || null;
        this.state.error = null;
      } catch (error) {
        this.state.error = 'Invalid document data';
        this.documents = [];
        this.selectedDocument = null;
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 800px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
        }
        .container {
          background: #fff;
          padding: 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border-radius: 8px;
        }
        select {
          width: 100%;
          padding: 10px;
          margin-bottom: 16px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .viewer-container {
          width: 100%;
          height: 500px;
          border: 1px solid #ddd;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        canvas {
          width: 100%;
          height: auto;
          max-height: 500px;
        }
        .pagination {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        button {
          background: #007bff;
          color: #fff;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 4px;
        }
        button:disabled {
          background: #aaa;
          cursor: not-allowed;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
      </style>
      <div class="container">
        <select class="document-picker">
          ${this.documents.map((doc, index) => `
            <option value="${index}" ${index === 0 ? 'selected' : ''}>${doc.name}</option>
          `).join('')}
        </select>
        <div class="viewer-container">
          <canvas class="pdf-viewer"></canvas>
        </div>
        <div class="pagination">
          <button class="prev-page" disabled>← Previous</button>
          <span class="page-info">Page 1</span>
          <button class="next-page" disabled>Next →</button>
        </div>
        <button class="download-btn">Download PDF</button>
        <div class="error" hidden></div>
      </div>
    `;

    this.loadDocument();
    this.addEventListeners();
  }

  addEventListeners() {
    const picker = this.shadowRoot.querySelector('.document-picker');
    const prevBtn = this.shadowRoot.querySelector('.prev-page');
    const nextBtn = this.shadowRoot.querySelector('.next-page');
    const downloadBtn = this.shadowRoot.querySelector('.download-btn');

    picker.addEventListener('change', (e) => {
      this.selectedDocument = this.documents[parseInt(e.target.value, 10)];
      this.state.pdfPage = 1;
      this.loadDocument();
    });

    prevBtn.addEventListener('click', () => this.changePage(-1));
    nextBtn.addEventListener('click', () => this.changePage(1));

    downloadBtn.addEventListener('click', () => this.downloadFile());
  }

  async loadDocument() {
    if (!this.selectedDocument) {
      this.showError('No document selected.');
      return;
    }

    const errorDiv = this.shadowRoot.querySelector('.error');
    errorDiv.hidden = true;

    try {
      this.pdfDoc = await pdfjsLib.getDocument(this.selectedDocument.url).promise;
      this.state.totalPages = this.pdfDoc.numPages;
      this.renderPage();
    } catch (error) {
      console.error('Error loading PDF:', error);
      this.showError('Failed to load document.');
    }
  }

  async renderPage() {
    if (!this.pdfDoc || this.state.isRendering) return;

    this.state.isRendering = true;

    const page = await this.pdfDoc.getPage(this.state.pdfPage);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = this.shadowRoot.querySelector('.pdf-viewer');
    const ctx = canvas.getContext('2d');

    // Resize canvas to match PDF viewport
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    // If there's an existing render task, cancel it before starting a new one
    if (this.renderTask) {
        this.renderTask.cancel();
    }

    // Render the PDF page
    this.renderTask = page.render({ canvasContext: ctx, viewport });

    try {
        await this.renderTask.promise;
    } catch (error) {
        if (error.name !== "RenderingCancelledException") {
            console.error("Render failed:", error);
        }
    } finally {
        this.state.isRendering = false;
        this.renderTask = null;
    }

    // Update pagination UI
    this.updatePagination();
}

  updatePagination() {
    const prevBtn = this.shadowRoot.querySelector('.prev-page');
    const nextBtn = this.shadowRoot.querySelector('.next-page');
    const pageInfo = this.shadowRoot.querySelector('.page-info');

    pageInfo.textContent = `Page ${this.state.pdfPage} of ${this.state.totalPages}`;
    prevBtn.disabled = this.state.pdfPage <= 1;
    nextBtn.disabled = this.state.pdfPage >= this.state.totalPages;
  }

  async changePage(direction) {
    if (this.state.isRendering) return;
    
    this.state.pdfPage += direction;
    await this.renderPage();
  }

  async downloadFile() {
    if (!this.selectedDocument) return;
    
    try {
      const response = await fetch(this.selectedDocument.url);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = this.selectedDocument.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      this.showError('Download failed.');
    }
  }

  showError(message) {
    const errorDiv = this.shadowRoot.querySelector('.error');
    errorDiv.textContent = message;
    errorDiv.hidden = false;
  }
}

customElements.define('document-viewer', DocumentViewer);




