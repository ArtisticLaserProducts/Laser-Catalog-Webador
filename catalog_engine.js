// catalog_engine.js - With Automatic Category Filtering
const app = document.getElementById('catalog-app');
let itemsShown = 20;
let currentData = catalogData; // Initialize with all data

// 1. Setup the UI (Search + Category Dropdown)
const categories = [...new Set(catalogData.map(item => item.c))].sort();
const categoryOptions = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');

app.innerHTML = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 1200px; margin: auto;">
        <div style="text-align: center; margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
            <div style="display: flex; gap: 10px; width: 100%; max-width: 600px; flex-wrap: wrap; justify-content: center;">
                <input type="text" id="search" placeholder="Search models..." 
                style="flex: 2; min-width: 250px; padding: 14px 25px; border-radius: 30px; border: 2px solid #333; outline: none; font-size: 16px;">
                
                <select id="cat-filter" style="flex: 1; min-width: 150px; padding: 14px; border-radius: 30px; border: 2px solid #333; background: white; font-size: 14px; cursor: pointer;">
                    <option value="">All Categories</option>
                    ${categoryOptions}
                </select>
            </div>
            <p id="count" style="color: #666; font-size: 14px; margin: 0;"></p>
        </div>
        <div id="grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;"></div>
        <div id="load-more-container" style="text-align:center; margin-top:40px; padding-bottom:40px;">
            <button id="load-more" style="background:#2a9d8f; color:white; padding:15px 40px; border:none; border-radius:10px; font-weight:bold; cursor:pointer; display:none;">Load More Models</button>
        </div>
    </div>
`;

const grid = document.getElementById('grid');
const search = document.getElementById('search');
const catFilter = document.getElementById('cat-filter');
const loadMoreBtn = document.getElementById('load-more');

// 2. The Render Function
function render() {
    const slice = currentData.slice(0, itemsShown);
    grid.innerHTML = slice.map(p => `
        <div style="background:white; border:1px solid #eee; border-radius:15px; overflow:hidden; display:flex; flex-direction:column; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <div style="height:250px; background:#f9f9f9; display:flex; align-items:center; justify-content:center;">
                <img src="${p.i}" loading="lazy" style="max-width:90%; max-height:90%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            </div>
            <div style="padding:20px; flex-grow:1; display:flex; flex-direction:column;">
                <span style="font-size:10px; background:#eee; padding:3px 8px; border-radius:5px; width:fit-content; font-weight:bold; color:#666; text-transform:uppercase;">${p.c}</span>
                <h3 style="margin:10px 0; font-size:1.1em; color:#111;">${p.n}</h3>
                <button onclick="window.location.href='mailto:ArtisticLaserProducts@gmail.com?subject=Inquiry: ${encodeURIComponent(p.n)}'" 
                style="background:#333; color:white; padding:12px; border:none; border-radius:8px; cursor:pointer; font-weight:bold; margin-top:auto;">Purchase Model</button>
            </div>
        </div>
    `).join('');

    document.getElementById('count').innerText = `Showing ${Math.min(itemsShown, currentData.length)} of ${currentData.length} Models`;
    loadMoreBtn.style.display = itemsShown >= currentData.length ? 'none' : 'inline-block';
}

// 3. Logic for Filtering
function handleFilter() {
    const searchTerm = search.value.toLowerCase();
    const selectedCat = catFilter.value;

    currentData = catalogData.filter(p => {
        const matchesSearch = p.n.toLowerCase().includes(searchTerm);
        const matchesCat = selectedCat === "" || p.c === selectedCat;
        return matchesSearch && matchesCat;
    });

    itemsShown = 20; 
    render();
}

search.onkeyup = handleFilter;
catFilter.onchange = handleFilter;
loadMoreBtn.onclick = () => { itemsShown += 20; render(); };

// Initial Render
render();
render();
