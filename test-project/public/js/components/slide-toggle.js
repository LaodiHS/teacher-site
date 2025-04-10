class SlideToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isToggled = false;
        this.targetElement = null;
    }

    static get observedAttributes() {
        return ['target', 'active-color', 'inactive-color'];
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
        this.updateTarget();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'target') {
            this.updateTarget();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: inline-block;
                cursor: pointer;
                user-select: none;
            }

            .toggle-container {
                width: 60px;
                height: 30px;
                background: var(--inactive-color, #ddd);
                border-radius: 15px;
                position: relative;
                transition: background 0.3s ease-in-out;
                display: flex;
                align-items: center;
                padding: 2px;
            }

            .slider {
                width: 26px;
                height: 26px;
                background: white;
                border-radius: 50%;
                position: absolute;
                left: 2px;
                transition: transform 0.3s ease-in-out;
                box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
            }

            :host(.active) .toggle-container {
                background: var(--active-color, #4caf50);
            }

            :host(.active) .slider {
                transform: translateX(30px);
            }
        </style>
        <div class="toggle-container">
            <div class="slider"></div>
        </div>
        `;
    }

    addEventListeners() {
        this.shadowRoot.querySelector('.toggle-container').addEventListener('click', () => this.toggle());
    }

    updateTarget() {
        const targetSelector = this.getAttribute('target');
        this.targetElement = targetSelector ? document.querySelector(targetSelector) : null;
    }

    toggle() {
        this.isToggled = !this.isToggled;
        this.classList.toggle('active', this.isToggled);
        
        if (this.targetElement) {
            this.targetElement.style.display = this.isToggled ? 'block' : 'none';
        }
    }
}

customElements.define('slide-toggle', SlideToggle);
