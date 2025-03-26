
const schemeCategory10= d3.schemeCategory10
const scaleOrdinal = d3.scaleOrdinal;
const scaleSqrt = d3.scaleSqrt
const geoPath = d3.geoPath;
const geoMercator = d3.geoMercator;
export function createDaoismFlowMap(container) {
    const width = 1200, height = 900;
    const currentYear = parseInt(d3.select("#yearSlider").property("value"), 10);
    
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Enhanced tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "daoism-tooltip")
        .style("position", "absolute")
        .style("background", "rgba(255, 255, 255, 0.97)")
        .style("border", "1px solid #aaa")
        .style("border-radius", "5px")
        .style("padding", "12px")
        .style("font-family", "'Noto Sans SC', Arial, sans-serif")
        .style("font-size", "14px")
        .style("box-shadow", "0 3px 10px rgba(0,0,0,0.3)")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("z-index", "1000")
        .style("max-width", "350px");

    // Celestial Masters data with locations
    const celestialMasters = [
        {
            number: 1,
            name: "Zhang Daoling",
            chinese: "张道陵",
            dates: "34-156 CE",
            location: "Mount Qingcheng, Sichuan",
            coordinates: [103.57, 30.90],
            bio: "Founder of the Way of the Celestial Masters (Tianshi Dao). Received revelation from Laozi in 142 CE. Established 24 dioceses and formalized Daoist rituals. Credited with writing the Xiang'er commentary on the Dao De Jing.",
            contributions: [
                "Founded first organized Daoist religious movement",
                "Created theocratic community in Sichuan",
                "Developed early Daoist liturgical practices",
                "Introduced healing through confession and repentance"
            ],
            works: ["Xiang'er commentary", "Laozi Xiang'er Zhu"]
        },
        {
            number: 2,
            name: "Zhang Heng",
            chinese: "张衡",
            dates: "?-179 CE",
            location: "Luoyang, Henan",
            coordinates: [112.45, 34.62],
            bio: "Second Celestial Master who expanded the movement's influence to the imperial capital. Strengthened connections between Daoist practice and imperial court rituals.",
            contributions: [
                "Systematized the registration of Daoist households",
                "Expanded the 24 dioceses system",
                "Bridged folk Daoism and court religion"
            ],
            works: []
        },
        {
            number: 3,
            name: "Zhang Lu",
            chinese: "张鲁",
            dates: "?-215 CE",
            location: "Hanzhong, Shaanxi",
            coordinates: [107.02, 33.07],
            bio: "Established the theocratic state of Hanzhong that lasted for 30 years. Implemented communal grain storage and ethical governance systems. Surrendered to Cao Cao in 215 CE but secured protection for Celestial Masters tradition.",
            contributions: [
                "Created Daoist utopian community in Hanzhong",
                "Instituted 'charity houses' for travelers",
                "Developed early Daoist social welfare systems",
                "Preserved tradition during political turmoil"
            ],
            works: ["Laozi Xiang'er Zhu (attributed)"]
        },
        {
            number: 4,
            name: "Zhang Sheng",
            chinese: "张盛",
            dates: "3rd century CE",
            location: "Longhu Shan, Jiangxi",
            coordinates: [116.97, 28.12],
            bio: "Relocated the Celestial Masters headquarters to Longhu Shan (Dragon and Tiger Mountain), establishing it as the permanent center of Zhengyi Daoism.",
            contributions: [
                "Established Longhu Shan as spiritual center",
                "Began construction of Shangqing Palace",
                "Strengthened lineage transmission rituals"
            ],
            works: []
        },
        // Additional significant masters with expanded details
        {
            number: 9,
            name: "Zhang Fu",
            chinese: "张符",
            dates: "5th century CE",
            location: "Longhu Shan, Jiangxi",
            coordinates: [116.97, 28.12],
            bio: "Consolidated ritual traditions during the turbulent Northern and Southern Dynasties period. Standardized ordination ceremonies.",
            contributions: [
                "Systematized Daoist ordination ranks",
                "Integrated Lingbao rituals into Zhengyi practice",
                "Strengthened ties with southern aristocratic families"
            ],
            works: ["Zhengyi Fawen (compilation)"]
        },
        {
            number: 24,
            name: "Zhang Zhengsui",
            chinese: "张正随",
            dates: "fl. 1015 CE",
            location: "Kaifeng, Henan",
            coordinates: [114.30, 34.80],
            bio: "Received imperial recognition from Song Emperor Zhenzong, marking official court acceptance of the Celestial Masters. Granted title 'Master of Virtue' (Xiansheng).",
            contributions: [
                "Established formal relationship with Song court",
                "Standardized Daoist register transmission",
                "Began tradition of imperial-bestowed titles"
            ],
            works: []
        },
        {
            number: 30,
            name: "Zhang Jixian",
            chinese: "张继先",
            dates: "1092–1126 CE",
            location: "Longhu Shan, Jiangxi",
            coordinates: [116.97, 28.12],
            bio: "Prodigy who became Celestial Master at age 9. Reformed ritual practices and emphasized inner alchemy. Summoned multiple times by Emperor Huizong for rain-making and exorcisms.",
            contributions: [
                "Integrated inner alchemy with ritual practice",
                "Created new talismanic writing styles",
                "Strengthened Thunder Rituals (Leifa)"
            ],
            works: ["Mingzhen Ke", "Xiehou Yu"]
        },
        {
            number: 35,
            name: "Zhang Keda",
            chinese: "张可大",
            dates: "1218–1263 CE",
            location: "Hangzhou, Zhejiang",
            coordinates: [120.15, 30.25],
            bio: "Recognized by both Southern Song and Mongol courts. Advised Kublai Khan on Daoist matters before the fall of Song. Preserved texts during turbulent transition period.",
            contributions: [
                "Maintained tradition during Mongol conquest",
                "Mediated between Quanzhen and Zhengyi schools",
                "Preserved ritual texts during warfare"
            ],
            works: ["Zhengyi Jiaozang (compilation)"]
        },
        {
            number: 43,
            name: "Zhang Yuchu",
            chinese: "张宇初",
            dates: "1361–1410 CE",
            location: "Nanjing, Jiangsu",
            coordinates: [118.78, 32.04],
            bio: "The most scholarly Celestial Master, compiled the first Daoist Canon under Ming patronage. Synthesized Confucian, Buddhist and Daoist thought in his writings.",
            contributions: [
                "Edited first Ming Dynasty Daoist Canon",
                "Wrote influential philosophical treatises",
                "Standardized ritual performance",
                "Integrated Neo-Confucian thought"
            ],
            works: ["Daojiao Yi", "Longhu Shan Zhi", "Duren Shangpin Miaojing Tongyi"]
        },
        {
            number: 52,
            name: "Zhang Yingjing",
            chinese: "张应京",
            dates: "17th century CE",
            location: "Beijing",
            coordinates: [116.40, 39.90],
            bio: "Served during the Ming-Qing transition. Recognized by both dynasties to maintain religious continuity. Preserved texts during chaotic period.",
            contributions: [
                "Maintained lineage through dynastic change",
                "Protected Daoist texts during warfare",
                "Standardized temple ordination procedures"
            ],
            works: []
        },
        {
            number: 63,
            name: "Zhang Enpu",
            chinese: "张恩溥",
            dates: "1904–1969",
            location: "Taipei, Taiwan",
            coordinates: [121.56, 25.03],
            bio: "The 63rd Celestial Master who fled to Taiwan in 1949. Reestablished the lineage seat in Taiwan. Worked to maintain tradition during cultural disruptions.",
            contributions: [
                "Preserved lineage during Communist revolution",
                "Established Taiwan as new center for Zhengyi Dao",
                "Modernized transmission while keeping traditions",
                "Promoted Daoism internationally"
            ],
            works: ["Daoist Ritual Essentials"]
        },
        {
            number: 64,
            name: "Zhang Yuanxian",
            chinese: "張源先",
            dates: "1971–2008",
            location: "Taipei, Taiwan",
            coordinates: [121.56, 25.03],
            bio: "The 64th Celestial Master who modernized the tradition's global outreach. Established digital archives of Daoist texts. Faced controversies over lineage recognition.",
            contributions: [
                "Created first digital Daoist text repositories",
                "Oversaw international spread of Zhengyi Dao",
                "Standardized priest training programs",
                "Mediated mainland-Taiwan religious relations"
            ],
            works: ["Contemporary Daoist Practice"]
        }
    ];

    // Color and size scales
    const colorScale = scaleOrdinal()
        .domain(["Zhengyi", "Quanzhen", "Shangqing", "Lingbao"])
        .range(schemeCategory10);

    const influenceScale = scaleSqrt()
        .domain([0, 10])
        .range([2, 10]);

    const projection = geoMercator()
        .center([104, 35])
        .scale(600)
        .translate([width / 2, height / 2]);

    // Arrow marker definitions
    const defs = svg.append("defs");
    
    colorScale.domain().forEach(school => {
        defs.append("marker")
            .attr("id", `arrowhead-${school}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", colorScale(school));
    });

    d3.json("./data/countries_1.geojson")
        .then(function (china) {
            const chinaFeatures = china.features.filter(d => d.properties.ADMIN === "China");

            svg.append("g")
                .attr("class", "map-layer")
                .selectAll("path")
                .data(chinaFeatures)
                .enter()
                .append("path")
                .attr("d", geoPath().projection(projection))
                .attr("fill", "#f0f0f0")
                .attr("stroke", "#999");
            
            drawFlowMap();
            addCelestialMasters();
        });

    const nodes = [
        { id: "MountQingcheng", coordinates: [103.57, 30.90], year: 0, school: "Zhengyi", info: "Birthplace of Daoism" },
        { id: "Chengdu", coordinates: [104.06, 30.67], year: 100, school: "Zhengyi", info: "Early Daoist center in Sichuan" },
        { id: "Luoyang", coordinates: [112.45, 34.62], year: 150, school: "Shangqing", info: "Northern Wei Daoist center" },
        { id: "Beijing", coordinates: [116.40, 39.90], year: 1200, school: "Quanzhen", info: "Yuan dynasty Daoist expansion" },
        { id: "Shanghai", coordinates: [121.47, 31.23], year: 1400, school: "Lingbao", info: "Ming dynasty coastal spread" }
    ];

    const links = [
        { source: "MountQingcheng", target: "Chengdu", value: 10, year: 100, school: "Zhengyi", info: "Initial spread from birthplace" },
        { source: "MountQingcheng", target: "Luoyang", value: 8, year: 200, school: "Shangqing", info: "Northern expansion" },
        { source: "Luoyang", target: "Beijing", value: 6, year: 1250, school: "Quanzhen", info: "Mongol-era transmission" },
        { source: "Luoyang", target: "Shanghai", value: 5, year: 1400, school: "Lingbao", info: "Coastal trade routes" },
        { source: "Chengdu", target: "Shanghai", value: 4, year: 1600, school: "Zhengyi", info: "Late imperial period spread" }
    ];

    function drawFlowMap() {
        const flowLayer = svg.append("g").attr("class", "flow-layer");

        flowLayer.selectAll(".flow-path")
            .data(links)
            .enter().append("path")
            .attr("class", "flow-path")
            .attr("d", d => createCurvedPath(d, projection))
            .attr("fill", "none")
            .attr("stroke", d => colorScale(d.school))
            .attr("stroke-width", d => Math.sqrt(d.value) * 1.5)
            .attr("opacity", d => d.year <= currentYear ? 0.7 : 0)
            .attr("marker-end", d => d.year <= currentYear ? `url(#arrowhead-${d.school})` : null)
            .style("stroke-dasharray", d => influenceScale(d.value) > 5 ? "none" : "2,2")
            .on("mouseover", (event, d) => showTooltip(event, d, true))
            .on("mousemove", (event) => moveTooltip(event))
            .on("mouseout", () => hideTooltip());

        svg.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("cx", d => projection(d.coordinates)[0])
            .attr("cy", d => projection(d.coordinates)[1])
            .attr("r", d => {
                const outgoing = links.filter(l => l.source === d.id).reduce((sum, l) => sum + l.value, 0);
                const incoming = links.filter(l => l.target === d.id).reduce((sum, l) => sum + l.value, 0);
                return Math.sqrt(outgoing + incoming) * 0.8;
            })
            .attr("fill", d => colorScale(d.school))
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .attr("opacity", d => d.year <= currentYear ? 1 : 0)
            .on("mouseover", (event, d) => showTooltip(event, d, false))
            .on("mousemove", (event) => moveTooltip(event))
            .on("mouseout", () => hideTooltip());

        svg.selectAll(".city-label")
            .data(nodes)
            .enter().append("text")
            .attr("class", "city-label")
            .attr("x", d => projection(d.coordinates)[0] + 10)
            .attr("y", d => projection(d.coordinates)[1] + 5)
            .text(d => d.id)
            .attr("font-size", "12px")
            .attr("opacity", d => d.year <= currentYear ? 0.8 : 0);
    }

    function addCelestialMasters() {
        const mastersLayer = svg.append("g").attr("class", "masters-layer");

        mastersLayer.selectAll(".master-marker")
            .data(celestialMasters)
            .enter().append("circle")
            .attr("class", "master-marker")
            .attr("cx", d => projection(d.coordinates)[0])
            .attr("cy", d => projection(d.coordinates)[1])
            .attr("r", 5)
            .attr("fill", "#d62728")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)
            .on("mouseover", (event, d) => {
                tooltip.html(`
                    <div style="border-bottom:1px solid #eee;margin-bottom:8px;padding-bottom:8px">
                        <strong>${d.number}. ${d.name} (${d.chinese})</strong>
                    </div>
                    <div style="margin-bottom:8px">
                        <span style="color:#666">Location: </span>${d.location}<br>
                        <span style="color:#666">Active: </span>${d.dates}
                    </div>
                    <div>Bio:</div>
                    <div>${d.bio}</div>
                    <div>Contrabutions:</div>
                    <div>${d.contributions.map(c => `<li>${c}</li>`).join("")}</div>
                `)
                .style("opacity", 1);
            })
            .on("mousemove", (event) => {
                tooltip.style("left", (event.pageX + 15) + "px")
                      .style("top", (event.pageY - 30) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });

        // Add small labels for master locations
        mastersLayer.selectAll(".master-label")
            .data(celestialMasters)
            .enter().append("text")
            .attr("class", "master-label")
            .attr("x", d => projection(d.coordinates)[0] + 8)
            .attr("y", d => projection(d.coordinates)[1] + 3)
            .text(d => d.number)
            .attr("font-size", "9px")
            .attr("fill", "#fff");
    }

    function createCurvedPath(d, projection) {
        const source = nodes.find(n => n.id === d.source);
        const target = nodes.find(n => n.id === d.target);
        const [x1, y1] = projection(source.coordinates);
        const [x2, y2] = projection(target.coordinates);
        
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dr = Math.sqrt(dx * dx + dy * dy);
        const curvature = 0.3;
        
        const path = d3.path();
        path.moveTo(x1, y1);
        path.quadraticCurveTo(
            x1 + dx * 0.5 - dy * curvature,
            y1 + dy * 0.5 + dx * curvature,
            x2, y2
        );
        return path.toString();
    }

    function showTooltip(event, d, isPath) {
        const content = isPath 
            ? `<strong>${d.source} → ${d.target}</strong><br>
               School: ${d.school}<br>
               Influence: ${d.value}/10<br>
               ${d.info}<br>
               Year: ${d.year}${d.year < 1000 ? " BCE" : " CE"}`
            : `<strong>${d.id}</strong><br>
               School: ${d.school}<br>
               ${d.info}<br>
               Year: ${d.year}${d.year < 1000 ? " BCE" : " CE"}`;

        tooltip.html(content)
            .style("opacity", 1)
            .style("left", (event.pageX + 15) + "px")
            .style("top", (event.pageY - 30) + "px");
    }

    function moveTooltip(event) {
        tooltip.style("left", (event.pageX + 15) + "px")
              .style("top", (event.pageY - 30) + "px");
    }

    function hideTooltip() {
        tooltip.style("opacity", 0);
    }
}