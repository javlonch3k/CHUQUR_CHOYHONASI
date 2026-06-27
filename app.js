function formatPrice(price) {
    return Number(price).toLocaleString('uz-UZ');
}

function renderMenu() {
    const nav = document.getElementById('categories-nav');
    const grid = document.getElementById('menu-grid');

    // Navigation links (bepul.tv style)
    nav.innerHTML = '<span class="nav-link active" data-category="all">Barchasi</span>';
    CATEGORIES.forEach(cat => {
        nav.innerHTML += `<span class="nav-link" data-category="${cat.id}">${cat.icon} ${cat.name}</span>`;
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            renderGrid(link.dataset.category);
        });
    });

    renderGrid('all');
}

function renderGrid(categoryId) {
    const grid = document.getElementById('menu-grid');
    const filtered = categoryId === 'all' ? FOODS : FOODS.filter(f => f.category === categoryId);

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">📭 Bu kategoriyada hali ovqat yo\'q</div>';
        return;
    }

    grid.innerHTML = '';
    filtered.forEach(food => {
        const cat = CATEGORIES.find(c => c.id === food.category);
        const catName = cat ? cat.name : '';
        const catIcon = cat ? cat.icon : '🍽️';

        // Image or placeholder (like movie poster)
        let imgHTML;
        if (food.image) {
            imgHTML = `<img src="${food.image}" alt="${food.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                       <div class="poster-img-placeholder" style="display:none">${catIcon}</div>`;
        } else {
            imgHTML = `<div class="poster-img-placeholder">${catIcon}</div>`;
        }

        grid.innerHTML += `
            <div class="poster-card">
                <div class="poster-img">
                    ${imgHTML}
                    <span class="badge-hd">${formatPrice(food.price)}</span>
                    <span class="badge-serial">${catName}</span>
                </div>
                <div class="poster-info">
                    <div class="poster-title">${food.name}</div>
                    <div class="poster-meta">
                        <span class="poster-price">${formatPrice(food.price)} so'm</span>
                        ${food.desc ? `<span class="meta-dot"></span><span>${food.desc}</span>` : ''}
                    </div>
                </div>
            </div>`;
    });
}

document.addEventListener('DOMContentLoaded', renderMenu);
