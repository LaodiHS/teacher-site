class StrategicMetaphor extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });

      const wrapper = document.createElement('div');
      wrapper.classList.add('container');
      wrapper.innerHTML = `
        <div class="section">
          <div class="column">
            <h2></h2>
            <p>
              Imagine you're sailing a boat that's been a <span class="highlight">reliable vessel for years</span>.
              You're about to upgrade its sails for <span class="highlight">better speed and agility</span> 
              (the feature work), but you notice a <span class="highlight">small leak in the hull</span> 
              (the memory leak in your Spark jobs). While the leak isn't sinking the ship yet, it's 
              <span class="highlight">causing extra drag and slowing you down</span> (the high AWS costs).
            </p>
            <p>
              Rather than pushing ahead with the new sails, you decide to <span class="highlight">dock and patch the hull first</span>.
              It takes time and delays your plans, but once the leak is fixed, the boat is <span class="highlight">lighter, more efficient</span>,
              and <span class="highlight">saves you extra effort on future journeys</span> (cutting $15k/month).
              Now, with the hull sound and the extra resources, you can <span class="highlight">add the new sails</span>
              knowing they'll perform even better than before.
            </p>
          </div>

          <div class="column">
            <h2></h2>
            <p>
              想象你正在驾驶一艘<span class="highlight">多年来一直可靠的船</span>。
              你准备升级风帆，以获得<span class="highlight">更快速度和更敏捷的操控</span>（即新增功能开发），
              但你发现船体有一个<span class="highlight">小漏洞</span>（就像你在 Spark 作业中发现的内存泄漏）。
              虽然这个漏洞暂时不会让船沉没，但它<span class="highlight">增加了阻力，使航行变得更慢</span>（类似于居高不下的 AWS 成本）。
            </p>
            <p>
              与其急于安装新风帆，你选择先<span class="highlight">靠岸修补船体</span>。
              虽然这会耗费一些时间并推迟原计划，但一旦修复完成，船体<span class="highlight">更轻盈，效率更高</span>，
              也为未来的航行<span class="highlight">省下了大量精力</span>（每月节省 $15,000）。
              现在，船体完好无损，你也有了更多资源，可以放心地<span class="highlight">升级风帆</span>，
              并确信它们的表现会比之前更出色。
            </p>
          </div>
        </div>
      `;

      const style = document.createElement('style');
      style.textContent = `
        .container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          font-family: "Segoe UI", sans-serif;
          background: #f9fafc;
          color: #333;
        }

        .section {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
          padding: 2rem;
        }

        .column {
          flex: 1;
        }

        h2 {
          font-size: 1.4rem;
          color: #004b91;
          margin-bottom: 1rem;
        }

        p {
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .highlight {
          background: #e6f7ff;
          padding: 0.2rem 0.4rem;
          border-radius: 5px;
          font-weight: bold;
          color: #00578d;
        }

        @media (max-width: 768px) {
          .section {
            flex-direction: column;
          }
        }
      `;

      shadow.appendChild(style);
      shadow.appendChild(wrapper);
    }
  }

  customElements.define('strategic-metaphor', StrategicMetaphor);