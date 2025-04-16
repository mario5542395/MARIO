document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll(".main-nav li");
    
    // تحقق من وجود العناصر أولاً
    if (navItems.length === 0) {
        console.error("No navigation items found!");
        return;
    }

    // استرجاع العنصر النشط عند تحميل الصفحة
    const activeIndex = localStorage.getItem("activeNavIndex");
    if (activeIndex !== null && navItems[activeIndex]) {
        // إزالة الفئة أولاً من جميع العناصر
        navItems.forEach(item => item.classList.remove("active"));
        // إضافة الفئة للعنصر المحدد
        navItems[activeIndex].classList.add("active");
    }

    // إضافة معالج الأحداث
    navItems.forEach((item, index) => {
        item.addEventListener("click", function() {
            // إزالة الفئة من جميع العناصر
            navItems.forEach(el => el.classList.remove("active"));
            
            // إضافة الفئة للعنصر الحالي
            this.classList.add("active");
            
            // حفظ الفهرس في localStorage
            try {
                localStorage.setItem("activeNavIndex", index);
            } catch (e) {
                console.error("Failed to save to localStorage:", e);
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var teacherSlider = document.getElementById('teacherSlider');
    var carousel = new bootstrap.Carousel(teacherSlider, {
        interval: 3000,
        pause: false, // لا يتوقف عند تمرير الماوس فوقه
        wrap: true    // يعيد التشغيل من البداية بعد النهاية
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
  // Initialize particles.js
        document.addEventListener('DOMContentLoaded', function() {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#4a90e2"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#4a90e2",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });

            // Login Modal functionality
            const loginLink = document.getElementById('login-link');
            const loginModal = document.getElementById('loginModal');
            const closeBtn = document.querySelector('.close-btn');

            loginLink.addEventListener('click', function(e) {
                e.preventDefault();
                loginModal.style.display = 'flex';
            });

            closeBtn.addEventListener('click', function() {
                loginModal.style.display = 'none';
            });

            window.addEventListener('click', function(e) {
                if (e.target === loginModal) {
                    loginModal.style.display = 'none';
                }
            });
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
