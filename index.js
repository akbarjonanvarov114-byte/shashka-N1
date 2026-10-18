// ==========================================
// 1. SAHIFALAR NAVIGATSIYASI (SPA LOGIKASI)
// ==========================================
document.querySelectorAll('.cyber-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Aktiv menyu klasslarini tozalash va yangilash
        document.querySelectorAll('.cyber-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Tanlangan sahifani ko'rsatish
        const targetTab = this.getAttribute('data-tab');
        switchTab(targetTab);
    });
});

function switchTab(tabId) {
    // Barcha sahifalarni yashirish
    document.querySelectorAll('.cyber-page').forEach(page => page.classList.remove('active'));

    // Kerakli sahifani faollashtirish
    const activePage = document.getElementById(tabId);
    if (activePage) {
        activePage.classList.add('active');
    }

    // Agarda Bosh sahifadagi kartochkalar bosilsa, yuqoridagi menyuni ham sinxronlash
    document.querySelectorAll('.cyber-link').forEach(link => {
        if (link.getAttribute('data-tab') === tabId) {
            document.querySelectorAll('.cyber-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

// ==========================================
// 2. 🏃 SOG'LIQ VA SPORT: KALORIYA HISOBLAGICH
// ==========================================
function calculateCalories() {
    const stepsInput = document.getElementById('steps-input');
    const resultDiv = document.getElementById('calories-result');
    const steps = parseInt(stepsInput.value);

    if (steps > 0) {
        // Har bir bosilgan qadam uchun taxminan 0.04 kkal energiya sarflanadi
        const caloriesBurned = (steps * 0.04).toFixed(0);
        resultDiv.innerHTML = `Siz bugun taxminan <b>${Number(caloriesBurned).toLocaleString()} kkal</b> energiya sarfladingiz! 🔥`;
    } else {
        alert("Iltimos, noldan katta qadam miqdorini kiriting!");
        stepsInput.focus();
    }
}

// ==========================================
// 3. 💬 IJTIMOIY LOYIHA: FIKRLAR DEVORI
// ==========================================
function addIdea() {
    const nameInput = document.getElementById('user-name');
    const ideaInput = document.getElementById('user-idea');
    const wall = document.getElementById('ideas-wall');

    const name = nameInput.value.trim();
    const idea = ideaInput.value.trim();

    if (name && idea) {
        // Yangi xabar uchun blok yaratish
        const newIdeaItem = document.createElement('div');
        newIdeaItem.className = 'idea-item';
        newIdeaItem.innerHTML = `<b>${name}:</b> ${idea}`;

        // Yangi g'oyani ro'yxatning eng yuqorisiga joylashtirish
        wall.insertBefore(newIdeaItem, wall.firstChild);

        // Kiritish maydonlarini tozalash
        nameInput.value = '';
        ideaInput.value = '';
    } else {
        alert("Iltimos, ismingizni va ijtimoiy g'oyangizni to'liq kiriting!");
    }
}

// ==========================================
// 4. 🛍️ INTERNET DO'KON: CHEGIRMA VA PROMO-KOD
// ==========================================
let currentProductPrice = 0;

function selectProduct(price) {
    currentProductPrice = price;

    // Narxlarni ekranda aks ettirish
    document.getElementById('selected-price').innerText = price.toLocaleString();
    document.getElementById('final-price').innerText = price.toLocaleString();

    // Promo-kod maydonini tozalash (yangi mahsulot tanlanganda)
    document.getElementById('promo-input').value = '';
}

function applyPromo() {
    const promoInput = document.getElementById('promo-input');
    const promoCode = promoInput.value.trim().toUpperCase();
    const finalPriceSpan = document.getElementById('final-price');

    if (currentProductPrice === 0) {
        alert("Avval do'kondan biror mahsulotni tanlang!");
        return;
    }

    // "CYBER20" promo-kodi kiritilsa, 20% chegirma hisoblanadi
    if (promoCode === "CYBER20") {
        const discountedPrice = currentProductPrice * 0.8; // 20% chegirildi
        finalPriceSpan.innerText = Math.round(discountedPrice).toLocaleString();
        alert("Ajoyib! 'CYBER20' promo-kodi qabul qilindi. Sizga 20% chegirma berildi! 🎉");
    } else if (promoCode === "") {
        alert("Iltimos, promo-kodni kiriting!");
    } else {
        alert("Kechirasiz, bunday promo-kod mavjud emas yoki muddati o'tgan!");
        finalPriceSpan.innerText = currentProductPrice.toLocaleString();
    }
}

// ==========================================
// 5. 🧠 MOLIYAVIY SAVODXONLIK: TEZKOR TEST
// ==========================================
function checkAnswer(isCorrect) {
    const feedbackDiv = document.getElementById('quiz-feedback');

    if (isCorrect) {
        feedbackDiv.innerHTML = "To'g'ri javob! 👏 Aktivlar siz ishlamasangiz ham cho'ntagingizga pul olib keladi (masalan: ijaraga berilgan uy, aksiyalar, biznes).";
        feedbackDiv.style.color = "#00ff66"; // Yashil neon rang
        feedbackDiv.style.textShadow = "0 0 8px #00ff66";
    } else {
        feedbackDiv.innerHTML = "Xato javob! 🛑 Cho'ntakdan pul olib ketadigan narsalar (shaxsiy mashina, kredit, qimmatbaho telefon) 'Passiv' hisoblanadi.";
        feedbackDiv.style.color = "#ff0055"; // Qizil neon rang
        feedbackDiv.style.textShadow = "0 0 8px #ff0055";
    }
}
