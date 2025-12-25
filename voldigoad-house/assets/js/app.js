const roomPrices = {
    'SILVER DELUXE': 1500000,
    'GOLD EXECUTIVE': 2800000,
    'DIAMOND SUITE': 5500000
};

// --- LOGIKA LOGIN ADMIN ---
function handleAdminLogin(event) {
    event.preventDefault();
    // Karena login.html ada di root, arahkan ke pages/admin/dashboard.html
    showPopup('Akses Diterima. Membuka Panel Kontrol...', 'ADMIN VERIFIED', 'success', 'admin/dashboard.html');
}

// --- LOGIKA KALKULATOR HARGA ---
function calculateTotal() {
    const roomDisplay = document.getElementById('roomNameDisplay');
    const inVal = document.getElementById('checkIn').value;
    const outVal = document.getElementById('checkOut').value;
    const display = document.getElementById('totalPriceDisplay');

    if (!roomDisplay || !inVal || !outVal) return;

    const start = new Date(inVal);
    const end = new Date(outVal);

    if (end > start) {
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        // Membersihkan teks kamar agar cocok dengan daftar harga
        const roomType = roomDisplay.innerText.trim().toUpperCase();
        const price = roomPrices[roomType] || 0;

        if (price === 0) {
            display.innerHTML = `<p class="text-warning small m-0">Tipe "${roomType}" tidak terdaftar.</p>`;
            return;
        }

        const total = diffDays * price;

        display.innerHTML = `
            <div class="d-flex justify-content-between mb-2 small">
                <span class="text-white-50">Durasi:</span> <b>${diffDays} Malam</b>
            </div>
            <div class="d-flex justify-content-between text-gold border-top border-secondary pt-2 mt-1 fw-bold">
                <span>Total:</span> <span class="fs-5">Rp ${total.toLocaleString('id-ID')}</span>
            </div>`;
    } else {
        display.innerHTML = `<p class="text-danger small m-0 text-center">Checkout harus setelah Check-in</p>`;
    }
}

// --- LOGIKA BOOKING USER ---
function handleFinalBooking(event) {
    event.preventDefault();
    // Kembali ke beranda
    showPopup('Pemesanan berhasil disimpan.', 'SUCCESS', 'success', 'index.html');
}

// --- SISTEM NOTIFIKASI POPUP (FIXED) ---
function showPopup(message, title, type, redirectUrl) {
    // Hapus popup lama jika ada
    const existing = document.querySelector('.notification-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    overlay.innerHTML = `
        <div class="popup-box">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} fa-4x text-gold mb-4"></i>
            <h3 class="text-gold fw-bold mb-2">${title}</h3>
            <p class="text-white opacity-75 mb-0">${message}</p>
        </div>`;

    document.body.appendChild(overlay);
    overlay.style.display = 'flex';

    // Animasi muncul
    setTimeout(() => {
        overlay.querySelector('.popup-box').classList.add('active');
    }, 10);

    // Redirect otomatis
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 2500);
}
// LOGIN: Dari root (login.html) ke folder admin
function handleAdminLogin(event) {
    event.preventDefault();
    // Path benar: masuk ke folder admin/
    showPopup('Akses Diterima!', 'ADMIN VERIFIED', 'success', 'admin/dashboard.html');
}

// BOOKING: Dari folder user ke root (index.html)
function handleFinalBooking(event) {
    event.preventDefault();
    // Path benar: keluar satu tingkat ke luar folder user
    showPopup('Pemesanan Berhasil!', 'SUCCESS', 'success', '../index.html');
}

// 1. Fungsi Utama Logout (Dipicu oleh tombol di navbar dashboard)
function handleLogout() {
    // Hapus overlay jika sudah ada (mencegah duplikat)
    const existing = document.getElementById('confirmOverlay');
    if (existing) existing.remove();

    // Buat Modal Konfirmasi Kustom bergaya Glassmorphism
    const confirmHtml = `
        <div id="confirmOverlay" class="notification-overlay" style="display: flex;">
            <div class="popup-box glass-container active">
                <i class="fas fa-question-circle fa-4x text-gold mb-4"></i>
                <h3 class="text-gold fw-bold mb-2">KONFIRMASI</h3>
                <p class="text-white opacity-75 mb-4">Apakah Anda yakin ingin mengakhiri sesi manajemen?</p>
                <div class="d-flex justify-content-center gap-3">
                    <button onclick="document.getElementById('confirmOverlay').remove()" class="btn btn-outline-light rounded-pill px-4">BATAL</button>
                    <button onclick="executeLogoutAction()" class="btn btn-gold rounded-pill px-4 fw-bold">YA, KELUAR</button>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', confirmHtml);
}

// 2. Fungsi eksekusi setelah klik "YA, KELUAR"
function executeLogoutAction() {
    const modal = document.getElementById('confirmOverlay');
    if (modal) modal.remove();

    // Panggil notifikasi sukses lalu pindah ke Landing Page
    showPopup('Sesi berakhir. Kembali ke beranda...', 'LOGOUT BERHASIL', 'success', '../index.html');
}

// 3. Perbaikan fungsi showPopup agar tetap konsisten dan mewah
function showPopup(message, title, type, redirectUrl) {
    const existing = document.querySelector('.notification-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    overlay.style.display = 'flex';
    overlay.innerHTML = `
        <div class="popup-box glass-container active">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} fa-4x text-gold mb-4"></i>
            <h3 class="text-gold fw-bold mb-2">${title}</h3>
            <p class="text-white opacity-75 mb-0">${message}</p>
        </div>`;

    document.body.appendChild(overlay);

    setTimeout(() => {
        if (redirectUrl) window.location.href = redirectUrl;
    }, 2000);
}