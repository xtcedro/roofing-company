document.addEventListener("DOMContentLoaded", function () {
    const missionSection = document.querySelector(".mission");

    function handleScroll() {
        if (missionSection) {
            const rect = missionSection.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                missionSection.classList.add("visible");
            }
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ensure it triggers if already in view
});