class ChineseLiteraryScholar extends HTMLElement {
    constructor() {
        super();
        this.language = 'chinese';
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
                :host {
                    --primary-color: #2c5f2d;
                    --accent-color: #ffb400;
                    --text-color: #3a3a3a;
                    --card-bg: #fff9e6;
                    display: block;
                    font-family: 'SimSun', serif;
                    position: relative;
                }

                .lang-toggle {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: var(--accent-color);
                    color: var(--primary-color);
                    border: 2px solid var(--primary-color);
                    border-radius: 20px;
                    padding: 8px 16px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s;
                    z-index: 100;
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 2rem;
                    background-image: repeating-linear-gradient(45deg, #fff9e6 0px, #fff9e6 10px, transparent 10px, transparent 20px);
                }

                .grid {
                    display: grid;
                    gap: 1.5rem;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                }

                .culture-card {
                    background: var(--card-bg);
                    border-radius: 12px;
                    padding: 1.5rem;
                    border: 2px solid var(--primary-color);
                    position: relative;
                    transition: transform 0.3s;
                }

                .moral-tag {
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--accent-color);
                    color: var(--primary-color);
                    padding: 0.3rem 1rem;
                    border-radius: 15px;
                    font-weight: bold;
                }

                .card-header {
                    text-align: center;
                    border-bottom: 2px dashed var(--primary-color);
                    padding-bottom: 1rem;
                    margin-bottom: 1rem;
                }

                h3 {
                    color: var(--primary-color);
                    margin: 0.5rem 0;
                    font-size: 1.4rem;
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
                    border-left: 4px solid var(--primary-color);
                    transition: transform 0.3s;
                }

                .feature-item:hover {
                    transform: translateX(10px);
                }

                @media (max-width: 768px) {
                    .container {
                        padding: 1rem;
                    }
                }
            </style>

            <button class="lang-toggle">中文/EN</button>
            <div class="container">
                <div class="grid">
                    <!-- Divine Myths Card -->
                    <div class="culture-card">
                        <div class="moral-tag" data-lang-key="moralTag1">神圣创造</div>
                        <div class="card-header">
                            <h3 data-lang-key="divineHeader">神圣传说</h3>
                        </div>
                        <ul class="features">
                            <li class="feature-item" data-lang-key="feature1_1">女娲补天 - 创世VR体验</li>
                            <li class="feature-item" data-lang-key="feature1_2">西王母 - 仙境AR导航</li>
                            <li class="feature-item" data-lang-key="feature1_3">妈祖 - 海上救援模拟器</li>
                            <li class="feature-item" data-lang-key="feature1_4">嫘祖 - 丝绸制作数字实验室</li>
                        </ul>
                    </div>

                    <!-- Heroic Tales Card -->
                    <div class="culture-card">
                        <div class="moral-tag" data-lang-key="moralTag2">英雄气概</div>
                        <div class="card-header">
                            <h3 data-lang-key="heroicHeader">巾帼英雄</h3>
                        </div>
                        <ul class="features">
                            <li class="feature-item" data-lang-key="feature2_1">武则天 - 治国策略模拟器</li>
                            <li class="feature-item" data-lang-key="feature2_2">梁红玉 - 军事防御AR沙盘</li>
                            <li class="feature-item" data-lang-key="feature2_3">西施 - 间谍战术角色扮演</li>
                            <li class="feature-item" data-lang-key="feature2_4">卓文君 - 爱情诗词AI分析</li>
                        </ul>
                    </div>

                    <!-- Cultural Wisdom Card -->
                    <div class="culture-card">
                        <div class="moral-tag" data-lang-key="moralTag3">智慧结晶</div>
                        <div class="card-header">
                            <h3 data-lang-key="wisdomHeader">文化智慧</h3>
                        </div>
                        <ul class="features">
                            <li class="feature-item" data-lang-key="feature3_1">老子无为 - 哲学辩论平台</li>
                            <li class="feature-item" data-lang-key="feature3_2">岁寒三友 - 水墨动画工作室</li>
                            <li class="feature-item" data-lang-key="feature3_3">知音故事 - 音乐情感分析AI</li>
                            <li class="feature-item" data-lang-key="feature3_4">卫铄 - 书法AR临摹系统</li>
                        </ul>
                    </div>

                    <!-- Folk Legends Card -->
                    <div class="culture-card">
                        <div class="moral-tag" data-lang-key="moralTag4">民间传统</div>
                        <div class="card-header">
                            <h3 data-lang-key="folkHeader">民间传奇</h3>
                        </div>
                        <ul class="features">
                            <li class="feature-item" data-lang-key="feature4_1">牛郎织女 - 天文观测模拟</li>
                            <li class="feature-item" data-lang-key="feature4_2">端午节 - 龙舟流体力学实验</li>
                            <li class="feature-item" data-lang-key="feature4_3">蔡文姬 - 数字胡笳十八拍</li>
                            <li class="feature-item" data-lang-key="feature4_4">梁山伯与祝英台 - VR戏剧体验</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.renderContent();
        this.shadowRoot.querySelector('.lang-toggle')
            .addEventListener('click', () => this.toggleLanguage());
    }

