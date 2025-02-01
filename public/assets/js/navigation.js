export function setupNavigation() {
    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("#header");

    // Create the menu button (logo as a clickable icon)
    const menuButton = document.createElement("button");
    menuButton.classList.add("menu-button");
    menuButton.innerHTML = `<img src="assets/images/logo.png" alt="Menu" class="menu-icon">`;

    // Create the nav links container
    const navLinks = document.createElement("div");
    navLinks.classList.add("nav-links");
    navLinks.innerHTML = `
        <a href="index.html">🏠 Home</a>
        <a href="about.html">📖 About Us</a>
        <a href="services.html">🛠️ Services</a>
        <a href="contact.html">📬 Contact Us</a>
    `;

    // Append the button and nav links inside the header
    header.appendChild(menuButton);
    header.appendChild(navLinks);

    // Toggle class to show/hide navigation on click
    menuButton.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Highlight the active tab based on the current page
    const currentPath = window.location.pathname.split("/").pop();
    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
}