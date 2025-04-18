
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
