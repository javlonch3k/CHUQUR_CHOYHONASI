// ============== DATABASE (localStorage) ==============

const DB = {
    get(key, defaultVal) {
        try {
            const data = localStorage.getItem('restaurant_' + key);
            return data ? JSON.parse(data) : defaultVal;
        } catch {
            return defaultVal;
        }
    },
    set(key, value) {
        localStorage.setItem('restaurant_' + key, JSON.stringify(value));
    }
};

// ============== DATA ==============

function getCategories() {
    return DB.get('categories', []);
}

function getFoods() {
    return DB.get('foods', []);
}

function getSettings() {
    return DB.get('settings', {
        name: 'CHUQUR CHOYHONASI',
        password: 'admin123'
    });
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

    const categories = getCategories();
    const foods = getFoods();
    const settings = getSettings();

    // Update title
    const h1 = document.querySelector('header h1');
    if (h1 && settings.name) {
        h1.textContent = '🍽️ ' + settings.name;
    }

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

function renderFoodGrid(foods) {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    const categories = getCategories();

    if (foods.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>📭 Hozircha menyu bo'sh</p>
                <p>Admin panel orqali ovqatlar qo'shing</p>
            </div>`;
        return;
    }

    grid.innerHTML = '';
    foods.forEach(food => {
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
    const foods = getFoods();
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
    renderMenu();
});
