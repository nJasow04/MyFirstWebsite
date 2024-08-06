(function() {
    "use strict";

    // Helper functions
    const select = (el, all = false) => {
        el = el.trim();
        return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
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

    // Back to top button
    const backtotop = select('.back-to-top');
    const toggleBacktotop = () => {
        if (window.scrollY > 100) {
            backtotop.classList.add('active');
        } else {
            backtotop.classList.remove('active');
        }
    };

    // Event listeners
    window.addEventListener('mousemove', updateCursor);

    window.addEventListener('scroll', toggleBacktotop);

    if (backtotop) {
        backtotop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Your existing portfolio.js code
    document.getElementById("projects").onmousemove = e => {
        for(const project of document.getElementsByClassName("project")){
            const rect = project.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;
            project.style.setProperty("--mouse-x", `${x}px`);
            project.style.setProperty("--mouse-y", `${y}px`);
        }
    };

    // New filtering functionality with smooth animation
    const projects = select('.project', true);
    const filterItems = select('.filter-item', true);

    function filterProjects(filter) {
        projects.forEach((project, index) => {
            setTimeout(() => {
                if (filter === 'all' || project.classList.contains(filter)) {
                    project.classList.remove('hide');
                } else {
                    project.classList.add('hide');
                }
            }, index * 50); // 50ms delay for each project
        });
    }

    // Filter functionality
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active class
            filterItems.forEach(fi => fi.classList.remove('active'));
            this.classList.add('active');

            // Filter projects with animation
            filterProjects(filter);
        });
    });

    // Initialize all projects as visible
    filterProjects('all');
    toggleBacktotop(); 
})();