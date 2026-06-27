// ============== MENYU RENDERING ==============

function formatPrice(price) {
    return Number(price).toLocaleString('uz-UZ');
}

function renderMenu() {
    const nav = document.getElementById('categories-nav');
    const grid = document.getElementById('menu-grid');

    // Render category buttons
    nav.innerHTML = '<button class="cat-btn active" data-category="all">🍽️ Barchasi</button>';
    CATEGORIES.forEach(cat => {
        nav.innerHTML += `<button class="cat-btn" data-category="${cat.id}">${cat.icon} ${cat.name}</button>`;
    });

    // Category click handlers
    nav.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            nav.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFoodGrid(btn.dataset.category);
        });
    });

    renderFoodGrid('all');
}

function renderFoodGrid(categoryId) {
    const grid = document.getElementById('menu-grid');
    const filtered = categoryId === 'all' ? FOODS : FOODS.filter(f => f.category === categoryId);

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>📭 Bu kategoriyada hali ovqat yo\'q</p></div>';
        return;
    }

    grid.innerHTML = '';
    filtered.forEach(food => {
        const cat = CATEGORIES.find(c => c.id === food.category);
        const catName = cat ? `${cat.icon} ${cat.name}` : '';

        const imageHTML = food.image
            ? `<div class="food-image"><img src="${food.image}" alt="${food.name}"></div>`
            : `<div class="food-image food-image-placeholder">🍽️</div>`;

        grid.innerHTML += `
            <div class="food-card">
                ${imageHTML}
                <div class="food-info">
                    <div class="food-name">${food.name}</div>
                    <div class="food-desc">${food.desc}</div>
                    <div class="food-bottom">
                        <span class="food-price">${formatPrice(food.price)} so'm</span>
                        <span class="food-category">${catName}</span>
                    </div>
                </div>
            </div>`;
    });
}

// Init
document.addEventListener('DOMContentLoaded', renderMenu);
