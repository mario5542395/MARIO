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
document.addEventListener('DOMContentLoaded', function() {
    // تحقق أولاً من وجود العنصر
    if (!document.getElementById('particles-js')) {
      console.error('Particles container not found!');
      return;
    }
  
    particlesJS('particles-js', {
      particles: {
        number: { value: 350, density: { enable: true, value_area: 1000 } },
        color: { value: "#4a90e2" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 5, random: true },
        line_linked: { enable: true, distance: 150, color: "#4a90e2", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 4, direction: "none", random: true, straight: false, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        }
      },
      retina_detect: true
    });
  });