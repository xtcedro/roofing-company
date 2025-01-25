document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const navbar = document.querySelector(".navbar");

    // Set the navigation bar
    if (token) {
        // User is signed in
        navbar.innerHTML = `
            <a href="index_es.html">🏠 Inicio</a>
            <a href="about_es.html">📖 Sobre Nosotros</a>
            <a href="services_es.html">🛠️ Servicios</a>
            <a href="gallery_es.html">🖼️ Galería</a>
            <a href="appointments_es.html">📅 Enviar Citas</a>
            <a href="view-appointments_es.html">👀 Ver Citas</a>
            <a href="contact_es.html">📬 Contáctenos</a>
            <a href="dashboard_es.html">📊 Tablero</a>
            <button class="cta-button secondary" onclick="signOut()">🔓 Cerrar Sesión</button>
        `;
    } else {
        // Visitor (not signed in)
        navbar.innerHTML = `
            <a href="index_es.html">🏠 Inicio</a>
            <a href="about_es.html">📖 Sobre Nosotros</a>
            <a href="services_es.html">🛠️ Servicios</a>
            <a href="register_es.html">📝 Registrarse</a>
            <a href="login_es.html">🔑 Iniciar Sesión</a>
            <a href="contact_es.html">📬 Contáctenos</a>
        `;
    }

    // Highlight the active tab
    const currentPath = window.location.pathname.split('/').pop(); // Get the current file name
    const links = navbar.querySelectorAll("a");

    links.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath.includes(currentPath)) {
            link.classList.add("active");
        }
    });
});

// Sign Out Function
function signOut() {
    localStorage.removeItem("token");
    window.location.href = "login_es.html";
}
