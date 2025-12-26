// ===== Date-Time banner (BN) =====
    function updateDateTime(){
      const now=new Date();
      const days=["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"];
      const months=["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
      const dayName=days[now.getDay()],date=now.getDate(),month=months[now.getMonth()],year=now.getFullYear();
      let h=now.getHours(),m=now.getMinutes(),s=now.getSeconds();
      const ampm=h>=12?"PM":"AM"; h=h%12; h=h?h:12;
      const pad=n=>n.toString().padStart(2,"0");
      const timeStr=`${pad(h)}:${pad(m)}:${pad(s)} ${ampm}`;
      const dateStr=`আজ ${dayName}, ${date} ${month}, ${year}। সময়ঃ ${timeStr}`;
      const el=document.getElementById('datetimeBanner'); if(el) el.textContent=dateStr;
    }
    setInterval(updateDateTime,1000); updateDateTime();

    // ===== Slider =====
    (function(){
      const slides=document.querySelectorAll('.slides img');
      let i=0; function show(n){slides.forEach(s=>s.classList.remove('active')); i=(n+slides.length)%slides.length; slides[i].classList.add('active');}
      function next(){show(i+1);} setInterval(next,5000); show(0);
    })();

    // ===== Navbar JavaScript =====
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const dropdown = document.getElementById('dropdown');
    const othersMenu = document.getElementById('othersMenu');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = navLinksContainer.querySelectorAll('a[href^="#"]');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const backToTop = document.getElementById('backToTop');

    // Helper functions
    function openMenu(){
      navbar.classList.add('active');
      menuToggle.textContent = '✖';
      menuToggle.classList.add('rotated');
      menuToggle.setAttribute('aria-expanded','true');
    }

    function closeMenu(){
      navbar.classList.remove('active');
      menuToggle.textContent = '☰';
      menuToggle.classList.remove('rotated');
      menuToggle.setAttribute('aria-expanded','false');
      dropdown.classList.remove('active');
      othersMenu.setAttribute('aria-expanded','false');
    }

    function toggleMenu(){ 
      if(navbar.classList.contains('active')){
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Toggle menu (click)
    menuToggle.addEventListener('click', function(e){
      e.stopPropagation();
      toggleMenu();
    });

    // Dropdown (mobile click / keyboard)
    function toggleDropdown(e){
      if (window.innerWidth <= 768){
        e.preventDefault();
        e.stopPropagation();
        const willBeActive = !dropdown.classList.contains('active');
        dropdown.classList.toggle('active');
        othersMenu.setAttribute('aria-expanded', willBeActive ? 'true' : 'false');
      }
    }

    othersMenu.addEventListener('click', toggleDropdown);
    othersMenu.addEventListener('keydown', function(e){
      if (e.key==='Enter' || e.key===' '){
        toggleDropdown(e);
      }
    });

    // Close on link click (mobile)
    navLinks.forEach(function(link){
      link.addEventListener('click', function(){
        if (window.innerWidth <= 768){ 
          setTimeout(function(){
            closeMenu();
          }, 300);
        }
      });
    });

    // Click outside to close (mobile)
    document.addEventListener('click', function(e){
      if (window.innerWidth <= 768 && !navbar.contains(e.target) && navbar.classList.contains('active')){
        closeMenu();
      }
    });

    // Search functionality
    function handleSearch(){
      const query = searchInput.value.trim();
      if (query){ 
        alert('অনুসন্ধান: "' + query + '"\nএই বৈশিষ্ট্যটি শীঘ্রই যোগ করা হবে।');
      } else { 
        alert('অনুগ্রহ করে অনুসন্ধানের জন্য কিছু লিখুন।');
      }
    }

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e){
      if(e.key==='Enter'){
        handleSearch();
      }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
      anchor.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target){ 
          e.preventDefault();
          // Get navbar height (adjust selector if needed)
          const navbar = document.getElementById('navbar');
          const navHeight = navbar ? navbar.offsetHeight : 0;
          // Get target's position relative to document
          const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
          // Scroll to position minus navbar height (with a little extra gap)
          window.scrollTo({
            top: targetTop - navHeight - 10, // 10px gap for visual comfort
            behavior: 'smooth'
          });
        }
      });
    });

    // Resize handling: বড় স্ক্রিনে গেলে মেনু জোর করে ক্লোজ
    window.addEventListener('resize', function(){
      if (window.innerWidth > 768){ 
        closeMenu();
      }
    });

    // Initial state: মেনু ক্লোজ থাকবে
    document.addEventListener('DOMContentLoaded', function(){
      closeMenu();
      onScroll(); // Back to top button visibility
    });

    // ===== Back to Top functionality =====
    function canScroll(){ 
      return document.documentElement.scrollHeight > window.innerHeight + 40;
    }

    function onScroll(){
      const threshold = window.innerWidth <= 768 ? 40 : 100;
      const show = (window.scrollY > threshold) && canScroll();
      if(show){
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
    window.addEventListener('orientationchange', onScroll);
    onScroll();

    backToTop.addEventListener('click', function(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // ===== Feedback form =====
    const feedbackBtn = document.getElementById('feedbackBtn');
    const feedbackForm = document.getElementById('feedbackForm');
    const closeFeedbackForm = document.getElementById('closeFeedbackForm');
    const feedbackTextarea = feedbackForm ? feedbackForm.querySelector('textarea') : null;
    const feedbackFormElement = feedbackForm ? feedbackForm.querySelector('form') : null;

    if(feedbackBtn && feedbackForm){
      feedbackBtn.addEventListener('click', function(){
        feedbackForm.style.display = 'block';
        if(feedbackTextarea) feedbackTextarea.focus();
      });

      closeFeedbackForm.addEventListener('click', function(){
        feedbackForm.style.display = 'none';
      });

      feedbackFormElement.addEventListener('submit', function(e){
        e.preventDefault();
        alert('আপনার মতামতের জন্য ধন্যবাদ!');
        feedbackForm.style.display = 'none';
        feedbackFormElement.reset();
      });

      window.addEventListener('click', function(e){
        if(e.target === feedbackForm){
          feedbackForm.style.display = 'none';
        }
      });
    }
    
    function openForm() {
  document.getElementById("advice-form").style.display = "block";
}

function closeForm() {
  document.getElementById("advice-form").style.display = "none";
}
