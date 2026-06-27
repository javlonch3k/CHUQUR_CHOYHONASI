const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database file
const DB_FILE = path.join(__dirname, 'data.json');

// ============== DATABASE ==============

function loadDB() {
    try {
        if (fs.existsSync(DB_FILE)) {
            const raw = fs.readFileSync(DB_FILE, 'utf-8');
            return JSON.parse(raw);
        }
    } catch (e) {
        console.error('DB o\'qishda xato:', e.message);
    }
    return {
        categories: [],
        foods: [],
        settings: {
            name: 'CHUQUR CHOYHONASI',
            password: 'admin123'
        }
    };
}

function saveDB(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error('DB saqlashda xato:', e.message);
    }
}

// Init DB if not exists
if (!fs.existsSync(DB_FILE)) {
    saveDB({
        categories: [],
        foods: [],
        settings: {
            name: 'CHUQUR CHOYHONASI',
            password: 'admin123'
        }
    });
}

// ============== API: AUTH ==============

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    const db = loadDB();

    if (password === db.settings.password) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, error: 'Parol noto\'g\'ri!' });
    }
});

// ============== API: CATEGORIES ==============

app.get('/api/categories', (req, res) => {
    const db = loadDB();
    res.json(db.categories);
});

app.post('/api/categories', (req, res) => {
    const { name, icon } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Kategoriya nomi kerak!' });
    }

    const db = loadDB();
    const newCategory = {
        id: 'cat_' + Date.now(),
        name: name.trim(),
        icon: icon || '📂'
    };

    db.categories.push(newCategory);
    saveDB(db);

    res.json({ success: true, category: newCategory });
});

app.delete('/api/categories/:id', (req, res) => {
    const db = loadDB();
    const id = req.params.id;

    db.categories = db.categories.filter(c => c.id !== id);
    db.foods = db.foods.filter(f => f.categoryId !== id);
    saveDB(db);

    res.json({ success: true });
});

// ============== API: FOODS ==============

app.get('/api/foods', (req, res) => {
    const db = loadDB();
    res.json(db.foods);
});

app.post('/api/foods', (req, res) => {
    const { categoryId, name, desc, price, image } = req.body;

    if (!categoryId || !name || !price) {
        return res.status(400).json({ error: 'Kategoriya, nom va narx kerak!' });
    }

    const db = loadDB();
    const newFood = {
        id: 'food_' + Date.now(),
        categoryId,
        name: name.trim(),
        desc: desc || '',
        price: Number(price),
        image: image || ''
    };

    db.foods.push(newFood);
    saveDB(db);

    res.json({ success: true, food: newFood });
});

app.delete('/api/foods/:id', (req, res) => {
    const db = loadDB();
    const id = req.params.id;

    db.foods = db.foods.filter(f => f.id !== id);
    saveDB(db);

    res.json({ success: true });
});

// ============== API: SETTINGS ==============

app.get('/api/settings', (req, res) => {
    const db = loadDB();
    res.json({ name: db.settings.name });
});

app.put('/api/settings', (req, res) => {
    const { name, password, currentPassword } = req.body;
    const db = loadDB();

    if (currentPassword !== db.settings.password) {
        return res.status(401).json({ error: 'Joriy parol noto\'g\'ri!' });
    }

    if (name) db.settings.name = name.trim();
    if (password) db.settings.password = password.trim();
    saveDB(db);

    res.json({ success: true });
});

// ============== START ==============

app.listen(PORT, () => {
    console.log(`🍽️  CHUQUR CHOYHONASI serveri ishga tushdi!`);
    console.log(`📡 http://localhost:${PORT}`);
    console.log(`⚙️  Admin: http://localhost:${PORT}/admin.html`);
});
