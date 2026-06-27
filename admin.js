// ============== ADMIN LOGIN ==============

function adminLogin() {
    const password = document.getElementById('admin-password').value;
    const settings = getSettings();

    if (password === settings.password) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        sessionStorage.setItem('admin_logged', 'true');
        renderAdmin();
    } else {
        document.getElementById('login-error').style.display = 'block';
        setTimeout(() => {
            document.getElementById('login-error').style.display = 'none';
        }, 3000);
    }
}

function adminLogout() {
    sessionStorage.removeItem('admin_logged');
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

function renderAdmin() {
    renderStats();
    renderCategoriesList();
    renderFoodsList();
    renderCategorySelect();
    loadSettings();
}

function renderStats() {
    const categories = getCategories();
    const foods = getFoods();
    document.getElementById('stat-categories').textContent = categories.length;
    document.getElementById('stat-items').textContent = foods.length;
}

// ============== CATEGORIES ==============

function addCategory() {
    const nameInput = document.getElementById('category-name');
    const iconInput = document.getElementById('category-icon');

    const name = nameInput.value.trim();
    const icon = iconInput.value.trim() || '📂';

    if (!name) {
        showToast('❌ Kategoriya nomini kiriting!');
        return;
    }

    const categories = getCategories();
    const newCategory = {
        id: 'cat_' + Date.now(),
        name: name,
        icon: icon
    };

    categories.push(newCategory);
    DB.set('categories', categories);

    nameInput.value = '';
    iconInput.value = '';

    showToast('✅ Kategoriya qo\'shildi!');
    renderAdmin();
}

function deleteCategory(id) {
    if (!confirm('Bu kategoriyani o\'chirasizmi? Ichidagi ovqatlar ham o\'chadi!')) return;

    let categories = getCategories();
    let foods = getFoods();

    categories = categories.filter(c => c.id !== id);
    foods = foods.filter(f => f.categoryId !== id);

    DB.set('categories', categories);
    DB.set('foods', foods);

    showToast('🗑️ Kategoriya o\'chirildi!');
    renderAdmin();
}

function renderCategoriesList() {
    const container = document.getElementById('categories-list');
    const categories = getCategories();
    const foods = getFoods();

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

function addFood() {
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

    const foods = getFoods();
    const newFood = {
        id: 'food_' + Date.now(),
        categoryId: categoryId,
        name: name,
        desc: desc,
        price: Number(price),
        image: image || ''
    };

    foods.push(newFood);
    DB.set('foods', foods);

    // Clear inputs
    document.getElementById('food-name').value = '';
    document.getElementById('food-desc').value = '';
    document.getElementById('food-price').value = '';
    document.getElementById('food-image').value = '';

    showToast('✅ Ovqat qo\'shildi!');
    renderAdmin();
}

function deleteFood(id) {
    if (!confirm('Bu ovqatni o\'chirasizmi?')) return;

    let foods = getFoods();
    foods = foods.filter(f => f.id !== id);
    DB.set('foods', foods);

    showToast('🗑️ Ovqat o\'chirildi!');
    renderAdmin();
}

function renderFoodsList() {
    const container = document.getElementById('foods-list');
    const foods = getFoods();
    const categories = getCategories();

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

function renderCategorySelect() {
    const select = document.getElementById('food-category');
    const categories = getCategories();

    select.innerHTML = '<option value="">Kategoriyani tanlang...</option>';
    categories.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`;
    });
}

// ============== SETTINGS ==============

function loadSettings() {
    const settings = getSettings();
    document.getElementById('restaurant-name').value = settings.name || '';
}

function saveSettings() {
    const settings = getSettings();
    const name = document.getElementById('restaurant-name').value.trim();
    const newPass = document.getElementById('new-password').value.trim();

    if (name) settings.name = name;
    if (newPass) settings.password = newPass;

    DB.set('settings', settings);
    document.getElementById('new-password').value = '';

    showToast('✅ Sozlamalar saqlandi!');
}

// ============== INIT ==============

document.addEventListener('DOMContentLoaded', () => {
    checkAdminLogin();
});
