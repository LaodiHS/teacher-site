class ContactGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        const wechatQR = this.getAttribute("wechat") || "https://via.placeholder.com/200";

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                    background: #f9f9f9;
                    padding: 16px;
                }
                .container {
                    display: grid;
                    gap: 16px;
                    max-width: 600px;
                    width: 100%;
                    margin: auto;
                }
                .grid-item {
                    background: white;
                    padding: 16px;
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .wechat img {
                    width: 100%;
                    max-width: 200px;
                    display: block;
                    margin: 0 auto;
                    border-radius: 8px;
                }
                .copyright {
                    text-align: center;
                    font-size: 0.9em;
                    color: gray;
                }
                @media (min-width: 480px) {
                    .container {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    }
                }
            </style>

            <div class="container">
                <div class="grid-item">
                    <slot name="contact">
                        <h2>Contact Information</h2>
                        <p><strong>Email:</strong> example@email.com</p>
                        <p><strong>Phone:</strong> +1 234 567 890</p>
                        <p><strong>Address:</strong> 123 Example Street, City, Country</p>
                    </slot>
                </div>

                <div class="grid-item">
                    <slot name="certification">
                        <h2>Certification</h2>
                        <p>Certified in XYZ | ISO 9001:2024 | Professional License #12345</p>
                    </slot>
                </div>

                <div class="grid-item wechat">
                    <h2>WeChat</h2>
                    <img src="${wechatQR}" alt="WeChat QR Code">
                </div>

                <div class="grid-item copyright">
                    <slot name="copyright">
                        <p>&copy; 2025 Your Company. All Rights Reserved.</p>
                    </slot>
                </div>
            </div>
        `;
    }
}

customElements.define("contact-grid", ContactGrid);
