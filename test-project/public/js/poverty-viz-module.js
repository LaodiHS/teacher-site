export function createPovertyViz(container) {
    const data = [
      {year: 1978, lifted: 25e6},
      {year: 1990, lifted: 150e6},
      {year: 2000, lifted: 400e6},
      {year: 2010, lifted: 600e6},
      {year: 2020, lifted: 800e6}
    ];
  
    const margin = {top: 40, right: 40, bottom: 80, left: 80};
    const width = 1200 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
  
    const svg = d3.select(container)
      .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([0, width])
      .padding(0.2);
  
    const y = d3.scaleLinear()
      .domain([0, 800e6])
      .range([height, 0]);
  
    // Axes
    const xAxis = g => g
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => d));
  
    const yAxis = g => g
      .call(d3.axisLeft(y).ticks(6).tickFormat(d3.format("~s")));
  
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
  
    // Animated bars
    const bars = svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.year))
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "#8b4513")
      .attr("rx", 4);
  
    // Timeline animation
    let currentYear = 0;
    let isPlaying = false;
    const duration = 1500;
  
    function update(yearIndex) {
      bars.transition()
        .duration(duration)
        .attr("y", d => y(d.lifted))
        .attr("height", d => height - y(d.lifted));
  
      d3.select("#timeline-counter")
        .text(formatNumber(data[yearIndex].lifted));
    }
  
    function formatNumber(num) {
      return d3.format(".3s")(num).replace(/G/, "B");
    }
  
    // Controls
    d3.select("#play-pause").on("click", () => {
      isPlaying = !isPlaying;
      d3.select("#play-pause").text(isPlaying ? "⏸ Pause" : "▶ Play");
      if(isPlaying) animate();
    });
  
    function animate() {
      if(currentYear < data.length - 1 && isPlaying) {
        currentYear++;
        update(currentYear);
        setTimeout(animate, duration);
      } else {
        isPlaying = false;
        d3.select("#play-pause").text("▶ Play");
      }
    }
  
    // Initial update
    update(0);
  }