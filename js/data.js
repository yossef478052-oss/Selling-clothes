/* ============================================================
   HASSAN — Mock Data Layer (stand-in for a real API)
============================================================ */

const H_CATEGORIES = [
  { name: 'Outerwear', slug: 'outerwear' },
  { name: 'Shirts', slug: 'shirts' },
  { name: 'Knitwear', slug: 'knitwear' },
  { name: 'Trousers', slug: 'trousers' },
  { name: 'Denim', slug: 'denim' },
  { name: 'Accessories', slug: 'accessories' },
];

const H_COLORS = {
  Onyx: '#15151A', Charcoal: '#3B3B40', Camel: '#A9824C', Bone: '#D9D3C4', Gold: '#D4AF37', Bottle: '#2C4A3E'
};

function hImg(seed, w=700, h=900){
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
      <rect width='100%' height='100%' fill='${seed.bg}'/>
      <rect x='0' y='${h*0.58}' width='100%' height='${h*0.42}' fill='${seed.bg2}' opacity='0.5'/>
      <circle cx='${w*0.5}' cy='${h*0.3}' r='${w*0.2}' fill='${seed.fg}' opacity='0.14'/>
      <rect x='${w*0.1}' y='${h*0.08}' width='${w*0.8}' height='2' fill='${seed.fg}' opacity='0.25'/>
    </svg>`)}`;
}

const H_PALETTES = [
  {bg:'#1B1B1E', bg2:'#0E0E10', fg:'#D4AF37'},
  {bg:'#23211C', bg2:'#15140F', fg:'#F0D78C'},
  {bg:'#15151A', bg2:'#0A0A0B', fg:'#EDEDED'},
  {bg:'#2C2A24', bg2:'#1B1A16', fg:'#D4AF37'},
  {bg:'#1A1D1C', bg2:'#0F1110', fg:'#EDEDED'},
  {bg:'#201C18', bg2:'#120F0D', fg:'#A9824C'},
];

const H_PRODUCT_NAMES = [
  ['Tailored Wool Overcoat','outerwear'], ['Waxed Field Jacket','outerwear'], ['Quilted Bomber','outerwear'],
  ['Oxford Dress Shirt','shirts'], ['Brushed Flannel Shirt','shirts'], ['Mercerized Cotton Shirt','shirts'],
  ['Merino Crewneck','knitwear'], ['Cable Knit Cardigan','knitwear'], ['Ribbed Half-Zip','knitwear'],
  ['Pleated Wool Trouser','trousers'], ['Tapered Chino','trousers'], ['Wide-Leg Trouser','trousers'],
  ['Raw Selvedge Denim','denim'], ['Slim Stretch Denim','denim'], ['Relaxed Straight Denim','denim'],
  ['Full-Grain Leather Belt','accessories'], ['Silk Pocket Square','accessories'], ['Structured Weekend Bag','accessories'],
  ['Double-Breasted Coat','outerwear'], ['Cashmere Turtleneck','knitwear'], ['Pressed Suit Jacket','trousers'],
  ['Heavyweight Henley','shirts'], ['Cropped Straight Denim','denim'], ['Leather Card Holder','accessories'],
];

const H_SIZES = ['S','M','L','XL','XXL'];

function hBuildProducts(){
  return H_PRODUCT_NAMES.map((p, i) => {
    const palette = H_PALETTES[i % H_PALETTES.length];
    const price = 120 + (i * 23) % 480;
    const onSale = i % 5 === 0;
    const rating = (3.7 + (i % 5) * 0.28).toFixed(1);
    const reviewCount = 6 + (i * 9) % 160;
    const sizes = H_SIZES.map((s, si) => ({ label: s, stock: (i + si) % 4 === 0 ? 0 : 3 + ((i+si)%8) }));
    const colorNames = Object.keys(H_COLORS);
    const colors = [colorNames[i % colorNames.length], colorNames[(i+2) % colorNames.length], colorNames[(i+4) % colorNames.length]]
      .filter((v,idx,arr)=>arr.indexOf(v)===idx)
      .map(name => ({ name, hex: H_COLORS[name] }));
    return {
      id: 'h' + (i+1),
      slug: p[0].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: p[0],
      category: p[1],
      price: onSale ? Math.round(price * 0.75) : price,
      compareAt: onSale ? price : null,
      rating: parseFloat(rating),
      reviewCount,
      isNew: i % 6 === 1,
      isBestSeller: i % 7 === 2,
      colors,
      sizes,
      images: [0,1,2,3].map(() => hImg(palette)),
      description: 'Cut from premium materials and finished by hand. A considered piece designed to anchor a wardrobe, not chase a season.',
    };
  });
}

const H_PRODUCTS = hBuildProducts();
function hGetBySlug(slug){ return H_PRODUCTS.find(p => p.slug === slug); }
function hGetById(id){ return H_PRODUCTS.find(p => p.id === id); }
function hGetRelated(p, n=4){ return H_PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0,n); }

const H_REVIEWS = [
  { name: 'Omar F.', rating: 5, body: 'The overcoat is heavier and better made than anything I\'ve bought at this price point. Fits true to size.' },
  { name: 'James L.', rating: 5, body: 'Ordered the Oxford shirt in two colors after the first one arrived. The collar holds its shape all day.' },
  { name: 'Tariq H.', rating: 4, body: 'Excellent quality, slightly long in the sleeve for my arm length but tailoring sorted it in ten minutes.' },
  { name: 'Karim B.', rating: 5, body: 'Hassan has become my go-to for anything I need to look sharp in. Packaging alone feels premium.' },
];