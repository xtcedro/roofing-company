export function setupNavigation() {
    console.log("✅ Running setupNavigation...");

    const navbar = document.querySelector(".navbar");
    const header = document.querySelector("#header");

    if (!navbar || !header) {
        console.error("❌ Navbar or Header not found in the DOM!");
        return; // Stop execution if missing
    }

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

    // Append elements inside header
    header.appendChild(menuButton);
    header.appendChild(navLinks);

    console.log("✅ Navbar elements added to the header!");

    // Toggle menu visibility
    menuButton.addEventListener("click", () => {
        console.log("🟡 Menu button clicked!");
        navLinks.classList.toggle("show");
    });

    // Highlight active tab
    const currentPath = window.location.pathname.split("/").pop();
    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });

    console.log("✅ Navigation setup complete!");
}