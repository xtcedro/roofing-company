// Load Header
fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));

// Load Footer
fetch('../components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));


 // Load Footer for Spanish pages
fetch('../components/footer_es.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer_es').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));