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
