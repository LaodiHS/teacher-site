document.addEventListener('DOMContentLoaded', () => {
    class ImageAnnotator extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.canvasContainer = document.createElement('div');
        this.canvasContainer.style.width = '100%';
        this.canvasContainer.style.height = '100%';
        this.shadowRoot.appendChild(this.canvasContainer);
        this.imageSrc = null;
        this.stage = null;
        this.layer = null;
        this.imageNode = null;
        this.scale = 1;
        this.labelData = [];
        this.labels = [];
        this.normalizedLabels = [
          { x: 0.75, y: 0.1, text: '**High AWS Costs (高昂的 AWS 成本)' },
          { x: 0.75, y: 1.0, text: '**Memory Leak (Spark 作业中的内存泄漏)' },
          { x: 0.5, y: 0.2, text: '**Feature Work (升级风帆)' },
            { x: 0.1, y: 1.0, text: '⚓ Anchor / 锚' },
            { x: 0.18, y: 0.85, text: '🛶 Rudder / 舵' },
            { x: 0.4, y: 0.89, text: ' Hull / 船体' },
            { x: 0.89, y: 0.8, text: ' Bow / 船头' },
            { x: 0.6, y: 0.5, text: 'New Sail B / 帆B' },
            { x: 0.45, y: 0.4, text: 'New Sail A / 帆A' },
            { x: 0.5, y: 0.7, text: ' Mast / 桅杆' },
            { x: 0.7, y: 0.8, text: ' Deck / 甲板' }
          ];
      }
  
      connectedCallback() {
        this.imageSrc = this.getAttribute('src');
        if (!this.imageSrc) {
          console.error('No image source provided.');
          return;
        }
        this._initStage();
        window.addEventListener('resize', () => this._resize());
      }
  
      _initStage() {
        try {
          this.stage = new Konva.Stage({
            container: this.canvasContainer,
            width: this.canvasContainer.clientWidth,
            height: this.canvasContainer.clientHeight,
            draggable: true
          });
  
          this.layer = new Konva.Layer();
          this.stage.add(this.layer);
  
          Konva.Image.fromURL(this.imageSrc, (img) => {
            this.imageNode = img;
            img.setAttrs({ x: 0, y: 0 });
            this.layer.add(img);
  
            const checkAndInit = () => {
              if (!img.image().naturalWidth || !img.image().naturalHeight) {
                console.warn('Image dimensions not ready. Retrying...');
                setTimeout(checkAndInit, 50);
                return;
              }
  
              this._resize();
  
              // Add normalized labels
              this.normalizedLabels.forEach(label => {
                const konvaLabel = this._createLabel(label.text);
                this.labels.push({ konvaLabel, ...label });
                this.layer.add(konvaLabel);
              });
  
              this._positionLabels();
              this.layer.draw();
            };
  
            if (img.image().complete) {
              checkAndInit();
            } else {
              img.image().addEventListener('load', checkAndInit);
            }
  
            // Add click-to-annotate
            this.stage.on('click tap', (e) => {
              if (e.target !== this.imageNode) return;
              const pointer = this.stage.getPointerPosition();
              const normX = pointer.x / this.stage.width();
              const normY = pointer.y / this.stage.height();
              const label = this._createLabel('New Label');
              label.position({
                x: normX * this.stage.width(),
                y: normY * this.stage.height()
              });
              this.labels.push({ konvaLabel: label, x: normX, y: normY, text: 'New Label' });
              this.layer.add(label);
              this.layer.draw();
            });
  
            // Zooming
            this.stage.getContent().addEventListener('wheel', (e) => {
              e.preventDefault();
              const oldScale = this.stage.scaleX();
              const pointer = this.stage.getPointerPosition();
              const scaleBy = 1.05;
              const direction = e.deltaY > 0 ? -1 : 1;
              const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  
              const mousePointTo = {
                x: (pointer.x - this.stage.x()) / oldScale,
                y: (pointer.y - this.stage.y()) / oldScale,
              };
  
              this.stage.scale({ x: newScale, y: newScale });
              this.stage.position({
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
              });
  
              this.scale = newScale;
              this.stage.batchDraw();
            });
          });
        } catch (e) {
          console.error('Error initializing stage:', e);
        }
      }
  
      _createLabel(text) {
        const label = new Konva.Label({ draggable: true });
  
        label.add(new Konva.Tag({
          fill: 'black',
          pointerDirection: 'down',
          pointerWidth: 10,
          pointerHeight: 10,
          cornerRadius: 4
        }));
  
        const txt = new Konva.Text({
          text,
          fontFamily: 'Calibri',
          fontSize: 16,
          padding: 5,
          fill: 'white'
        });
  
        label.add(txt);
  
        label.on('dblclick dbltap', () => {
          const newText = prompt('Edit label:', txt.text());
          if (newText) txt.text(newText);
          this.layer.draw();
        });
  
        return label;
      }
  
      _resize() {
        try {
          if (!this.stage || !this.imageNode || !this.imageNode.image()) return;
  
          const containerWidth = this.canvasContainer.clientWidth;
          const containerHeight = this.canvasContainer.clientHeight;
  
          const imageRatio = this.imageNode.image().naturalWidth / this.imageNode.image().naturalHeight;
          const containerRatio = containerWidth / containerHeight;
  
          let newWidth, newHeight;
          if (containerRatio > imageRatio) {
            newHeight = containerHeight;
            newWidth = newHeight * imageRatio;
          } else {
            newWidth = containerWidth;
            newHeight = newWidth / imageRatio;
          }
  
          this.stage.width(newWidth);
          this.stage.height(newHeight);
          this.stage.scale({ x: 1, y: 1 });
          this.stage.position({ x: 0, y: 0 });
          this.imageNode.setAttrs({ width: newWidth, height: newHeight });
          this.scale = 1;
  
          this._positionLabels();
          this.layer.draw();
        } catch (e) {
          console.error('Resize error:', e);
        }
      }
  
      _positionLabels() {
        this.labels.forEach(labelObj => {
          const { konvaLabel, x, y } = labelObj;
          konvaLabel.position({
            x: x * this.stage.width(),
            y: y * this.stage.height()
          });
        });
      }
  
      exportJSON() {
        try {
          const data = this.labels.map(({ konvaLabel, text, x, y }) => {
            const [tag, txt] = konvaLabel.getChildren();
            return {
              x,
              y,
              text: txt.text()
            };
          });
          return JSON.stringify(data, null, 2);
        } catch (e) {
          console.error('Export error:', e);
          return '[]';
        }
      }
  
      importJSON(json) {
        try {
          const data = JSON.parse(json);
          data.forEach(({ x, y, text }) => {
            const label = this._createLabel(text);
            label.position({
              x: x * this.stage.width(),
              y: y * this.stage.height()
            });
            this.labels.push({ konvaLabel: label, x, y, text });
            this.layer.add(label);
          });
          this.layer.draw();
        } catch (e) {
          console.error('Invalid JSON import:', e);
        }
      }
    }
  
    customElements.define('image-annotator', ImageAnnotator);
  });
  