// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickInsideHamburger && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.7)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Project cards animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize project data on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize project data first
    initializeProjectData();

    // Add typing effect to the main heading
    const heading = document.querySelector('.hero-text h1');
    const originalText = heading.textContent;
    heading.textContent = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            heading.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);

    // Add hover effect to project cards
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const image = card.querySelector('.project-image img');
        
        card.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
            overlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
            overlay.style.opacity = '0';
        });
    });

    // Add floating animation to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = profileImg.style.transform || 'translateY(0px)';
            const currentY = parseInt(currentTransform.match(/-?\d+/) || [0])[0];
            const newY = currentY + (floatDirection * 2);
            
            if (Math.abs(newY) > 20) {
                floatDirection *= -1;
            }
            
            profileImg.style.transform = `translateY(${newY}px)`;
        }, 100);
    }
});

// Add glow effect to buttons on hover
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 50px var(--neon-red)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 0 25px rgba(255, 0, 60, 0.3)';
    });
});

// Contact Form Handling with EmailJS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("G2-g3buSCkAaxklyO"); // Você precisa substituir isso pela sua chave pública do EmailJS
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const submitBtn = document.getElementById('submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('from_name');
            const email = formData.get('from_email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, digite um endereço de email válido.', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'vitor.gustavo.jc@gmail.com',
                reply_to: email
            };
            
            // Send email via EmailJS
            emailjs.send('service_2j7jelj', 'template_h2hr9pm', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
        border: 1px solid ${type === 'success' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)'};
        border-radius: 10px;
        padding: 15px 20px;
        color: ${type === 'success' ? '#00ff00' : '#ff0000'};
        backdrop-filter: blur(10px);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Project Modal Functionality - Load from localStorage or default data
let projectData = {};

// Initialize project data
async function initializeProjectData(forceReload = false) {
    try {
        // Always load from JSON file (ignore localStorage)
        console.log('Loading projects from JSON...');
        const response = await fetch('./projects-data.json');
        if (response.ok) {
            const data = await response.json();
            const projects = data.projects;
            
            // Transform array to object for compatibility
            projectData = projects.reduce((acc, project) => {
                acc[project.id] = {
                    title: project.title,
                    subtitle: project.subtitle,
                    description: project.description,
                    image: project.image,
                    liveLink: project.liveLink,
                    githubLink: project.githubLink,
                    features: project.features,
                    technologies: project.technologies,
                    tags: project.technologies, // Use technologies as tags for compatibility
                    stats: project.stats || {
                        duration: "6",
                        commits: "150+",
                        tech: project.technologies.length.toString()
                    },
                    gallery: project.gallery || [
                        project.image,
                        project.image,
                        project.image,
                        project.image
                    ],
                    category: project.category,
                    status: project.status,
                    date: project.date,
                    progress: project.progress,
                    challenges: project.challenges,
                    outcomes: project.outcomes
                };
                return acc;
            }, {});
            
            console.log(`Loaded ${projects.length} projects from JSON`);
        } else {
            throw new Error('Failed to load projects data from JSON');
        }
    } catch (error) {
        console.error('Error loading project data:', error);
        // Fallback to empty data
        projectData = {};
    }
    
    // Render projects after data is loaded
    renderProjects();
}

// Function to render projects dynamically
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Convert projectData object to array format
    const projects = Object.keys(projectData).map(key => ({
        id: key,
        ...projectData[key]
    }));
    
    console.log(`Rendering ${projects.length} projects`);
    
    // Render each project
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
    
    // Re-initialize observers and filters
    initializeProjectObservers();
    initializeProjectFilters();
    
    // Initialize modal listeners for the new projects
    if (window.initializeModalListeners) {
        window.initializeModalListeners();
    }
}

// Function to create a project card
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project', project.id);
    card.setAttribute('data-category', project.category);
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transitionDelay = `${index * 0.1}s`;
    
    // Get status display
    const statusDisplay = project.status === 'completed' ? 'Completed' : 
                         project.status === 'active' ? 'Active' :
                         project.status === 'in-progress' ? 'In Progress' : 'Completed';
    
    // Get category display
    const categoryDisplay = project.category === 'ai' ? 'Artificial Intelligence' :
                           project.category === 'automation' ? 'Automation' :
                           project.category === 'web' ? 'Web Development' :
                           project.category === 'iot' ? 'IoT & Analytics' : 'Technology';
    
    card.innerHTML = `
        <div class="project-status">${statusDisplay}</div>
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
                <div class="project-links">
                    <button class="project-btn project-details-btn">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    ${project.githubLink ? `<a href="${project.githubLink}" class="project-btn" target="_blank">
                        <i class="fa-brands fa-github"></i>
                    </a>` : ''}
                    ${project.liveLink ? `<a href="${project.liveLink}" class="project-btn" target="_blank">
                        <i class="fa-solid fa-external-link-alt"></i>
                    </a>` : ''}
                </div>
                <div class="project-overlay-text">
                    <h4>View Details</h4>
                    <p>${project.subtitle || project.title}</p>
                </div>
            </div>
        </div>
        <div class="project-info">
            <div class="project-meta">
                <span class="project-category">${categoryDisplay}</span>
                <span class="project-date">${project.date || '2025'}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}</p>
            <div class="project-tech">
                ${project.technologies.slice(0, 4).map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-progress">
                <div class="project-progress-bar" style="width: ${project.progress || 100}%"></div>
            </div>
        </div>
    `;
    
    return card;
}

