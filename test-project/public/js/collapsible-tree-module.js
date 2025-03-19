// public/js/collapsible-tree-module.js
export function createCollapsibleTree(container) {
    // Sample data for kingdoms, rulers, and myths
    const treeData = {
      name: "Ancient China",
      children: [
        {
          name: "Xia Dynasty (夏朝)",
          description: "The first dynasty in Chinese history, traditionally dated from 2070 to 1600 BCE.",
          children: [
            { name: "Yu the Great (大禹)", description: "Founder of the Xia Dynasty, known for controlling floods and establishing the concept of hereditary rule." },
            { name: "Qi of Xia (启)", description: "Son of Yu, the first hereditary ruler of China." },
            { name: "Jie of Xia (桀)", description: "The last ruler of the Xia Dynasty, known for his tyranny and downfall." },
            {
              name: "Legends",
              children: [
                { name: "Yu Controls the Floods (大禹治水)", description: "Legend of Yu the Great taming the floods and saving China." },
                { name: "The Nine Tripod Cauldrons (九鼎)", description: "Symbols of Yu's authority and the Xia Dynasty's legitimacy." },
              ],
            },
          ],
        },
        {
          name: "Shang Dynasty (商朝)",
          description: "The second dynasty, known for its advances in bronze casting and oracle bone script.",
          children: [
            { name: "Tang of Shang (汤)", description: "Overthrew the Xia Dynasty and established the Shang Dynasty." },
            { name: "Fu Hao (妇好)", description: "Queen and military general, known for her tomb's rich artifacts and inscriptions." },
            { name: "Di Xin (帝辛)", description: "The last ruler of the Shang Dynasty, also known as King Zhou, infamous for his cruelty." },
            {
              name: "Legends",
              children: [
                { name: "The Legend of King Zhou (纣王传说)", description: "Stories of King Zhou's tyranny and the fall of the Shang Dynasty." },
                { name: "The Oracle Bones (甲骨文)", description: "Mythical origins of the oracle bones used for divination." },
              ],
            },
          ],
        },
        {
          name: "Zhou Dynasty (周朝)",
          description: "The longest-lasting dynasty in Chinese history, divided into Western Zhou and Eastern Zhou.",
          children: [
            {
              name: "Western Zhou (西周)",
              description: "The early period of the Zhou Dynasty, marked by feudal rule and cultural development.",
              children: [
                { name: "King Wu of Zhou (周武王)", description: "Defeated the Shang Dynasty and established the Zhou Dynasty." },
                { name: "King Wen of Zhou (周文王)", description: "Father of King Wu, laid the foundation for the Zhou Dynasty." },
                { name: "Duke of Zhou (周公)", description: "Regent and philosopher, known for his contributions to Confucian thought." },
                {
                  name: "Legends",
                  children: [
                    { name: "The Mandate of Heaven (天命)", description: "The divine right to rule, central to Zhou political philosophy." },
                    { name: "The Duke of Zhou's Dream (周公解梦)", description: "Legends of the Duke of Zhou interpreting dreams." },
                  ],
                },
              ],
            },
            {
              name: "Eastern Zhou (东周)",
              description: "The later period of the Zhou Dynasty, divided into the Spring and Autumn Period and the Warring States Period.",
              children: [
                {
                  name: "Spring and Autumn Period (春秋时期)",
                  description: "An era of philosophical development, marked by the rise of Confucianism and Daoism.",
                  children: [
                    { name: "Confucius (孔子)", description: "Philosopher and teacher, founder of Confucianism." },
                    { name: "Laozi (老子)", description: "Philosopher and founder of Daoism, author of the 'Dao De Jing'." },
                    { name: "Sun Tzu (孙子)", description: "Military strategist, author of 'The Art of War'." },
                    {
                      name: "Legends",
                      children: [
                        { name: "The Yellow Emperor (黄帝)", description: "Legendary ruler and cultural hero, associated with the origins of Chinese civilization." },
                        { name: "The Battle of Zhuolu (涿鹿之战)", description: "Mythical battle between the Yellow Emperor and Chi You." },
                      ],
                    },
                  ],
                },
                {
                  name: "Warring States Period (战国时期)",
                  description: "An era of warfare and consolidation, leading to the unification of China under the Qin Dynasty.",
                  children: [
                    { name: "Qin Shi Huang (秦始皇)", description: "First emperor of China, unified the Warring States." },
                    { name: "Mencius (孟子)", description: "Confucian philosopher, known for his emphasis on human nature." },
                    { name: "Zhuangzi (庄子)", description: "Daoist philosopher, known for his parables and teachings." },
                    {
                      name: "Legends",
                      children: [
                        { name: "The Great Wall (长城)", description: "Legends surrounding the construction of the Great Wall." },
                        { name: "The Terracotta Army (兵马俑)", description: "Mythical stories about the Terracotta Army guarding Qin Shi Huang's tomb." },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Qin Dynasty (秦朝)",
          description: "The first imperial dynasty, known for the Terracotta Army and the Great Wall.",
          children: [
            { name: "Qin Shi Huang (秦始皇)", description: "First emperor of China, unified the Warring States and standardized writing, currency, and measurements." },
            { name: "Li Si (李斯)", description: "Chancellor of Qin, instrumental in the dynasty's legalist reforms." },
            { name: "Meng Tian (蒙恬)", description: "General who oversaw the construction of the Great Wall." },
            {
              name: "Legends",
              children: [
                { name: "The Burning of Books (焚书坑儒)", description: "Legends about Qin Shi Huang's suppression of dissent." },
                { name: "The Search for Immortality (求仙)", description: "Stories of Qin Shi Huang's quest for eternal life." },
              ],
            },
          ],
        },
        {
          name: "Han Dynasty (汉朝)",
          description: "A golden age of Chinese civilization, known for the Silk Road and Confucian statecraft.",
          children: [
            { name: "Emperor Gaozu of Han (汉高祖)", description: "Founder of the Han Dynasty, overthrew the Qin Dynasty." },
            { name: "Emperor Wu of Han (汉武帝)", description: "Expanded the empire and established Confucianism as the state ideology." },
            { name: "Zhang Qian (张骞)", description: "Explorer and diplomat, opened the Silk Road." },
            {
              name: "Legends",
              children: [
                { name: "The Cowherd and the Weaver Girl (牛郎织女)", description: "A love story celebrated during the Qixi Festival." },
                { name: "The Legend of Hua Mulan (花木兰)", description: "The story of a woman who disguised herself as a man to join the army." },
              ],
            },
          ],
        },
        {
          name: "Three Kingdoms (三国)",
          description: "A period of division and warfare, romanticized in the novel 'Romance of the Three Kingdoms'.",
          children: [
            { name: "Cao Cao (曹操)", description: "Warlord and poet, founder of the Wei Kingdom." },
            { name: "Liu Bei (刘备)", description: "Founder of the Shu Kingdom, portrayed as a virtuous leader." },
            { name: "Sun Quan (孙权)", description: "Founder of the Wu Kingdom, known for his naval prowess." },
            { name: "Zhuge Liang (诸葛亮)", description: "Strategist and chancellor of Shu, known for his wisdom." },
            {
              name: "Legends",
              children: [
                { name: "The Oath of the Peach Garden (桃园结义)", description: "The legendary oath of brotherhood between Liu Bei, Guan Yu, and Zhang Fei." },
                { name: "The Battle of Red Cliffs (赤壁之战)", description: "A legendary battle immortalized in literature and folklore." },
              ],
            },
          ],
        },
        {
          name: "Tang Dynasty (唐朝)",
          description: "A golden age of Chinese culture, known for poetry, art, and cosmopolitanism.",
          children: [
            { name: "Emperor Taizong of Tang (唐太宗)", description: "One of the greatest emperors, known for his reforms and military campaigns." },
            { name: "Li Bai (李白)", description: "One of China's greatest poets, known for his romantic and free-spirited works." },
            { name: "Du Fu (杜甫)", description: "Poet known for his realistic and socially conscious works." },
            {
              name: "Legends",
              children: [
                { name: "The Journey to the West (西游记)", description: "The legendary journey of the monk Xuanzang to India." },
                { name: "The Legend of Chang'e (嫦娥奔月)", description: "The story of the moon goddess Chang'e and the Mid-Autumn Festival." },
              ],
            },
          ],
        },
        {
          name: "Song Dynasty (宋朝)",
          description: "A period of economic prosperity and cultural achievements, known for Neo-Confucianism.",
          children: [
            { name: "Emperor Taizu of Song (宋太祖)", description: "Founder of the Song Dynasty, known for his military and administrative reforms." },
            { name: "Su Shi (苏轼)", description: "Poet, calligrapher, and statesman, one of the greatest literary figures of the Song Dynasty." },
            { name: "Zhu Xi (朱熹)", description: "Neo-Confucian philosopher, synthesized Confucian thought." },
            {
              name: "Legends",
              children: [
                { name: "The Legend of the White Snake (白蛇传)", description: "A love story between a human and a snake spirit." },
                { name: "The Butterfly Lovers (梁山伯与祝英台)", description: "A tragic love story often compared to Romeo and Juliet." },
              ],
            },
          ],
        },
      ],
    };

  
    // Function to initialize or update the tree
    function updateTree() {
      // Clear the container
      container.innerHTML = "";
    
      // Create the information bar
      const infoBar = d3.select("#info-bar")
        .style("opacity", 0);
    
      // Get container dimensions
      const containerRect = container.getBoundingClientRect();
      const width = containerRect.width * 0.95;
      const height = Math.max(400, containerRect.height * 0.8);
    
      // Create SVG container
      const svg = d3.select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [0, 0, width, height])
        .append("g")
        .attr("transform", `translate(50,50)`);
    
      // Create tree layout with dynamic spacing
      const treeLayout = d3.tree()
        .size([height - 100, width - 100])
        .nodeSize([60, 150])
        .separation((a, b) => (a.parent === b.parent ? 1 : 1.5));
    
      // Convert data to hierarchy
      const root = d3.hierarchy(treeData);
      treeLayout(root);
    
      // Draw links
      svg.selectAll(".link")
        .data(root.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x))
        .attr("stroke", "#999")
        .attr("fill", "none")
        .attr("stroke-width", 0.8);
    
      // Create node groups
      const nodes = svg.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);
    
      // Add circles to nodes
      nodes.append("circle")
        .attr("r", 5)
        .attr("fill", d => d.children ? "#69b3a2" : "#ff7f0e")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5);
    
      // Add text labels with responsive truncation
      nodes.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -15 : 15)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => {
          const maxChars = Math.floor(width / 25); // Dynamic character limit
          return d.data.name.length > maxChars ? 
            d.data.name.substring(0, maxChars) + "..." : 
            d.data.name;
        })
        .style("font-size", Math.min(14, width/60) + "px")
        .style("pointer-events", "none")
        .style("text-shadow", "0 1px 2px white");
    
      // Add zoom/pan capability
      const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", (event) => {
          svg.attr("transform", event.transform);
        });
    
      d3.select(container).select("svg")
        .call(zoom)
        .call(zoom.transform, d3.zoomIdentity);
    
      // Interactive elements
      nodes.on("mouseover touchstart", function(event, d) {
          infoBar.html(`
            <strong>${d.data.name}</strong><br>
            ${d.data.description || "No description available"}
          `).style("opacity", 1);
          
          d3.select(this).select("circle")
            .attr("r", 7)
            .attr("fill", "#e41a1c");
        })
        .on("mouseout touchend", function() {
          infoBar.style("opacity", 0);
          d3.select(this).select("circle")
            .attr("r", 5)
            .attr("fill", d => d.children ? "#69b3a2" : "#ff7f0e");
        });
    }

// Initialize the tree
updateTree();

// Handle window resize
window.addEventListener("resize", updateTree);
}