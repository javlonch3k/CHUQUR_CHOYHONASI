function formatPrice(price) {
    return Number(price).toLocaleString('uz-UZ');
}

function renderMenu() {
    const nav = document.getElementById('categories-nav');
    const grid = document.getElementById('menu-grid');

    // Render category tabs (bepul.tv style)
    nav.innerHTML = '<button class="cat-btn active" data-category="all">Barchasi</button>';
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
        grid.innerHTML = '<div class="empty-state">📭 Bu kategoriyada hali ovqat yo\'q</div>';
        return;
    }

    grid.innerHTML = '';
    filtered.forEach(food => {
        const cat = CATEGORIES.find(c => c.id === food.category);
        const catIcon = cat ? cat.icon : '';
        const catName = cat ? cat.name : '';

        const imageHTML = food.image
            ? `<div class="food-image"><img src="${food.image}" alt="${food.name}" onerror="this.parentElement.classList.add('food-image-placeholder');this.parentElement.innerHTML='🍽️'"></div>`
            : `<div class="food-image food-image-placeholder">${catIcon || '🍽️'}</div>`;

        grid.innerHTML += `
            <div class="food-card">
                <span class="food-badge">${formatPrice(food.price)}</span>
                <span class="food-cat-badge">${catName}</span>
                ${imageHTML}
                <div class="food-info">
                    <div class="food-name">${food.name}</div>
                    <div class="food-meta">
                        <span class="food-price">${formatPrice(food.price)} so'm</span>
                        ${food.desc ? `<span class="food-dot"></span><span class="food-desc">${food.desc}</span>` : ''}
                    </div>
                </div>
            </div>`;
    });
}

document.addEventListener('DOMContentLoaded', renderMenu);