// Helper functions to get project properties
function getCategoryFromProject(key) {
    const categoryMap = {
        'ecommerce': 'ai',
        'taskmanager': 'automation',
        'weather': 'ai',
        'portfolio': 'web',
        'analytics': 'iot',
        'assistant': 'ai'
    };
    return categoryMap[key] || 'ai';
}

function getStatusFromProject(key) {
    return 'completed'; // Default status
}

function getProgressFromProject(key) {
    return 100; // Default progress
}

function getDateFromProject(key) {
    return '2025'; // Default date
}

// Function to initialize project observers
function initializeProjectObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// Function to initialize project filters
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Remove existing event listeners and add new ones
    filterBtns.forEach(btn => {
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Get updated buttons after replacement
    const newFilterBtns = document.querySelectorAll('.filter-btn');
    
    newFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            newFilterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            document.querySelectorAll('.project-card').forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal and interaction functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Function to get project data by ID
    function getProjectById(projectId) {
        const savedProjects = localStorage.getItem('portfolioProjects');
        if (savedProjects) {
            const projects = JSON.parse(savedProjects);
            return projects.find(p => p.id === projectId);
        } else {
            return projectData[projectId];
        }
    }

    // Function to initialize modal event listeners (called after projects are rendered)
    window.initializeModalListeners = function() {
        const detailBtns = document.querySelectorAll('.project-details-btn');
        
        detailBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const projectCard = this.closest('.project-card');
                const projectId = projectCard.getAttribute('data-project');
                const project = getProjectById(projectId);
                
                if (project) {
                    // Populate modal with project data
                    document.getElementById('modal-title').textContent = project.title;
                    document.getElementById('modal-subtitle').textContent = project.subtitle || '';
                    document.getElementById('modal-description').textContent = project.description;
                    document.getElementById('modal-image').src = project.image;
                    
                    // Handle GitHub link with proper validation and debugging
                    const githubLink = document.getElementById('modal-github-link');
                    console.log('GitHub Link:', project.githubLink);
                    console.log('GitHub Link exists:', !!project.githubLink);
                    
                    if (project.githubLink && project.githubLink.trim() !== '' && project.githubLink !== '#') {
                        githubLink.href = project.githubLink;
                        githubLink.style.display = 'inline-flex';
                        githubLink.style.visibility = 'visible';
                        githubLink.target = '_blank';
                        githubLink.rel = 'noopener noreferrer';
                        githubLink.removeAttribute('disabled');
                        console.log('GitHub link set to:', project.githubLink);
                    } else {
                        githubLink.style.display = 'none';
                        githubLink.style.visibility = 'hidden';
                        console.log('GitHub link not available');
                    }
                    
                    // Handle Live Demo button visibility
                    const liveLinkBtn = document.getElementById('modal-live-link');
                    if (project.liveLink && project.liveLink.trim() !== '') {
                        liveLinkBtn.href = project.liveLink;
                        liveLinkBtn.style.display = 'inline-flex';
                        liveLinkBtn.style.visibility = 'visible';
                        liveLinkBtn.target = '_blank';
                        liveLinkBtn.rel = 'noopener noreferrer';
                        liveLinkBtn.removeAttribute('disabled');
                    } else {
                        liveLinkBtn.style.display = 'none';
                        liveLinkBtn.style.visibility = 'hidden';
                    }
                    
                    // Populate tags
                    const tagsContainer = document.getElementById('modal-tags');
                    tagsContainer.innerHTML = '';
                    if (project.tags) {
                        project.tags.forEach(tag => {
                            const span = document.createElement('span');
                            span.className = 'modal-tag';
                            span.textContent = tag;
                            tagsContainer.appendChild(span);
                        });
                    }
                    
                    // Populate features
                    const featuresList = document.getElementById('modal-features');
                    featuresList.innerHTML = '';
                    if (project.features) {
                        project.features.forEach(feature => {
                            const li = document.createElement('li');
                            li.textContent = feature;
                            featuresList.appendChild(li);
                        });
                    }
                    
                    // Populate technologies
                    const techContainer = document.getElementById('modal-tech');
                    techContainer.innerHTML = '';
                    if (project.technologies) {
                        project.technologies.forEach(tech => {
                            const span = document.createElement('span');
                            span.className = 'tech-tag';
                            span.textContent = tech;
                            techContainer.appendChild(span);
                        });
                    }
                    
                    // Populate statistics
                    if (project.stats) {
                        document.getElementById('stat-duration').textContent = project.stats.duration || 'N/A';
                        document.getElementById('stat-commits').textContent = project.stats.commits || 'N/A';
                        document.getElementById('stat-tech').textContent = project.stats.tech || project.technologies?.length || 'N/A';
                    }
                    
                    // Populate gallery
                    const galleryContainer = document.getElementById('modal-gallery');
                    galleryContainer.innerHTML = '';
                    if (project.gallery && project.gallery.length > 0) {
                        project.gallery.forEach((imageSrc, index) => {
                            const img = document.createElement('img');
                            img.src = imageSrc;
                            img.alt = `${project.title} - Screenshot ${index + 1}`;
                            img.addEventListener('click', function() {
                                const mainImage = document.getElementById('modal-image');
                                mainImage.src = this.src;
                                mainImage.style.transform = 'scale(1.05)';
                                setTimeout(() => {
                                    mainImage.style.transform = 'scale(1)';
                                }, 300);
                            });
                            galleryContainer.appendChild(img);
                        });
                    } else {
                        // Fallback gallery if no gallery provided
                        for (let i = 1; i <= 4; i++) {
                            const img = document.createElement('img');
                            img.src = project.image;
                            img.alt = `${project.title} - View ${i}`;
                            img.addEventListener('click', function() {
                                const mainImage = document.getElementById('modal-image');
                                mainImage.src = this.src;
                                mainImage.style.transform = 'scale(1.05)';
                                setTimeout(() => {
                                    mainImage.style.transform = 'scale(1)';
                                }, 300);
                            });
                            galleryContainer.appendChild(img);
                        }
                    }
                    
                    // Show modal
                    modal.classList.add('show');
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    // Add animation class
                    setTimeout(() => {
                        modal.querySelector('.modal-content').style.animation = 'modalFadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
                    }, 10);
                }
            });
        });
    };

    const detailBtns = document.querySelectorAll('.project-details-btn');

    // Open modal when project detail button is clicked
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const projectCard = this.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project');
            const project = getProjectById(projectId);
            
            if (project) {
                // Populate modal with project data
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-subtitle').textContent = project.subtitle;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-image').src = project.image;
                
                // Handle GitHub link with proper validation
                const githubLink = document.getElementById('modal-github-link');
                console.log('GitHub Link:', project.githubLink);
                
                if (project.githubLink && project.githubLink.trim() !== '' && project.githubLink !== '#') {
                    githubLink.href = project.githubLink;
                    githubLink.style.display = 'inline-flex';
                    githubLink.style.visibility = 'visible';
                    githubLink.target = '_blank';
                    githubLink.rel = 'noopener noreferrer';
                    githubLink.removeAttribute('disabled');
                    console.log('GitHub link set to:', project.githubLink);
                } else {
                    githubLink.style.display = 'none';
                    githubLink.style.visibility = 'hidden';
                    console.log('GitHub link not available');
                }
                
                // Handle Live Demo button visibility
                const liveLinkBtn = document.getElementById('modal-live-link');
                if (project.liveLink && project.liveLink.trim() !== '') {
                    liveLinkBtn.href = project.liveLink;
                    liveLinkBtn.style.display = 'inline-flex';
                    liveLinkBtn.style.visibility = 'visible';
                    liveLinkBtn.target = '_blank';
                    liveLinkBtn.rel = 'noopener noreferrer';
                    liveLinkBtn.removeAttribute('disabled');
                } else {
                    liveLinkBtn.style.display = 'none';
                    liveLinkBtn.style.visibility = 'hidden';
                }
                
                // Populate tags
                const tagsContainer = document.getElementById('modal-tags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'modal-tag';
                    span.textContent = tag;
                    tagsContainer.appendChild(span);
                });
                
                // Populate features
                const featuresList = document.getElementById('modal-features');
                featuresList.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                // Populate technologies
                const techContainer = document.getElementById('modal-tech');
                techContainer.innerHTML = '';
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });
                
                // Populate statistics
                document.getElementById('stat-duration').textContent = project.stats.duration;
                document.getElementById('stat-commits').textContent = project.stats.commits;
                document.getElementById('stat-tech').textContent = project.stats.tech;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Add animation class
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.animation = 'modalFadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
                }, 10);
            }
        });
    });

    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Add touch feedback for mobile
        closeBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        closeBtn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Ensure modal buttons work correctly
    const githubBtn = document.getElementById('modal-github-link');
    const liveBtn = document.getElementById('modal-live-link');
    
    if (githubBtn) {
        githubBtn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('GitHub button clicked, navigating to:', href);
            if (href && href !== '#') {
                window.open(href, '_blank');
                return false;
            }
        });
    }
    
    if (liveBtn) {
        liveBtn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            console.log('Live Demo button clicked, navigating to:', href);
            if (href && href !== '#') {
                window.open(href, '_blank');
                return false;
            }
        });
    }

    // Gallery image lightbox functionality
    const galleryImages = document.querySelectorAll('.modal-gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const mainImage = document.getElementById('modal-image');
            mainImage.src = this.src;
            mainImage.style.transform = 'scale(1.05)';
            setTimeout(() => {
                mainImage.style.transform = 'scale(1)';
            }, 300);
        });
    });
});

// Function to clear cache and reload projects from JSON
function reloadProjectsFromJSON() {
    console.log('Reloading projects from JSON...');
    initializeProjectData();
}

// Clear any existing cache on page load
localStorage.removeItem('portfolioProjects');
localStorage.removeItem('projectsLastLoaded');

// Expose reload function globally for debugging
window.reloadProjects = reloadProjectsFromJSON;