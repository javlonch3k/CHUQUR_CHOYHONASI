const EMOJIS = {suyuq:'🍲', taom:'🥘', kabob:'🍢', salat:'🥗', non:'🫓', ichimlik:'🥤'};
const fmt = p => p.toLocaleString('uz-UZ') + ' <span>so\'m</span>';
let activeCat = 'all';

/* KATEGORIYALAR */
function buildCatTabs() {
    const tabs = document.getElementById('tabs');
    // "Hammasi" tab
    const allDiv = document.createElement('div');
    allDiv.className = 'cat-card active';
    allDiv.dataset.cat = 'all';
    allDiv.innerHTML = `<div class="cat-icon-wrap">🍽️</div><div class="cat-label">Hammasi</div><div class="cat-count">${FOODS.length} ta</div>`;
    tabs.appendChild(allDiv);

    CATEGORIES.forEach(c => {
        const cnt = FOODS.filter(f => f.cat === c.id).length;
        const div = document.createElement('div');
        div.className = 'cat-card';
        div.dataset.cat = c.id;
        div.innerHTML = `<div class="cat-icon-wrap" style="background:${c.bg||'#1a2332'}">${c.icon}</div><div class="cat-label">${c.label}</div><div class="cat-count">${cnt} ta</div>`;
        tabs.appendChild(div);
    });

    tabs.addEventListener('click', e => {
        const t = e.target.closest('.cat-card');
        if (!t) return;
        document.querySelectorAll('.cat-card').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        activeCat = t.dataset.cat;
        render();
    });
}

/* FOOD CARD */
function cardHTML(it) {
    const em = EMOJIS[it.cat] || '🍽';
    let badge = '';
    if (it.badge === 'pop') badge = '<div class="food-badge fb-pop">⭐ Mashhur</div>';
    else if (it.badge === 'hot') badge = '<div class="food-badge fb-hot">🌶 O\'tkir</div>';
    else if (it.badge === 'new') badge = '<div class="food-badge fb-new">🆕 Yangi</div>';

    const imgHTML = it.img
        ? `<img class="food-img" src="${it.img}" alt="${it.name}" onerror="this.outerHTML='<div class=food-img-placeholder>${em}</div>'">`
        : `<div class="food-img-placeholder">${em}</div>`;

    return `<div class="food-card" onclick="openSheet(${it.id})">
        ${imgHTML}
        <div class="food-info">
            <div>${badge}<div class="food-name">${it.name}</div><div class="food-desc">${it.desc||''}</div></div>
            <div class="food-bottom"><div class="food-price">${fmt(it.price)}</div><div class="food-arrow">›</div></div>
        </div>
    </div>`;
}

/* RENDER */
function render() {
    const container = document.getElementById('container');
    let items = activeCat === 'all' ? FOODS : FOODS.filter(f => f.cat === activeCat);

    if (!items.length) {
        container.innerHTML = '<div class="empty"><span>🤷</span>Hech narsa topilmadi</div>';
        return;
    }

    if (activeCat !== 'all') {
        container.innerHTML = items.map(cardHTML).join('');
        return;
    }

    // Group by category
    let html = '';
    CATEGORIES.forEach(c => {
        const catItems = items.filter(i => i.cat === c.id);
        if (!catItems.length) return;
        html += `<div class="section-head"><h3>${c.icon} ${c.label}</h3><div class="line"></div></div>`;
        html += catItems.map(cardHTML).join('');
    });
    container.innerHTML = html;
}

/* MODAL */
function openSheet(id) {
    const it = FOODS.find(m => m.id === id);
    if (!it) return;
    const em = EMOJIS[it.cat] || '🍽';

    const si = document.getElementById('shImg');
    si.innerHTML = it.img
        ? `<img src="${it.img}" style="width:100%;max-height:280px;object-fit:contain;display:block;background:#141c24" onerror="this.outerHTML='<div style=font-size:80px;text-align:center;padding:40px\\ 0>${em}</div>'">`
        : `<div style="font-size:80px;text-align:center;padding:40px 0">${em}</div>`;

    const badges = {
        pop: '<div class="sh-badge">⭐ Mashhur</div>',
        hot: '<div class="sh-badge" style="background:rgba(220,38,38,.15);color:#ef4444;border-color:rgba(220,38,38,.3)">🌶 O\'tkir</div>',
        new: '<div class="sh-badge" style="background:rgba(59,130,246,.15);color:#60a5fa;border-color:rgba(59,130,246,.3)">🆕 Yangi</div>'
    };
    document.getElementById('shBadge').innerHTML = badges[it.badge] || '';
    document.getElementById('shName').textContent = it.name;
    document.getElementById('shDesc').textContent = it.desc || '';
    document.getElementById('shPrice').innerHTML = fmt(it.price);
    document.getElementById('overlay').classList.add('open');
}

/* INIT */
buildCatTabs();
render();
