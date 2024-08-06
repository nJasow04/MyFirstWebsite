(function() {
  "use strict";

  // Helper functions
  const select = (el, all = false) => {
      el = el.trim();
      return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all);
      if (selectEl) {
          if (all) {
              selectEl.forEach(e => e.addEventListener(type, listener));
          } else {
              selectEl.addEventListener(type, listener);
          }
      }
  };

  // Cursor effects
  const cursorDot = select("[data-cursor-dot]");
  const cursorOutline = select("[data-cursor-outline]");

  const updateCursor = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      cursorOutline.animate({
          left: `${posX}px`,
          top: `${posY}px`
      }, {duration: 500, fill: "forwards"});
  };

  // Side container effect
  const left = select("#left-side");
  const container = select(".side-container");

  const handleMove = e => {
      left.style.width = `${e.clientX / window.innerWidth * 100}%`;
  };

  const handleMouseLeave = () => {
      document.onmousemove = null;
  };

  const handleMouseEnter = () => {
      container.onmousemove = handleMove;
  };

  // Menu effects
  const menu = select("#menu");
  Array.from(document.getElementsByClassName("menu-item"))
      .forEach((item, index) => {
          item.onmouseover = () => {
              menu.dataset.activeIndex = index;
          };
      });

  // Navbar links active state on scroll
  const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      select('#navbar .scrollto', true).forEach(navbarlink => {
          if (!navbarlink.hash) return;
          let section = select(navbarlink.hash);
          if (!section) return;
          if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
              navbarlink.classList.add('active');
          } else {
              navbarlink.classList.remove('active');
          }
      });
  };

  // Smooth scrolling
  const scrollto = (el) => {
      let elementPos = select(el).offsetTop;
      window.scrollTo({
          top: elementPos,
          behavior: 'smooth'
      });
  };

  // Back to top button
  const backtotop = select('.back-to-top');
  const toggleBacktotop = () => {
      if (window.scrollY > 100) {
          backtotop.classList.add('active');
      } else {
          backtotop.classList.remove('active');
      }
  };

  // Age calculation
  const birthDate = new Date('2004-08-29');
  const calculateAge = (birthDate) => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
  };

  const updateAge = () => {
      const ageElement = select('#age');
      const age = calculateAge(birthDate);
      ageElement.textContent = age;
  };

  // Event listeners
  window.addEventListener('mousemove', updateCursor);
  document.onmousemove = handleMove;
  document.ontouchmove = e => handleMove(e.touches[0]);
  container.onmouseleave = handleMouseLeave;
  container.onmouseenter = handleMouseEnter;

  window.addEventListener('scroll', () => {
      navbarlinksActive();
      toggleBacktotop();
  });

  window.addEventListener('load', () => {
      navbarlinksActive();
      toggleBacktotop();
      updateAge();

      if (window.location.hash) {
          if (select(window.location.hash)) {
              scrollto(window.location.hash);
          }
      }

      // Add other load event handlers here
  });

  on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
          e.preventDefault();
          scrollto(this.hash);
      }
  }, true);

  if (backtotop) {
    backtotop.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = select('#target-section');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

  // Add other initialization code here (e.g., for typed.js, portfolio, testimonials, etc.)
})();