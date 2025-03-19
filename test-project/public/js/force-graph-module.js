// public/js/force-graph-module.js
export function createForceGraph(container) {
    // Load ForceGraph3D from a CDN
    const ForceGraph3D = window.ForceGraph3D;
  
    const data = {
      nodes: [
        // Water-related characters
        { id: '水', name: '水', description: { en: 'Water', zh: '水' }, group: 1 },
        { id: '氵', name: '氵', description: { en: 'Water radical', zh: '水字旁' }, group: 2 },
        { id: '河', name: '河', description: { en: 'River', zh: '河' }, group: 1 },
        { id: '湖', name: '湖', description: { en: 'Lake', zh: '湖' }, group: 1 },
        { id: '海', name: '海', description: { en: 'Sea', zh: '海' }, group: 1 },
        { id: '江', name: '江', description: { en: 'River (large)', zh: '江' }, group: 1 },
        { id: '溪', name: '溪', description: { en: 'Stream', zh: '溪' }, group: 1 },
        { id: '波', name: '波', description: { en: 'Wave', zh: '波' }, group: 1 },
        { id: '浪', name: '浪', description: { en: 'Wave (large)', zh: '浪' }, group: 1 },
        { id: '洋', name: '洋', description: { en: 'Ocean', zh: '洋' }, group: 1 },
    
        // Fire-related characters
        { id: '火', name: '火', description: { en: 'Fire', zh: '火' }, group: 3 },
        { id: '灬', name: '灬', description: { en: 'Fire radical', zh: '火字底' }, group: 4 },
        { id: '炎', name: '炎', description: { en: 'Flame', zh: '炎' }, group: 3 },
        { id: '热', name: '热', description: { en: 'Heat', zh: '热' }, group: 3 },
        { id: '烧', name: '烧', description: { en: 'Burn', zh: '烧' }, group: 3 },
        { id: '烤', name: '烤', description: { en: 'Roast', zh: '烤' }, group: 3 },
        { id: '灯', name: '灯', description: { en: 'Lamp', zh: '灯' }, group: 3 },
        { id: '烟', name: '烟', description: { en: 'Smoke', zh: '烟' }, group: 3 },
        { id: '煤', name: '煤', description: { en: 'Coal', zh: '煤' }, group: 3 },
    
        // Wood-related characters
        { id: '木', name: '木', description: { en: 'Wood', zh: '木' }, group: 5 },
        { id: '林', name: '林', description: { en: 'Forest', zh: '林' }, group: 5 },
        { id: '森', name: '森', description: { en: 'Dense forest', zh: '森' }, group: 5 },
        { id: '树', name: '树', description: { en: 'Tree', zh: '树' }, group: 5 },
        { id: '枝', name: '枝', description: { en: 'Branch', zh: '枝' }, group: 5 },
        { id: '根', name: '根', description: { en: 'Root', zh: '根' }, group: 5 },
        { id: '材', name: '材', description: { en: 'Material', zh: '材' }, group: 5 },
        { id: '板', name: '板', description: { en: 'Board', zh: '板' }, group: 5 },
        { id: '桌', name: '桌', description: { en: 'Table', zh: '桌' }, group: 5 },
    
        // Earth-related characters
        { id: '土', name: '土', description: { en: 'Earth', zh: '土' }, group: 7 },
        { id: '地', name: '地', description: { en: 'Ground', zh: '地' }, group: 7 },
        { id: '场', name: '场', description: { en: 'Field', zh: '场' }, group: 7 },
        { id: '坡', name: '坡', description: { en: 'Slope', zh: '坡' }, group: 7 },
        { id: '城', name: '城', description: { en: 'City', zh: '城' }, group: 7 },
        { id: '墙', name: '墙', description: { en: 'Wall', zh: '墙' }, group: 7 },
        { id: '块', name: '块', description: { en: 'Piece', zh: '块' }, group: 7 },
        { id: '堆', name: '堆', description: { en: 'Pile', zh: '堆' }, group: 7 },
        { id: '塔', name: '塔', description: { en: 'Tower', zh: '塔' }, group: 7 },
    
        // Metal-related characters
        { id: '金', name: '金', description: { en: 'Metal', zh: '金' }, group: 9 },
        { id: '钅', name: '钅', description: { en: 'Metal radical', zh: '金字旁' }, group: 10 },
        { id: '铁', name: '铁', description: { en: 'Iron', zh: '铁' }, group: 9 },
        { id: '铜', name: '铜', description: { en: 'Copper', zh: '铜' }, group: 9 },
        { id: '银', name: '银', description: { en: 'Silver', zh: '银' }, group: 9 },
        { id: '钢', name: '钢', description: { en: 'Steel', zh: '钢' }, group: 9 },
        { id: '针', name: '针', description: { en: 'Needle', zh: '针' }, group: 9 },
        { id: '钟', name: '钟', description: { en: 'Clock', zh: '钟' }, group: 9 },
        { id: '钱', name: '钱', description: { en: 'Money', zh: '钱' }, group: 9 },
      ],
      links: [
        // Water-related links
        { source: '水', target: '氵' },
        { source: '氵', target: '河' },
        { source: '氵', target: '湖' },
        { source: '氵', target: '海' },
        { source: '氵', target: '江' },
        { source: '氵', target: '溪' },
        { source: '氵', target: '波' },
        { source: '氵', target: '浪' },
        { source: '氵', target: '洋' },
    
        // Fire-related links
        { source: '火', target: '灬' },
        { source: '灬', target: '炎' },
        { source: '灬', target: '热' },
        { source: '灬', target: '烧' },
        { source: '灬', target: '烤' },
        { source: '灬', target: '灯' },
        { source: '灬', target: '烟' },
        { source: '灬', target: '煤' },
    
        // Wood-related links
        { source: '木', target: '林' },
        { source: '木', target: '森' },
        { source: '木', target: '树' },
        { source: '木', target: '枝' },
        { source: '木', target: '根' },
        { source: '木', target: '材' },
        { source: '木', target: '板' },
        { source: '木', target: '桌' },
    
        // Earth-related links
        { source: '土', target: '地' },
        { source: '土', target: '场' },
        { source: '土', target: '坡' },
        { source: '土', target: '城' },
        { source: '土', target: '墙' },
        { source: '土', target: '块' },
        { source: '土', target: '堆' },
        { source: '土', target: '塔' },
    
        // Metal-related links
        { source: '金', target: '钅' },
        { source: '钅', target: '铁' },
        { source: '钅', target: '铜' },
        { source: '钅', target: '银' },
        { source: '钅', target: '钢' },
        { source: '钅', target: '针' },
        { source: '钅', target: '钟' },
        { source: '钅', target: '钱' },
      ],
    };
  
    // Create the 3D force-directed graph
    const graph = ForceGraph3D()(container)
      .graphData(data)
      .nodeLabel((node) => `${node.name}\n${node.description.zh}\n${node.description.en}`)
      .nodeAutoColorBy('group')
      .linkDirectionalArrowLength(3.5)
      .linkDirectionalArrowRelPos(1)
      .linkCurvature(0.25)
      .onNodeHover((node) => (container.style.cursor = node ? 'pointer' : null))
      .onNodeClick((node) => {
        // Zoom in on the clicked node
        graph.cameraPosition(
          { x: node.x + 10, y: node.y + 10, z: node.z + 10 }, // New position
          node, // Look at the node
          3000 // Transition duration
        );
      });
  
    return graph;
  }