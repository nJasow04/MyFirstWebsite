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

    // Project hover effect
    const projectsContainer = document.getElementById("projects");
    if (projectsContainer) {
        projectsContainer.onmousemove = e => {
            for(const project of document.getElementsByClassName("project")){
                const rect = project.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;
                project.style.setProperty("--mouse-x", `${x}px`);
                project.style.setProperty("--mouse-y", `${y}px`);
            }
        };
    }

    // Project filtering functionality
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

    // Scroll to project details
    projects.forEach(project => {
        project.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const detailSection = document.getElementById(projectId);
            if (detailSection) {
                detailSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Multiple Slideshow Functionality
    let slideIndices = {};

    function showSlides(n, slideshowId) {
        let slideshow = document.getElementById("slideshow-" + slideshowId);
        if (!slideshow) {
            console.error("Slideshow not found:", slideshowId);
            return;
        }
        // Find the closest parent with class 'project-detail'
        let projectDetail = slideshow.closest('.project-detail');
        if (!projectDetail) {
            console.error("Parent project-detail not found for slideshow:", slideshowId);
            return;
        }

        let slides = slideshow.getElementsByClassName("mySlides");
        let dots = projectDetail.getElementsByClassName("dot");
        
        console.log(`Slideshow ${slideshowId}: Found ${slides.length} slides and ${dots.length} dots`);

        if (!slideIndices[slideshowId]) {
            slideIndices[slideshowId] = 1;
        }
        
        if (n > slides.length) { slideIndices[slideshowId] = 1 }
        if (n < 1) { slideIndices[slideshowId] = slides.length }

        console.log(`Current slide index for ${slideshowId}: ${slideIndices[slideshowId]}`);
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
            // Only try to update dots if they exist
        if (dots.length > 0) {
            console.log(`Updating dots for slideshow ${slideshowId}`)
            for (let i = 0; i < dots.length; i++) {
                console.log(`Dot ${i} before: ${dots[i].className}`);
                dots[i].className = dots[i].className.replace(" dot-active", "");
                console.log(`Dot ${i} after: ${dots[i].className}`);
            }
            console.log(`Setting active dot: ${slideIndices[slideshowId] - 1}`);
            dots[slideIndices[slideshowId] - 1].className += " dot-active";
            console.log(`Active dot class: ${dots[slideIndices[slideshowId] - 1].className}`);

        } else {
            console.log(`No dots found for lol slideshow ${slideshowId}`);
        }
        
        slides[slideIndices[slideshowId] - 1].style.display = "block";
    }

    function plusSlides(n, slideshowId) {
        showSlides(slideIndices[slideshowId] += n, slideshowId);
    }

    function currentSlide(n, slideshowId) {
        showSlides(slideIndices[slideshowId] = n, slideshowId);
    }

    // Initialize all slideshows
    function initSlideshows() {
        console.log("Initializing slideshows"); // Debug log
        let slideshows = document.getElementsByClassName("slideshow-container");
        for (let i = 0; i < slideshows.length; i++) {
            let slideshowId = slideshows[i].id.split("-")[1];
            console.log("Initializing slideshow:", slideshowId); // Debug log
            showSlides(1, slideshowId);
        }
    }

    // Expose slideshow functions to global scope
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;

    // Initialize everything
    document.addEventListener('DOMContentLoaded', function() {
        filterProjects('all');
        toggleBacktotop();
        initSlideshows();
    });
})();