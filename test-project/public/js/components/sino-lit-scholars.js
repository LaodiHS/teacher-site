
  class SinoLitScholar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          :host {
            --primary-color: #8b0000; /* Deep red for cultural significance */
            --accent-color: #ffd700; /* Gold accents */
            --text-color: #2f4f4f;
            --card-bg: #fffaf0;
            display: block;
            font-family: 'SimSun', serif;
          }

          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
            background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" font-size="22" fill="%23f0f0f0" opacity="0.3" dominant-baseline="middle" text-anchor="middle">文</text></svg>');
          }

          .grid {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }

          .literature-card {
            background: var(--card-bg);
            border-radius: 8px;
            padding: 1.5rem;
            border: 1px solid var(--primary-color);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            position: relative;
          }

          .cultural-bridge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: var(--primary-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 15px;
            font-size: 0.8rem;
            transform: rotate(5deg);
          }

          .card-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .card-icon {
            width: 50px;
            height: 50px;
            filter: drop-shadow(2px 2px 1px rgba(0,0,0,0.1));
          }

          h3 {
            color: var(--primary-color);
            margin: 0;
            font-size: 1.4rem;
          }

          .author {
            color: var(--accent-color);
            font-style: italic;
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
            border-left: 3px solid var(--primary-color);
            display: flex;
            align-items: center;
            gap: 0.8rem;
          }

          .qr-section {
            margin-top: 1rem;
            border-top: 1px dashed var(--primary-color);
            padding-top: 1rem;
            text-align: center;
          }

          .qr-code {
            width: 80px;
            height: 80px;
            background: #eee;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
          }

          @media (max-width: 768px) {
            .container {
              padding: 1rem;
            }
            
            .card-header {
              flex-direction: column;
              text-align: center;
            }
          }
        </style>

        <div class="container">
          <div class="grid">
            <!-- Shakespeare Card -->
            <div class="literature-card">
              <div class="cultural-bridge">对比《三国演义》</div>
              <div class="card-header">
                <svg class="card-icon" viewBox="0 0 24 24">
                  <path fill="var(--primary-color)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <div>
                  <h3>莎士比亚戏剧精粹</h3>
                  <div class="author">William Shakespeare</div>
                </div>
              </div>
              <ul class="features">
                <li class="feature-item">
                  《亨利五世》- 领导力对比刘备管理艺术
                </li>
                <li class="feature-item">
                  《威尼斯商人》- 中外商业伦理比较
                </li>
                <li class="feature-item">
                  AI戏剧表演评分系统
                </li>
              </ul>
              <div class="qr-section">
                <div class="qr-code">扫码访问<br>双语注释版</div>
                <small>支持微信/钉钉扫码</small>
              </div>
            </div>

            <!-- American Classics Card -->
            <div class="literature-card">
              <div class="cultural-bridge">对比《红楼梦》</div>
              <div class="card-header">
                <svg class="card-icon" viewBox="0 0 24 24">
                  <path fill="var(--primary-color)" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                </svg>
                <div>
                  <h3>美国文学经典</h3>
                  <div class="author">F. Scott Fitzgerald & Edgar Allan Poe</div>
                </div>
              </div>
              <ul class="features">
                <li class="feature-item">
                  《了不起的盖茨比》- 中美梦对比分析
                </li>
                <li class="feature-item">
                  爱伦·坡惊悚小说 - 聊斋志异比较研究
                </li>
                <li class="feature-item">
                  VR 1920s纽约虚拟体验
                </li>
              </ul>
              <div class="qr-section">
                <div class="qr-code">扫码参加<br>在线文学圈</div>
                <small>支持微信/钉钉扫码</small>
              </div>
            </div>

            <!-- Modern Writers Card -->
            <div class="literature-card">
              <div class="cultural-bridge">对比武侠小说</div>
              <div class="card-header">
                <svg class="card-icon" viewBox="0 0 24 24">
                  <path fill="var(--primary-color)" d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z"/>
                </svg>
                <div>
                  <h3>现代文学探索</h3>
                  <div class="author">Stephen King & Modern Writers</div>
                </div>
              </div>
              <ul class="features">
                <li class="feature-item">
                  恐怖元素的中西文化解读
                </li>
                <li class="feature-item">
                  创意写作工作坊(双语)
                </li>
                <li class="feature-item">
                  AI故事续写竞赛平台
                </li>
              </ul>
              <div class="qr-section">
                <div class="qr-code">扫码体验<br>AR文学地图</div>
                <small>支持微信/钉钉扫码</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  customElements.define('sino-lit-scholar', SinoLitScholar);


