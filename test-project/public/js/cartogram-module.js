// public/js/cartogram-module.js
export function createCartogram(container) {
    // Load China's GeoJSON data (you can find this online or use a local file)

    const chinaGeoJSONUrl = "./data/geo-json-china.json";
  
    // Sample data for provinces and their classical works
    const provinceData = [
      { name: "北京", works: "《红楼梦》 (Dream of the Red Chamber)" }, // Beijing
      { name: "天津", works: "《津门杂记》 (Tales of Tianjin)" }, // Tianjin
      { name: "河北", works: "《史记》 (Records of the Grand Historian)" }, // Hebei
      { name: "山西", works: "《山西通志》 (Annals of Shanxi)" }, // Shanxi
      { name: "内蒙古", works: "《蒙古秘史》 (The Secret History of the Mongols)" }, // Inner Mongolia
      { name: "辽宁", works: "《辽东志》 (Annals of Liaodong)" }, // Liaoning
      { name: "吉林", works: "《吉林外记》 (Records of Jilin)" }, // Jilin
      { name: "黑龙江", works: "《黑龙江外记》 (Records of Heilongjiang)" }, // Heilongjiang
      { name: "上海", works: "《海上花列传》 (The Sing-Song Girls of Shanghai)" }, // Shanghai
      { name: "江苏", works: "《红楼梦》 (Dream of the Red Chamber)" }, // Jiangsu
      { name: "浙江", works: "《水浒传》 (Water Margin)" }, // Zhejiang
      { name: "安徽", works: "《庄子》 (Zhuangzi)" }, // Anhui
      { name: "福建", works: "《闽书》 (Annals of Fujian)" }, // Fujian
      { name: "江西", works: "《滕王阁序》 (Preface to the Pavilion of Prince Teng)" }, // Jiangxi
      { name: "山东", works: "《论语》 (The Analects)" }, // Shandong
      { name: "河南", works: "《诗经》 (Book of Songs)" }, // Henan
      { name: "湖北", works: "《楚辞》 (Chu Ci)" }, // Hubei
      { name: "湖南", works: "《岳阳楼记》 (Memorial to Yueyang Tower)" }, // Hunan
      { name: "广东", works: "《广东新语》 (New Tales of Guangdong)" }, // Guangdong
      { name: "广西", works: "《广西通志》 (Annals of Guangxi)" }, // Guangxi
      { name: "海南", works: "《琼台志》 (Annals of Hainan)" }, // Hainan
      { name: "重庆", works: "《巴县志》 (Annals of Ba County)" }, // Chongqing
      { name: "四川", works: "《三国演义》 (Romance of the Three Kingdoms)" }, // Sichuan
      { name: "贵州", works: "《贵州通志》 (Annals of Guizhou)" }, // Guizhou
      { name: "云南", works: "《滇志》 (Annals of Yunnan)" }, // Yunnan
      { name: "西藏", works: "《西藏王统记》 (The History of the Kings of Tibet)" }, // Tibet
      { name: "陕西", works: "《史记》 (Records of the Grand Historian)" }, // Shaanxi
      { name: "甘肃", works: "《甘肃通志》 (Annals of Gansu)" }, // Gansu
      { name: "青海", works: "《青海志》 (Annals of Qinghai)" }, // Qinghai
      { name: "宁夏", works: "《宁夏新志》 (New Annals of Ningxia)" }, // Ningxia
      { name: "新疆", works: "《西域闻见录》 (Records of the Western Regions)" }, // Xinjiang
      { name: "台湾", works: "《台湾府志》 (Annals of Taiwan)" }, // Taiwan
      { name: "香港", works: "《香港志》 (Annals of Hong Kong)" }, // Hong Kong
      { name: "澳门", works: "《澳门记略》 (Records of Macau)" }, // Macau
    ];
  

  const width = Math.min(window.innerWidth * 0.9, 800); // Responsive width
  const height = Math.min(window.innerHeight * 0.6, 600); // Responsive height

  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Load GeoJSON data and draw the map
  d3.json(chinaGeoJSONUrl).then((geojson) => {
    // Create a projection for China
    const projection = d3.geoMercator()
      .fitSize([width, height], geojson);

    // Create a path generator
    const path = d3.geoPath().projection(projection);

    // Draw provinces
    svg.selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mouseover touchstart", function (event, d) {
        // Highlight the province
        d3.select(this).attr("fill", "#ff7f0e");

        // Find the corresponding province data
        const province = provinceData.find((p) => p.name === d.properties.name);
        if (province) {
          // Display the classical works
          svg.append("text")
            .attr("x", width / 20)
            .attr("y", 150 ) // Adjust this value to ensure visibility
            .attr("dominant-baseline", "hanging")
            .attr("font-size", "16px")
            .attr("fill", "#333")
            .text(`${province.name}: ${province.works}`);
        }
      })
      .on("mouseout touchend", function () {
        // Reset the province color
        d3.select(this).attr("fill", "#69b3a2");

        // Remove the text
        svg.selectAll("text").remove();
      });

    // Handle window resize
    window.addEventListener("resize", () => {
      const newWidth = Math.min(window.innerWidth * 0.9, 800);
      const newHeight = Math.min(window.innerHeight * 0.6, 600);

      // Update SVG dimensions
      svg.attr("width", newWidth).attr("height", newHeight);

      // Update projection and paths
      projection.fitSize([newWidth, newHeight], geojson);
      svg.selectAll("path").attr("d", path);
    });
  });
}