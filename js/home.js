document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".about-img");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.6 });

    images.forEach(image => observer.observe(image));
});
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
const videoModal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const videoThumbnail = document.getElementById("videoThumbnail");
const closeModal = document.getElementById("closeModal");

// جعل النافذة المنبثقة مخفية عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
    videoModal.style.display = "none";
});

// تشغيل الفيديو عند الضغط على الصورة
videoThumbnail.addEventListener("click", function () {
    videoModal.style.display = "flex"; // عرض النافذة المنبثقة
    videoPlayer.play(); // تشغيل الفيديو عند الضغط
});

// عند الضغط على زر الإغلاق
closeModal.addEventListener("click", function () {
    videoModal.style.display = "none"; // إخفاء النافذة
    videoPlayer.pause(); // إيقاف الفيديو
    videoPlayer.currentTime = 0; // إعادة الفيديو من البداية
});

// إغلاق الفيديو عند الضغط خارج النافذة
window.addEventListener("click", function (event) {
    if (event.target === videoModal) {
        videoModal.style.display = "none";
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
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
document.addEventListener('DOMContentLoaded', function() {
    var teacherSlider = document.getElementById('teacherSlider');
    var carousel = new bootstrap.Carousel(teacherSlider, {
        interval: 3000,
        pause: false, // لا يتوقف عند تمرير الماوس فوقه
        wrap: true    // يعيد التشغيل من البداية بعد النهاية
    });
});
// JavaScript
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
        const response = await fetch("http://54.242.19.19:3000/api/Login", {
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
            window.location.href = "HomeAdvisor.html"; // ← غيرها لاسم الصفحة اللي عندك
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


const apiUrl = 'http://54.242.19.19:3000/api/teachers';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(responseData => {
    if (!responseData.success || !Array.isArray(responseData.data)) {
      throw new Error('Invalid data format from API');
    }

    const teachersData = responseData.data;
    const carouselInner = document.querySelector('#teacherSlider .carousel-inner');
    
    if (!carouselInner) {
      throw new Error('Teacher slider carousel inner element not found');
    }
    
    carouselInner.innerHTML = '';

    const teachersPerSlide = 3;
    let slideIndex = 0;

    for (let i = 0; i < teachersData.length; i += teachersPerSlide) {
      const teachers = teachersData.slice(i, i + teachersPerSlide);
      const isActive = slideIndex === 0 ? 'active' : '';
      let slideHTML = `<div class="carousel-item ${isActive}"><div class="row g-4 justify-content-center">`;

      teachers.forEach((teacher, index) => {
        const delay = (0.1 + index * 0.2).toFixed(1);
        
        // تعديل مهم: التحقق من وجود صورة واستخدام صورة افتراضية إذا لم توجد
        const teacherImage = teacher.email && teacher.email.startsWith('http') ? 
                            teacher.email : 
                            'https://via.placeholder.com/200x200?text=No+Image';
        
        slideHTML += `
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${delay}s">
            <div class="team-item position-relative">
              <div class="image-container rounded-circle">
                <img class="img-fluid" src="${teacherImage}" alt="${teacher.username}" 
                     onerror="this.src='https://via.placeholder.com/200x200?text=Image+Error'">
              </div>
              <div class="team-text">
                <h3>${teacher.username}</h3>
                <div class="d-flex align-items-center justify-content-center">
                  <a class="btn btn-square btn-primary mx-1" href="#"><i class="fab fa-facebook-f"></i></a>
                  <a class="btn btn-square btn-primary mx-1" href="#"><i class="fab fa-twitter"></i></a>
                  <a class="btn btn-square btn-primary mx-1" href="#"><i class="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      slideHTML += '</div></div>';
      carouselInner.innerHTML += slideHTML;
      slideIndex++;
    }
  })
  .catch(error => {
    console.error('Error loading teachers:', error);
    const errorElement = document.createElement('div');
    errorElement.className = 'alert alert-danger';
    errorElement.textContent = 'Failed to load teachers. Please try again later.';
    document.querySelector('#teacherSlider').prepend(errorElement);
  });



  function fetchAndDisplayNews() {
    const apiUrl = 'http://54.242.19.19:3000/api/news';
    const newsContainer = document.querySelector('.news-articles');
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // تأكد من وجود بيانات الأخبار
        if (!data.news || !Array.isArray(data.news)) {
          throw new Error('Invalid news data format');
        }
  
        // مسح المحتوى القديم
        newsContainer.innerHTML = '';
  
        // إضافة كل خبر جديد
        data.news.forEach(newsItem => {
          const newsArticle = document.createElement('div');
          newsArticle.className = 'news-article';
          
          // استخدام صورة افتراضية إذا لم توجد صورة
          const newsImage = newsItem.photo || 'https://via.placeholder.com/400x300?text=No+Image';
          
          newsArticle.innerHTML = `
            <img src="${newsImage}" alt="${newsItem.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Error'">
            <div class="article-content">
              <h3>${newsItem.title}</h3>
              <p>${newsItem.content}</p>
            </div>
          `;
          
          newsContainer.appendChild(newsArticle);
        });
      })
      .catch(error => {
        console.error('Error loading news:', error);
        // عرض رسالة خطأ للمستخدم
        newsContainer.innerHTML = `
          <div class="news-error">
            <p>Unable to load news. Please try again later.</p>
          </div>
        `;
      });
  }
  
  // استدعاء الدالة عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', fetchAndDisplayNews);

  document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://54.242.19.19:3000/api/feedbacks';
    const testimonialsContainer = document.getElementById('testimonials-container');

    // عرض حالة التحميل
    testimonialsContainer.innerHTML = '<div class="loading-testimonials">Loading testimonials...</div>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(feedbacks => {
            // تحقق من صحة البيانات
            if (!Array.isArray(feedbacks)) {
                throw new Error('Invalid data format received from API');
            }

            // إذا لم توجد تعليقات
            if (feedbacks.length === 0) {
                testimonialsContainer.innerHTML = '<div class="no-testimonials">No testimonials available yet.</div>';
                return;
            }

            // مسح محتوى التحميل
            testimonialsContainer.innerHTML = '';

            // عرض كل تعليق
            feedbacks.forEach((feedback, index) => {
                const testimonialCard = document.createElement('div');
                testimonialCard.className = 'testimonial-card';
                
                // معالجة الصورة - استخدام صورة افتراضية إذا لم توجد
                const userPhoto = feedback.senderPhoto && feedback.senderPhoto !== 'photo' ? 
                                  feedback.senderPhoto : 
                                  'https://via.placeholder.com/100?text=User';
                
                testimonialCard.innerHTML = `
                    <div class="testimonial-header">
                        <img src="${userPhoto}" alt="${feedback.senderName}" 
                             onerror="this.src='https://via.placeholder.com/100?text=User'" 
                             class="testimonial-photo">
                        <h2>${feedback.senderName || 'Parent'}</h2>
                    </div>
                    <p>${feedback.feedbackMessage || 'No feedback message provided.'}</p>
                    <small class="testimonial-date">${new Date(feedback.createdAt).toLocaleDateString()}</small>
                `;
                
                testimonialsContainer.appendChild(testimonialCard);
            });
        })
        .catch(error => {
            console.error('Error fetching testimonials:', error);
            testimonialsContainer.innerHTML = `
                <div class="error-testimonial">
                    <p>Failed to load testimonials. Please try again later.</p>
                    ${error.message ? `<small>Error: ${error.message}</small>` : ''}
                </div>
            `;
        });
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
        const menuItems = menu.querySelectorAll('.main-menu li a menu');
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