document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('language-modal');
    const englishButton = document.getElementById('english-button');
    const spanishButton = document.getElementById('spanish-button');

    // Function to handle language selection
    function setLanguage(lang) {
        if (lang === 'es') {
            window.location.href = 'index_es.html'; // Redirect to Spanish version
        } else if (lang === 'en') {
            modal.style.display = 'none'; // Close modal for English
        }
    }

    // Attach event listeners
    englishButton.addEventListener('click', () => setLanguage('en'));
    spanishButton.addEventListener('click', () => setLanguage('es'));
});
