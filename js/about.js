document.addEventListener("DOMContentLoaded", function () {
    function animateCounter(el, start, end, duration) {
        let startTime = null;
        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            let progress = Math.min((currentTime - startTime) / duration, 1);
            el.innerText = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }

    function startCounting(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let counter = entry.target;
                let endValue = parseInt(counter.textContent, 10);
                animateCounter(counter, 0, endValue, 2000);
                observer.unobserve(counter); // إيقاف المراقبة بعد التشغيل لمرة واحدة
            }
        });
    }

    let options = { threshold: 0.5 }; // تشغيل العد عند ظهور 50% من العنصر
    let observer = new IntersectionObserver(startCounting, options);

    document.querySelectorAll(".counter").forEach(counter => {
        observer.observe(counter);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.textimonial_iner.owl-carousel');

    if (carousel) {
        let currentIndex = 0;
        const items = carousel.querySelectorAll('.owl-item:not(.cloned)');
        const totalItems = items.length;

        function rotateCarousel() {
            currentIndex = (currentIndex + 1) % totalItems;

            const itemWidth = items[0].offsetWidth;
            const offset = -currentIndex * itemWidth;

            const stage = carousel.querySelector('.owl-stage');
            if (stage) {
                stage.style.transition = 'transform 0.5s ease'; // حركة ناعمة
                stage.style.transform = `translate3d(${offset}px, 0px, 0px)`;

                // تحديث النقاط
                const dots = carousel.querySelectorAll('.owl-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
        }

        // دوران تلقائي كل 5 ثواني
        const interval = setInterval(rotateCarousel, 5000);

        // النقاط اليدوية
        const dots = carousel.querySelectorAll('.owl-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(interval); // نوقف التكرار المؤقت عند التفاعل
                currentIndex = index;

                const itemWidth = items[0].offsetWidth;
                const offset = -currentIndex * itemWidth;

                const stage = carousel.querySelector('.owl-stage');
                if (stage) {
                    stage.style.transition = 'transform 0.5s ease';
                    stage.style.transform = `translate3d(${offset}px, 0px, 0px)`;
                }

                dots.forEach((d, i) => {
                    d.classList.toggle('active', i === currentIndex);
                });
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".main-nav li");

    if (navItems.length === 0) return;

    const activeIndex = localStorage.getItem("activeNavIndex");

    if (activeIndex !== null && navItems[activeIndex]) {
        navItems.forEach(item => item.classList.remove("active"));
        navItems[activeIndex].classList.add("active");
    }

    navItems.forEach((item, index) => {
        item.addEventListener("click", function (e) {
            e.preventDefault(); // منع السلوك الافتراضي (منع إضافة إلى history)

            const link = this.querySelector("a");
            if (link) {
                // استبدال الصفحة بدون إضافة إلى history
                window.location.replace(link.href);
            }

            navItems.forEach(el => el.classList.remove("active"));
            this.classList.add("active");

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

document.getElementById("loginButton").addEventListener("click", async () => {
    const id = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // التأكد من أن البيانات موجودة
    if (!id || !password) {
        alert("من فضلك أدخل الرقم التعريفي وكلمة المرور");
        return;
    }

    // التحقق من أن الرقم يتكون من 5 أرقام
    if (!/^\d{5}$/.test(id)) {
        alert("الرقم التعريفي يجب أن يكون مكونًا من 5 أرقام");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("تم تسجيل الدخول بنجاح");

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            document.getElementById("loginModal").style.display = "none";

            // التوجيه إلى صفحة معينة
            window.location.href = "contact.html"; // ← غيرها لاسم الصفحة اللي عندك
        } else {
            alert(data.message || "الرقم أو كلمة المرور غير صحيحة");
        }
    } catch (error) {
        console.error("خطأ في الاتصال:", error);
        alert("حدث خطأ أثناء الاتصال بالسيرفر. يرجى المحاولة لاحقًا");
    }
});

document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "none";
}); 
document.addEventListener('DOMContentLoaded', function() {
    // اختيار العناصر المطلوبة
    const menuLink = document.querySelector('.menu-link');
    const menu = document.getElementById('menu');
    
    // إضافة حدث النقر لأيقونة القائمة
    if(menuLink && menu) {
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // تبديل حالة القائمة (فتح/إغلاق)
            if(menu.classList.contains('active')) {
                menu.classList.remove('active');
                menu.style.maxHeight = '0';
            } else {
                menu.classList.add('active');
                menu.style.maxHeight = menu.scrollHeight + 'px';
            }
        });
        
        // إغلاق القائمة عند النقر على أي عنصر فيها (اختياري)
        const menuItems = menu.querySelectorAll('.main-menu li a'); // تم تعديل selector
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if(window.innerWidth < 950) {
                    menu.classList.remove('active');
                    menu.style.maxHeight = '0';
                }
            });
        });
    }
});
