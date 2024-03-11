/* Darken navbar when scrolling */
window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('bg-black');
    } else {
        navbar.classList.remove('bg-black');
    }
});

