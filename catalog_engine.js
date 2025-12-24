// catalog_engine.js - Final Version with Info Modal, Zoom, Categories, and Prices
const app = document.getElementById('catalog-app');
let itemsShown = 20;
let currentData = catalogData;

const categories = [...new Set(catalogData.map(item => item.c))].sort();
const categoryOptions = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');

app.innerHTML = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 1200px; margin: auto;">
        <div style="text-align: center; margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
            <div style="display: flex; gap: 10px; width: 100%; max-width: 600px; flex-wrap: wrap; justify-content: center;">
                <input type="text" id="search" placeholder="Search models..." style="flex:2; min-width:250px; padding:14px; border-radius:30px; border:2px solid #333; outline:none;">
                <select id="cat-filter" style="flex:1; min-width:150px; padding:14px; border-radius:30px; border:2px solid #333; background:white;">
                    <option value="">All Categories</option>
                    ${categoryOptions}
                </select>
            </div>
            <p id="count" style="color:#666; font-size:14px;"></p>
        </div>

        <div id="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;"></div>
        
        <div id="load-more-container" style="text-align:center; margin-top:40px; padding-bottom:80px;">
            <button id="load-more" style="background:#2a9d8f; color:white; padding:15px 40px; border:none; border-radius:10px; font-weight:bold; cursor:pointer; display:none;">Load More</button>
        </div>
    </div>

    <div id="infoModal" style="display:none; position:fixed; z-index:11000; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.8); align-items:center; justify-content:center; backdrop-filter:blur(5px);">
        <div style="background:white; padding:30px; border-radius:20px; max-width:500px; width:90%; position:relative;">
            <span onclick="closeModal()" style="position:absolute; right:20px; top:10px; font-size:30px; cursor:pointer;">&times;</span>
            <h2 id="modalTitle" style="margin-top:0;"></h2>
            <div id="modalBody" style="white-space:pre-wrap; margin:20px 0; max-height:300px; overflow-y:auto; line-height:1.6; color:#444;"></div>
            <button id="modalOrderBtn" style="width:100%; background:#2a9d8f; color:white; padding:15px; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">🛒 Purchase This Model</button>
        </div>
    </div>

    <div id="zoomModal" onclick="this.style.display='none'" style="display:none; position:fixed; z-index:10000; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.9); cursor:zoom-out; align-items:center; justify-content:center;">
        <img id="zoomImg" style="max-width:90%; max-height:90%; border-radius:10px;">
    </div>
`;

function showInfo(name, desc) {
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalBody').innerText = desc;
    document.getElementById('modalOrderBtn').onclick = () => {
        window.location.href = `mailto:ArtisticLaserProducts@gmail.com?subject=Order: ${encodeURIComponent(name)}`;
    };
    document.getElementById('infoModal').style.display = 'flex';
}

function closeModal() { document.getElementById('infoModal').style.display = 'none'; }

function render() {
    const slice = currentData.slice(0, itemsShown);
    document.getElementById('grid').innerHTML = slice.map(p => `
        <div style="background:white; border:1px solid #eee; border-radius:15px; overflow:hidden; display:flex; flex-direction:column; position:relative; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            <div style="position:absolute; top:10px; right:10px; background:#2a9d8f; color:white; padding:5px 12px; border-radius:20px; font-weight:bold; font-size:13px; z-index:1;">${p.p}</div>
            <div onclick="window.openZoom('${p.i}')" style="height:220px; background:#f9f9f9; display:flex; align-items:center; justify-content:center; cursor:zoom-in;">
                <img src="${p.i}" loading="lazy" style="max-width:90%; max-height:90%; object-fit:contain;">
            </div>
            <div style="padding:15px; flex-grow:1; display:flex; flex-direction:column;">
                <small style="color:#888; text-transform:uppercase; font-weight:bold;">${p.c}</small>
                <h3 style="margin:5px 0 15px 0; font-size:1.1em;">${p.n}</h3>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-top:auto;">
                    <button onclick='showInfo(\`${p.n}\`, \`${p.d.replace(/'/g, "\\'")}\`)' style="background:#eee; color:#333; padding:10px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Info</button>
                    <button onclick="window.location.href='mailto:ArtisticLaserProducts@gmail.com?subject=Order: ${encodeURIComponent(p.n)}'" style="background:#333; color:white; padding:10px; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Order</button>
                </div>
            </div>
        </div>
    `).join('');
    document.getElementById('count').innerText = `Showing ${Math.min(itemsShown, currentData.length)} of ${currentData.length}`;
    document.getElementById('load-more').style.display = itemsShown >= currentData.length ? 'none' : 'inline-block';
}

// Global functions for events
window.openZoom = (url) => { document.getElementById('zoomImg').src = url; document.getElementById('zoomModal').style.display = 'flex'; };
window.showInfo = showInfo;
window.closeModal = closeModal;

// Filters & Load More
const handleFilter = () => {
    const term = document.getElementById('search').value.toLowerCase();
    const cat = document.getElementById('cat-filter').value;
    currentData = catalogData.filter(p => (p.n.toLowerCase().includes(term)) && (cat === "" || p.c === cat));
    itemsShown = 20; render();
};

document.getElementById('search').onkeyup = handleFilter;
document.getElementById('cat-filter').onchange = handleFilter;
document.getElementById('load-more').onclick = () => { itemsShown += 20; render(); };

render();