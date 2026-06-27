// ============== MENYU MA'LUMOTLARI ==============
// Bu faylni o'zgartirish orqali menyu yangilanadi

const RESTAURANT = {
    name: "CHUQUR CHOYHONASI",
    address: "Qarshi shahri",
    phone: "+998 XX XXX XX XX"
};

const CATEGORIES = [
    { id: "suyuq", name: "Suyuq ovqatlar", icon: "🍲" },
    { id: "kabob", name: "Kaboblar", icon: "🥩" },
    { id: "salat", name: "Salatlar", icon: "🥗" },
    { id: "non", name: "Non va tandoor", icon: "🫓" },
    { id: "ichimlik", name: "Ichimliklar", icon: "🥤" },
];

const FOODS = [
    // 🍲 Suyuq ovqatlar
    { name: "Lag'mon", desc: "Uy lag'moni", price: 25000, category: "suyuq", image: "" },
    { name: "Shurva", desc: "Mol go'shtli shurva", price: 28000, category: "suyuq", image: "" },
    { name: "Mastava", desc: "An'anaviy mastava", price: 22000, category: "suyuq", image: "" },
    { name: "Norin", desc: "Qo'lda cho'zilgan norin", price: 35000, category: "suyuq", image: "" },

    // 🥩 Kaboblar
    { name: "Tanovar kabob", desc: "Mol go'shtidan", price: 30000, category: "kabob", image: "" },
    { name: "Jiz", desc: "Mol jizi", price: 45000, category: "kabob", image: "" },
    { name: "Qovurdoq", desc: "Kartoshkali qovurdoq", price: 35000, category: "kabob", image: "" },
    { name: "Somsa", desc: "Tandirda pishgan", price: 12000, category: "kabob", image: "" },

    // 🥗 Salatlar
    { name: "Achichiq", desc: "Pomidor, bodring, piyoz", price: 10000, category: "salat", image: "" },
    { name: "Olivye", desc: "An'anaviy olivye", price: 15000, category: "salat", image: "" },
    { name: "Yozgi salat", desc: "Yashil salat barglari", price: 12000, category: "salat", image: "" },

    // 🫓 Non va tandoor
    { name: "Obi non", desc: "Tandirda pishgan", price: 5000, category: "non", image: "" },
    { name: "Patir", desc: "Yog'li patir", price: 8000, category: "non", image: "" },
    { name: "Qatlama", desc: "Piyozli qatlama", price: 10000, category: "non", image: "" },

    // 🥤 Ichimliklar
    { name: "Choy (choynak)", desc: "Ko'k yoki qora", price: 10000, category: "ichimlik", image: "" },
    { name: "Kompot", desc: "Uy kompoti", price: 8000, category: "ichimlik", image: "" },
    { name: "Coca-Cola 1L", desc: "", price: 12000, category: "ichimlik", image: "" },
    { name: "Suv 0.5L", desc: "", price: 3000, category: "ichimlik", image: "" },
];
