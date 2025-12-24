// catalog_engine.js - Optimized for 1,000+ items
const app = document.getElementById('catalog-app');
let itemsShown = 20;
let currentData = [];

app.innerHTML = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 1200px; margin: auto;">
        <div style="text-align: center; margin-bottom: 30px;">
            <input type="text" id="search" placeholder="Search 1,000+ models..." 
            style="width: 100%; max-width: 450px; padding: 14px 25px; border-radius: 30px; border: 2px solid #333; outline: none; font-size: 16px;">
            <p id="count" style="margin-top: 15px; color: #666; font-size: 14px;"></p>
        </div>
        <div id="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;"></div>
        <div id="load-more-container" style="text-align:center; margin-top:40px; padding-bottom:40px;">
            <button id="load-more" style="background:#2a9d8f; color:white; padding:15px 40px; border:none; border-radius:10px; font-weight:bold; cursor:pointer; display:none;">Load More Models</button>
        </div>
    </div>
`;

const grid = document.getElementById('grid');
const search = document.getElementById('search');
const loadMoreBtn = document.getElementById('load-more');

function render() {
    const slice = currentData.slice(0, itemsShown);
    grid.innerHTML = slice.map(p => `
        <div style="background:white; border:1px solid #eee; border-radius:15px; overflow:hidden; display:flex; flex-direction:column; box-shadow: 0 4px 10px rgba(0,0,0,0.05); transition: 0.3s;">
            <div style="height:250px; background:#f9f9f9; display:flex; align-items:center; justify-content:center;">
                <img src="${p.i}" loading="lazy" style="max-width:90%; max-height:90%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            </div>
            <div style="padding:20px; flex-grow:1; display:flex; flex-direction:column;">
                <span style="font-size:10px; background:#eee; padding:3px 8px; border-radius:5px; width:fit-content; font-weight:bold; color:#666; text-transform:uppercase;">${p.c}</span>
                <h3 style="margin:10px 0; font-size:1.2em; color:#111;">${p.n}</h3>
                <button onclick="window.location.href='mailto:ArtisticLaserProducts@gmail.com?subject=Inquiry: ${encodeURIComponent(p.n)}'" 
                style="background:#333; color:white; padding:12px; border:none; border-radius:8px; cursor:pointer; font-weight:bold; margin-top:auto;">Purchase Model</button>
            </div>
        </div>
    `).join('');

    document.getElementById('count').innerText = `Showing ${Math.min(itemsShown, currentData.length)} of ${currentData.length} Models`;
    loadMoreBtn.style.display = itemsShown >= currentData.length ? 'none' : 'inline-block';
}

search.onkeyup = () => {
    const term = search.value.toLowerCase();
    currentData = catalogData.filter(p => p.n.toLowerCase().includes(term) || p.c.toLowerCase().includes(term));
    itemsShown = 20; 
    render();
};

loadMoreBtn.onclick = () => {
    itemsShown += 20;
    render();
};

// Initial Start
currentData = catalogData;
render();