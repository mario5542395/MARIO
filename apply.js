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