    toggleLanguage() {
        this.language = this.language === 'chinese' ? 'english' : 'chinese';
        this.renderContent();
    }

    renderContent() {
        const translations = {
            moralTag1: { chinese: '神圣创造', english: 'Divine Creation' },
            divineHeader: { chinese: '神圣传说', english: 'Divine Myths' },
            feature1_1: { chinese: '女娲补天 - 创世VR体验', english: 'Nüwa Creation VR Experience' },
            feature1_2: { chinese: '西王母 - 仙境AR导航', english: 'Queen Mother AR Journey' },
            feature1_3: { chinese: '妈祖 - 海上救援模拟器', english: 'Mazu Sea Rescue Simulator' },
            feature1_4: { chinese: '嫘祖 - 丝绸制作数字实验室', english: 'Leizu Silk Digital Lab' },

            moralTag2: { chinese: '英雄气概', english: 'Heroic Spirit' },
            heroicHeader: { chinese: '巾帼英雄', english: 'Heroic Women' },
            feature2_1: { chinese: '武则天 - 治国策略模拟器', english: 'Wu Zetian Strategy Simulator' },
            feature2_2: { chinese: '梁红玉 - 军事防御AR沙盘', english: 'Liang Hongyu AR Defense' },
            feature2_3: { chinese: '西施 - 间谍战术角色扮演', english: 'Xishi Spy RPG' },
            feature2_4: { chinese: '卓文君 - 爱情诗词AI分析', english: 'Zhuo Wenjun Poetry AI' },

            moralTag3: { chinese: '智慧结晶', english: 'Cultural Wisdom' },
            wisdomHeader: { chinese: '文化智慧', english: 'Wisdom Traditions' },
            feature3_1: { chinese: '老子无为 - 哲学辩论平台', english: 'Laozi Debate Platform' },
            feature3_2: { chinese: '岁寒三友 - 水墨动画工作室', english: 'Three Friends Ink Studio' },
            feature3_3: { chinese: '知音故事 - 音乐情感分析AI', english: 'Zhiyin Music AI Analysis' },
            feature3_4: { chinese: '卫铄 - 书法AR临摹系统', english: 'Wei Shou AR Calligraphy' },

            moralTag4: { chinese: '民间传统', english: 'Folk Traditions' },
            folkHeader: { chinese: '民间传奇', english: 'Folk Legends' },
            feature4_1: { chinese: '牛郎织女 - 天文观测模拟', english: 'Cowherd & Weaver Astronomy' },
            feature4_2: { chinese: '端午节 - 龙舟流体力学实验', english: 'Dragon Boat Physics Lab' },
            feature4_3: { chinese: '蔡文姬 - 数字胡笳十八拍', english: 'Cai Wenji Digital Ballads' },
            feature4_4: { chinese: '梁山伯与祝英台 - VR戏剧体验', english: 'Butterfly Lovers VR Drama' }
        };

        this.shadowRoot.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            el.textContent = translations[key][this.language];
        });

        this.shadowRoot.querySelector('.lang-toggle').textContent = 
            this.language === 'chinese' ? '中文/EN' : 'EN/中文';
    }
}

customElements.define('chinese-literary-scholar', ChineseLiteraryScholar);
