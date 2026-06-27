// ============== API HELPER ==============

const API = '';

async function apiGet(url) {
    const res = await fetch(API + url);
    return res.json();
}

async function apiPost(url, data) {
    const res = await fetch(API + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

async function apiDelete(url) {
    const res = await fetch(API + url, { method: 'DELETE' });
    return res.json();
}

async function apiPut(url, data) {
    const res = await fetch(API + url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
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

function formatPrice(price) {
    return Number(price).toLocaleString('uz-UZ');
}

// ============== ADMIN LOGIN ==============

async function adminLogin() {
    const password = document.getElementById('admin-password').value;

    try {
        const res = await fetch(API + '/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (res.ok) {
            sessionStorage.setItem('admin_logged', 'true');
            sessionStorage.setItem('admin_pass', password);
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('admin-content').style.display = 'block';
            renderAdmin();
        } else {
            document.getElementById('login-error').style.display = 'block';
            setTimeout(() => {
                document.getElementById('login-error').style.display = 'none';
            }, 3000);
        }
    } catch (e) {
        showToast('❌ Server bilan bog\'lanib bo\'lmadi!');
    }
}

function adminLogout() {
    sessionStorage.removeItem('admin_logged');
    sessionStorage.removeItem('admin_pass');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';
    document.getElementById('admin-password').value = '';
}

// ============== CHECK LOGIN ==============

function checkAdminLogin() {
    if (sessionStorage.getItem('admin_logged') === 'true') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        renderAdmin();
    }
}

// ============== RENDER ADMIN ==============

async function renderAdmin() {
    const categories = await apiGet('/api/categories');
    const foods = await apiGet('/api/foods');
    const settings = await apiGet('/api/settings');

    // Stats
    document.getElementById('stat-categories').textContent = categories.length;
    document.getElementById('stat-items').textContent = foods.length;

    // Categories list
    renderCategoriesList(categories, foods);

    // Foods list
    renderFoodsList(foods, categories);

    // Category select
    renderCategorySelect(categories);

    // Settings
    document.getElementById('restaurant-name').value = settings.name || '';
}

// ============== CATEGORIES ==============

async function addCategory() {
    const nameInput = document.getElementById('category-name');
    const iconInput = document.getElementById('category-icon');

    const name = nameInput.value.trim();
    const icon = iconInput.value.trim() || '📂';

    if (!name) {
        showToast('❌ Kategoriya nomini kiriting!');
        return;
    }

    const result = await apiPost('/api/categories', { name, icon });

    if (result.success) {
        nameInput.value = '';
        iconInput.value = '';
        showToast('✅ Kategoriya qo\'shildi!');
        renderAdmin();
    } else {
        showToast('❌ Xatolik: ' + (result.error || ''));
    }
}

async function deleteCategory(id) {
    if (!confirm('Bu kategoriyani o\'chirasizmi? Ichidagi ovqatlar ham o\'chadi!')) return;

    const result = await apiDelete('/api/categories/' + id);

    if (result.success) {
        showToast('🗑️ Kategoriya o\'chirildi!');
        renderAdmin();
    }
}

function renderCategoriesList(categories, foods) {
    const container = document.getElementById('categories-list');

    if (categories.length === 0) {
        container.innerHTML = '<p style="color:#999; text-align:center; padding:10px">Hali kategoriya yo\'q</p>';
        return;
    }

    container.innerHTML = '';
    categories.forEach(cat => {
        const count = foods.filter(f => f.categoryId === cat.id).length;
        container.innerHTML += `
            <div class="list-item">
                <div class="list-item-info">
                    <span>${cat.icon}</span>
                    <span class="list-item-name">${cat.name}</span>
                    <span style="color:#999; font-size:12px">(${count} ta)</span>
                </div>
                <button class="btn btn-danger btn-small" onclick="deleteCategory('${cat.id}')">🗑️</button>
            </div>`;
    });
}

// ============== FOODS ==============

async function addFood() {
    const categoryId = document.getElementById('food-category').value;
    const name = document.getElementById('food-name').value.trim();
    const desc = document.getElementById('food-desc').value.trim();
    const price = document.getElementById('food-price').value;
    const image = document.getElementById('food-image').value.trim();

    if (!categoryId) {
        showToast('❌ Kategoriyani tanlang!');
        return;
    }
    if (!name) {
        showToast('❌ Ovqat nomini kiriting!');
        return;
    }
    if (!price) {
        showToast('❌ Narxni kiriting!');
        return;
    }

    const result = await apiPost('/api/foods', { categoryId, name, desc, price, image });

    if (result.success) {
        document.getElementById('food-name').value = '';
        document.getElementById('food-desc').value = '';
        document.getElementById('food-price').value = '';
        document.getElementById('food-image').value = '';
        showToast('✅ Ovqat qo\'shildi!');
        renderAdmin();
    } else {
        showToast('❌ Xatolik: ' + (result.error || ''));
    }
}

async function deleteFood(id) {
    if (!confirm('Bu ovqatni o\'chirasizmi?')) return;

    const result = await apiDelete('/api/foods/' + id);

    if (result.success) {
        showToast('🗑️ Ovqat o\'chirildi!');
        renderAdmin();
    }
}

function renderFoodsList(foods, categories) {
    const container = document.getElementById('foods-list');

    if (foods.length === 0) {
        container.innerHTML = '<p style="color:#999; text-align:center; padding:10px">Hali ovqat yo\'q</p>';
        return;
    }

    container.innerHTML = '';
    foods.forEach(food => {
        const cat = categories.find(c => c.id === food.categoryId);
        const catName = cat ? cat.icon + ' ' + cat.name : 'Kategoriyasiz';

        container.innerHTML += `
            <div class="list-item">
                <div class="list-item-info">
                    <div>
                        <span class="list-item-name">${food.name}</span>
                        <br><span style="color:#999; font-size:12px">${catName}</span>
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:10px">
                    <span class="list-item-price">${formatPrice(food.price)} so'm</span>
                    <button class="btn btn-danger btn-small" onclick="deleteFood('${food.id}')">🗑️</button>
                </div>
            </div>`;
    });
}

function renderCategorySelect(categories) {
    const select = document.getElementById('food-category');
    select.innerHTML = '<option value="">Kategoriyani tanlang...</option>';
    categories.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`;
    });
}

// ============== SETTINGS ==============

async function saveSettings() {
    const name = document.getElementById('restaurant-name').value.trim();
    const currentPassword = document.getElementById('current-password').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();

    if (!currentPassword) {
        showToast('❌ Joriy parolni kiriting!');
        return;
    }

    const data = { currentPassword };
    if (name) data.name = name;
    if (newPassword) data.password = newPassword;

    const result = await apiPut('/api/settings', data);

    if (result.success) {
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        if (newPassword) {
            sessionStorage.setItem('admin_pass', newPassword);
        }
        showToast('✅ Sozlamalar saqlandi!');
    } else {
        showToast('❌ ' + (result.error || 'Xatolik!'));
    }
}

// ============== INIT ==============

document.addEventListener('DOMContentLoaded', () => {
    checkAdminLogin();
});
