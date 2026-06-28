// ============== MENYU MA'LUMOTLARI ==============

const RESTAURANT = {
    name: "CHUQUR CHOYHONASI",
    phone: "+998 XX XXX XX XX",
    address: "Qarshi shahri"
};

const CATEGORIES = [
    { id: "suyuq", icon: "🍲", label: "SUYUQ OVQATLAR", bg: "#1a2332", img: "" },
    { id: "taom", icon: "🥘", label: "TAOMLAR", bg: "#1a2332", img: "" },
    { id: "kabob", icon: "🍢", label: "KABOBLAR", bg: "#1a2332", img: "" },
    { id: "salat", icon: "🥗", label: "SALATLAR", bg: "#1a2332", img: "" },
    { id: "non", icon: "🫓", label: "NON VA TANDOOR", bg: "#1a2332", img: "" },
    { id: "ichimlik", icon: "🥤", label: "ICHIMLIKLAR", bg: "#1a2332", img: "" },
];

const FOODS = [
    // Suyuq ovqatlar
    { id: 1, name: "LAG'MON", price: 25000, cat: "suyuq", desc: "Qo'lda cho'zilgan lag'mon — go'sht va sabzavotli", badge: "pop", img: "" },
    { id: 2, name: "SHURVA", price: 28000, cat: "suyuq", desc: "Mol go'shtli shurva, kartoshka va sabzavotli", badge: "pop", img: "" },
    { id: 3, name: "MASTAVA", price: 22000, cat: "suyuq", desc: "Guruchli sho'rva: go'sht, sabzavot va ziravorlar", badge: "", img: "" },
    { id: 4, name: "NORIN", price: 35000, cat: "suyuq", desc: "Qo'lda cho'zilgan norin", badge: "new", img: "" },

    // Taomlar
    { id: 5, name: "PALOV (OSH)", price: 35000, cat: "taom", desc: "An'anaviy o'zbek palovi: guruch, sabzi, piyoz, go'sht", badge: "pop", img: "" },
    { id: 6, name: "QOVURMA LAG'MON", price: 35000, cat: "taom", desc: "Qo'lda cho'zilgan — go'sht, sabzavotli, tuxum", badge: "pop", img: "" },
    { id: 7, name: "TANDIR GO'SHT", price: 250000, cat: "taom", desc: "Qo'y go'shtidan mazzali tandir", badge: "hot", img: "" },
    { id: 8, name: "JIZ", price: 220000, cat: "taom", desc: "Yumshoq qo'y go'shti jizi", badge: "pop", img: "" },
    { id: 9, name: "SOMSA", price: 7000, cat: "taom", desc: "Tandirda yangi pishirilgan somsa", badge: "pop", img: "" },
    { id: 10, name: "QOVURDOQ", price: 35000, cat: "taom", desc: "Kartoshkali qovurdoq", badge: "", img: "" },

    // Kaboblar
    { id: 11, name: "G'IJDUVON SHASHLIK", price: 60000, cat: "kabob", desc: "Mol go'shtidan qiyma", badge: "pop", img: "" },
    { id: 12, name: "KUSKAVOY SHASHLIK", price: 70000, cat: "kabob", desc: "Qo'y go'shtidan kuskavoy", badge: "pop", img: "" },
    { id: 13, name: "KAVKAZ SHASHLIK", price: 70000, cat: "kabob", desc: "Qo'y go'shtidan kavkaz", badge: "hot", img: "" },
    { id: 14, name: "QUYRUQ SHASHLIK", price: 15000, cat: "kabob", desc: "Qo'y dumbasi", badge: "", img: "" },

    // Salatlar
    { id: 15, name: "ACHICHIQ", price: 12000, cat: "salat", desc: "Pomidor, bodring, piyoz", badge: "", img: "" },
    { id: 16, name: "SHAKAROB SALAT", price: 15000, cat: "salat", desc: "Pomidor, bodring, ko'kat, chakki", badge: "pop", img: "" },
    { id: 17, name: "CHALOP", price: 6000, cat: "salat", desc: "Mazzali chalop", badge: "", img: "" },

    // Non
    { id: 18, name: "OBI NON", price: 5000, cat: "non", desc: "Tandirda pishgan", badge: "", img: "" },
    { id: 19, name: "PATIR", price: 8000, cat: "non", desc: "Yog'li patir", badge: "", img: "" },

    // Ichimliklar
    { id: 20, name: "COCA-COLA 1.5L", price: 17000, cat: "ichimlik", desc: "Gazli ichimlik", badge: "", img: "" },
    { id: 21, name: "COCA-COLA 1L", price: 12000, cat: "ichimlik", desc: "Gazli ichimlik", badge: "", img: "" },
    { id: 22, name: "PEPSI 1.5L", price: 17000, cat: "ichimlik", desc: "Gazli ichimlik", badge: "", img: "" },
    { id: 23, name: "CHOY (CHOYNAK)", price: 10000, cat: "ichimlik", desc: "Ko'k yoki qora choy", badge: "pop", img: "" },
    { id: 24, name: "SUV 0.5L", price: 3000, cat: "ichimlik", desc: "", badge: "", img: "" },
];
