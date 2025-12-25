// Validasi Login Sederhana
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === "admin@voldigoad.com" && password === "admin123") {
        // Simulasi Redirect Admin
        localStorage.setItem('role', 'admin');
        window.location.href = "admin/dashboard.html";
    } else if (email === "user@gmail.com" && password === "user123") {
        // Simulasi Redirect User
        localStorage.setItem('role', 'user');
        window.location.href = "index.html"; // Balik ke landing page sebagai user logged in
    } else {
        alert("Email atau Password salah! (Coba: admin@voldigoad.com / admin123)");
    }
}

// Simulasi Logout
function logout() {
    localStorage.removeItem('role');
    window.location.href = "../login.html"; // Sesuaikan path relative
}

// Check Session (Pasang di halaman Admin)
function checkAdminAuth() {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
        alert("Akses Ditolak! Anda bukan Admin.");
        window.location.href = "../login.html";
    }
}