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

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.textimonial_iner.owl-carousel');
    
    if (carousel) {
        let currentIndex = 0;
        const items = carousel.querySelectorAll('.owl-item:not(.cloned)');
        const totalItems = items.length;
        
        function rotateCarousel() {
            currentIndex = (currentIndex + 1) % totalItems;
            const offset = -currentIndex * 1443; // 1443px هو عرض كل عنصر كما في الكود الأصلي
            
            const stage = carousel.querySelector('.owl-stage');
            if (stage) {
                stage.style.transform = `translate3d(${offset}px, 0px, 0px)`;
                
                // تحديث النقاط النشطة (dots) إذا كانت موجودة
                const dots = carousel.querySelectorAll('.owl-dot');
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        // بدء الدوران كل 3 ثواني
        setInterval(rotateCarousel, 5000);
        
        // يمكنك إضافة تفاعل النقاط إذا أردت
        const dots = carousel.querySelectorAll('.owl-dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                const offset = -currentIndex * 1443;
                const stage = carousel.querySelector('.owl-stage');
                if (stage) {
                    stage.style.transform = `translate3d(${offset}px, 0px, 0px)`;
                }
            });
        });
    }
});
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

