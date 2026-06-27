// ============== API HELPER ==============

const API = '';

async function apiGet(url) {
    const res = await fetch(API + url);
    return res.json();
}

// ============== DATA ==============

let categories = [];
let foods = [];

async function loadData() {
    try {
        categories = await apiGet('/api/categories');
        foods = await apiGet('/api/foods');
        const settings = await apiGet('/api/settings');

        // Update title
        const h1 = document.getElementById('site-title');
        if (h1 && settings.name) {
            h1.textContent = '🍽️ ' + settings.name;
            document.title = settings.name;
        }

        renderMenu();
    } catch (e) {
        console.error('Ma\'lumot yuklashda xato:', e);
        document.getElementById('menu-grid').innerHTML = `
            <div class="empty-state">
                <p>❌ Server bilan bog'lanib bo'lmadi</p>
                <p>Sahifani yangilang yoki keyinroq urinib ko'ring</p>
            </div>`;
    }
}

// ============== TOAST ==============

function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ============== MENU PAGE ==============

function renderMenu() {
    const nav = document.getElementById('categories-nav');
    const grid = document.getElementById('menu-grid');
    if (!nav || !grid) return;

    // Render category buttons
    nav.innerHTML = '<button class="cat-btn active" data-category="all">Barchasi</button>';
    categories.forEach(cat => {
        nav.innerHTML += `<button class="cat-btn" data-category="${cat.id}">${cat.icon} ${cat.name}</button>`;
    });

    // Category click handlers
    nav.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            nav.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterMenu(btn.dataset.category);
        });
    });

    // Render foods
    renderFoodGrid(foods);
}

function renderFoodGrid(foodsList) {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    if (foodsList.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>📭 Hozircha menyu bo'sh</p>
                <p>Admin panel orqali ovqatlar qo'shing</p>
            </div>`;
        return;
    }

    grid.innerHTML = '';
    foodsList.forEach(food => {
        const cat = categories.find(c => c.id === food.categoryId);
        const catName = cat ? `${cat.icon} ${cat.name}` : '';

        const imageHTML = food.image
            ? `<div class="menu-item-image"><img src="${food.image}" alt="${food.name}" onerror="this.parentElement.innerHTML='🍽️'"></div>`
            : `<div class="menu-item-image">🍽️</div>`;

        grid.innerHTML += `
            <div class="menu-item" data-category="${food.categoryId}">
                ${imageHTML}
                <div class="menu-item-info">
                    <div class="menu-item-name">${food.name}</div>
                    <div class="menu-item-desc">${food.desc || ''}</div>
                    <div class="menu-item-price">${formatPrice(food.price)} so'm</div>
                    <div class="menu-item-category">${catName}</div>
                </div>
            </div>`;
    });
}

function filterMenu(categoryId) {
    if (categoryId === 'all') {
        renderFoodGrid(foods);
    } else {
        renderFoodGrid(foods.filter(f => f.categoryId === categoryId));
    }
}

function formatPrice(price) {
    return Number(price).toLocaleString('uz-UZ');
}

// ============== INIT ==============

document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
