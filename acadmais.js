
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".main-nav li");
    const activeIndex = localStorage.getItem("activeNavIndex");
    if (activeIndex !== null) {
        navItems[activeIndex].classList.add("active");
    }

    navItems.forEach((li, index) => {
        li.addEventListener("click", function () {
            navItems.forEach(item => item.classList.remove("active"));
            li.classList.add("active");
            localStorage.setItem("activeNavIndex", index);
        });
    });
});
document.getElementById('login-link').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loginModal').style.display = 'flex';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('loginModal').style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target == document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
});
