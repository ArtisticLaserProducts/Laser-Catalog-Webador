// Save this as catalog_engine.js and upload to GitHub
const app = document.getElementById('catalog-app');
app.innerHTML = `
    <div style="font-family:sans-serif;text-align:center;margin-bottom:20px;">
        <input type="text" id="search" placeholder="Search 1,000+ models..." style="width:100%;max-width:400px;padding:12px;border-radius:25px;border:2px solid #333;">
        <p id="count" style="margin-top:10px;font-size:12px;"></p>
    </div>
    <div id="grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px;"></div>
`;

const grid = document.getElementById('grid');
const search = document.getElementById('search');

function render(items) {
    document.getElementById('count').innerText = `Showing ${items.length} Models`;
    grid.innerHTML = items.map(p => `
        <div style="border:1px solid #eee;padding:15px;border-radius:10px;display:flex;flex-direction:column;">
            <img src="${p.i}" style="width:100%;height:200px;object-fit:contain;">
            <small>${p.c}</small>
            <h3 style="margin:10px 0;">${p.n}</h3>
            <button onclick="alert('Contact ArtisticLaserProducts@gmail.com regarding: ${p.n}')" style="background:#333;color:white;padding:10px;border:none;border-radius:5px;cursor:pointer;margin-top:auto;">View Info / Purchase</button>
        </div>
    `).join('');
}

search.onkeyup = () => {
    const term = search.value.toLowerCase();
    const filtered = catalogData.filter(p => p.n.toLowerCase().includes(term) || p.c.toLowerCase().includes(term));
    render(filtered);
};

render(catalogData);