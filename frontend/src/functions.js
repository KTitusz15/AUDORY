/* Darken navbar when scrolling */
window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('bg-gray-950');
    } else {
        navbar.classList.remove('bg-gray-950');
    }
});

