/* ==========================================================================
   FARHAN NASIR - PORTFOLIO INTERACTIVITY SCRIPT
   - Mobile Hamburger Menu Toggle
   - Smooth Scrolling & Active Navigation Link Highlighting
   - Projects Category Filtering (All, Web, Dashboard, E-Commerce)
   - Interactive Project Details Modal
   - Service Card Scroll Reveal
   - Animated Stats Counters on Viewport Entry
   - Animated Skills Progress Bars on Viewport Entry
   - Back-to-Top Floating Button
   - Resume / CV Download Trigger
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    // Reveal the service cards as they enter the viewport.
    const serviceCards = document.querySelectorAll('[data-service-reveal]');
    if ('IntersectionObserver' in window) {
        const serviceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('service-card-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        serviceCards.forEach(card => {
            card.classList.add('service-card-reveal');
            serviceObserver.observe(card);
        });
    } else {
        serviceCards.forEach(card => card.classList.add('service-card-visible'));
    }

    // ==========================================================================
    // 1. MOBILE HAMBURGER MENU TOGGLE
    // ==========================================================================
    if (hamburgerBtn && dropdownMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
            
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                if (dropdownMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close dropdown when clicking a link inside it
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                dropdownMenu.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                dropdownMenu.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ==========================================================================
    // 2. ACTIVE NAVIGATION LINK & SCROLL-TO-TOP BUTTON
    // ==========================================================================
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        dropdownLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

    });

    // ==========================================================================
    // 3. PORTFOLIO FILTERING LOGIC
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectRows = document.querySelectorAll('.portfolio-content .row');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectRows.forEach(row => {
                const category = row.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    row.classList.remove('hide');
                } else {
                    row.classList.add('hide');
                }
            });
        });
    });

    // ==========================================================================
    // 4. PROJECTS DATA & MODAL LOGIC
    // ==========================================================================
    const projectsData = [
        {
            title: "Pizza World",
            category: "E-Commerce & Interactive UI",
            image: "images/project1.png",
            description: "A responsive pizza ordering website with menu browsing and an interactive cart.",
            techStack: ["HTML5", "CSS3", "JavaScript"],
            liveUrl: "https://farhani981.github.io/tasty-fresh-pizza/",
            githubUrl: "https://github.com/Farhani981"
        },
        {
            title: "Student Skill Tracker",
            category: "Dashboard & Web App",
            image: "images/student-skill-tracker.png",
            description: "A responsive student platform to log, monitor, and showcase skills and progress. Learn React, Python, or design and keep everything organized in one place.",
            techStack: ["React.js", "JavaScript", "CSS3", "HTML5"],
            liveUrl: "https://student-skill-tracker-e1899.web.app",
            githubUrl: "https://github.com/Farhani981"
        },
        {
            title: "Neumorphic Calculator",
            category: "Web App",
            image: "images/calculator-preview.svg",
            description: "A responsive calculator with a dark neumorphic interface, clear display, and essential arithmetic operations.",
            techStack: ["HTML5", "CSS3", "JavaScript"],
            liveUrl: "https://farhani981.github.io/Calculater/",
            githubUrl: "https://github.com/Farhani981"
        }
    ];

    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTechStack = document.getElementById('modalTechStack');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalGithubLink = document.getElementById('modalGithubLink');

    function openProjectModal(index) {
        const project = projectsData[index];
        if (!project || !projectModal) return;

        modalImg.src = project.image;
        modalImg.alt = project.title;
        modalCategory.textContent = project.category;
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.description;
        modalLiveLink.href = project.liveUrl;
        modalGithubLink.href = project.githubUrl;

        modalTechStack.innerHTML = '';
        project.techStack.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            modalTechStack.appendChild(tag);
        });

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.open-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const index = btn.getAttribute('data-project');
            if (index !== null) {
                const projectIndex = parseInt(index, 10);
                if (projectIndex >= 0 && projectIndex <= 2) {
                    window.location.href = projectsData[projectIndex].liveUrl;
                } else {
                    openProjectModal(projectIndex);
                }
            }
        });
    });

    document.querySelectorAll('.portfolio-content .row').forEach(row => {
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => {
            const index = row.getAttribute('data-project');
            if (index !== null) {
                const projectIndex = parseInt(index, 10);
                if (projectIndex >= 0 && projectIndex <= 2) {
                    window.location.href = projectsData[projectIndex].liveUrl;
                } else {
                    openProjectModal(projectIndex);
                }
            }
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // ==========================================================================
    // ==========================================================================
    // 6. ANIMATED STATS COUNTERS (Dynamic Smooth Easing)
    // ==========================================================================
    const statsSection = document.querySelector('.hero-stats-wrapper') || document.querySelector('.about-stats');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
            const duration = 1600; // 1.6s smooth easing duration
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Exponential ease out for state-of-the-art dynamic feel
                const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentVal = Math.floor(easeOut * target);

                stat.textContent = currentVal;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                }
            });
        }, { threshold: 0.15 });
        statsObserver.observe(statsSection);

        // Auto-trigger on initial load if Hero section is already in view
        setTimeout(() => {
            if (!statsAnimated) {
                animateStats();
            }
        }, 700);
    }

    // ==========================================================================
    // 7. ANIMATED SKILLS PROGRESS BARS ON SCROLL
    // ==========================================================================
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    function animateSkills() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            if (percent) {
                bar.style.width = percent + '%';
            }
        });
    }

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    skillsAnimated = true;
                    animateSkills();
                }
            });
        }, { threshold: 0.25 });
        skillsObserver.observe(skillsSection);
    }

});
