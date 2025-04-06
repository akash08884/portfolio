// Reveal elements on scroll
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    const pythonAnimation = document.getElementById('python-animation');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 150) {
            section.classList.add('active');
            
            // Reset Python code animation when skills section comes into view
            if (section.id === 'skills' && pythonAnimation) {
                resetPythonAnimation();
                initializeCharts();
            }
        } else if (sectionTop > windowHeight) {
            // When section goes out of view (scrolling up), prepare it to animate again
            if (section.id === 'skills' && pythonAnimation) {
                preparePythonAnimationReset();
            }
        }
    });
}

// Function to reset Python code animation
function resetPythonAnimation() {
    const codeLines = document.querySelectorAll('.python-code-line');
    const visualizationResult = document.querySelector('.visualization-result');
    
    // Only reset if not already animating
    if (codeLines[0] && codeLines[0].style.animationPlayState === 'paused') {
        codeLines.forEach(line => {
            // Reset animation
            line.style.width = '0';
            line.style.animationPlayState = 'running';
        });
        
        if (visualizationResult) {
            visualizationResult.style.opacity = '0';
            visualizationResult.style.transform = 'translateY(20px)';
            // Force reflow
            visualizationResult.offsetHeight;
            // Restart animation
            visualizationResult.style.animation = 'fadeIn 1s ease-out 7s forwards';
        }
    }
}

// Prepare animation for reset when scrolling up
function preparePythonAnimationReset() {
    const codeLines = document.querySelectorAll('.python-code-line');
    
    codeLines.forEach(line => {
        line.style.animationPlayState = 'paused';
    });
}

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.getElementById('menu-icon');

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    
    // Change icon based on menu state
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

mobileNavToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-nav-toggle')) {
        toggleMobileMenu();
    }
});

// Add active class to navigation links based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize charts with responsive settings
function initializeCharts() {
    const barChartElement = document.querySelector('.chart-bar');
    const lineChartElement = document.querySelector('.chart-line');
    const pieChartElement = document.querySelector('.chart-pie');
    const scatterChartElement = document.querySelector('.chart-scatter');
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: 'easeInOutQuart'
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: '#fff',
                    font: {
                        size: window.innerWidth < 768 ? 10 : 12
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: '#fff',
                    font: {
                        size: window.innerWidth < 768 ? 10 : 12
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff',
                    font: {
                        size: window.innerWidth < 768 ? 10 : 12
                    }
                }
            }
        }
    };

    // First chart (Bar Chart)
    if (barChartElement && !barChartElement.hasAttribute('data-chart-initialized')) {
        const barCtx = document.createElement('canvas');
        barChartElement.appendChild(barCtx);
        barChartElement.setAttribute('data-chart-initialized', 'true');
        
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Power BI', 'Excel', 'SQL', 'Python'],
                datasets: [{
                    label: 'Data Analysis Tools',
                    data: [90, 85, 80, 75],
                    backgroundColor: [
                        'rgba(65, 88, 208, 0.7)',
                        'rgba(100, 88, 208, 0.7)',
                        'rgba(150, 88, 208, 0.7)',
                        'rgba(200, 88, 208, 0.7)'
                    ],
                    borderColor: [
                        'rgba(65, 88, 208, 1)',
                        'rgba(100, 88, 208, 1)',
                        'rgba(150, 88, 208, 1)',
                        'rgba(200, 88, 208, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: chartOptions
        });
    }
    
    // Second chart (Line Chart) - 2 seconds delay
    setTimeout(() => {
        if (lineChartElement && !lineChartElement.hasAttribute('data-chart-initialized')) {
            const lineCtx = document.createElement('canvas');
            lineChartElement.appendChild(lineCtx);
            lineChartElement.setAttribute('data-chart-initialized', 'true');
            
            new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                        label: 'Skill Growth',
                        data: [30, 45, 60, 70, 85, 95],
                        fill: false,
                        borderColor: 'rgba(0, 147, 233, 1)',
                        tension: 0.1,
                        backgroundColor: 'rgba(0, 147, 233, 0.7)'
                    }]
                },
                options: chartOptions
            });
        }
    }, 2000);
    
    // Third chart (Pie Chart) - 1 second after second chart
    setTimeout(() => {
        if (pieChartElement && !pieChartElement.hasAttribute('data-chart-initialized')) {
            const pieCtx = document.createElement('canvas');
            pieChartElement.appendChild(pieCtx);
            pieChartElement.setAttribute('data-chart-initialized', 'true');
            
            new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: ['Data Analysis', 'Data Visualization', 'Machine Learning', 'Statistical Analysis', 'Data Cleaning'],
                    datasets: [{
                        data: [30, 25, 15, 20, 10],
                        backgroundColor: [
                            'rgba(142, 197, 252, 0.7)',
                            'rgba(160, 197, 252, 0.7)',
                            'rgba(180, 197, 252, 0.7)',
                            'rgba(200, 197, 252, 0.7)',
                            'rgba(224, 195, 252, 0.7)'
                        ],
                        borderColor: [
                            'rgba(142, 197, 252, 1)',
                            'rgba(160, 197, 252, 1)',
                            'rgba(180, 197, 252, 1)',
                            'rgba(200, 197, 252, 1)',
                            'rgba(224, 195, 252, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: '#fff',
                                font: {
                                    size: 10
                                }
                            }
                        }
                    }
                }
            });
        }
    }, 3000);
    
    // Fourth chart (Scatter Chart) - 1 second after third chart
    setTimeout(() => {
        if (scatterChartElement && !scatterChartElement.hasAttribute('data-chart-initialized')) {
            const scatterCtx = document.createElement('canvas');
            scatterChartElement.appendChild(scatterCtx);
            scatterChartElement.setAttribute('data-chart-initialized', 'true');
            
            new Chart(scatterCtx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Project Complexity vs Time',
                        data: [
                            { x: 10, y: 20 },
                            { x: 15, y: 30 },
                            { x: 20, y: 10 },
                            { x: 25, y: 50 },
                            { x: 30, y: 40 },
                            { x: 35, y: 60 },
                            { x: 40, y: 35 },
                            { x: 45, y: 70 },
                            { x: 50, y: 55 }
                        ],
                        backgroundColor: 'rgba(251, 171, 126, 0.7)',
                        borderColor: 'rgba(251, 171, 126, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Complexity',
                                color: '#fff'
                            },
                            ticks: {
                                color: '#fff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Time (hours)',
                                color: '#fff'
                            },
                            ticks: {
                                color: '#fff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#fff'
                            }
                        }
                    }
                }
            });
        }
    }, 4000);
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const charts = document.querySelectorAll('[data-chart-initialized]');
        charts.forEach(chart => {
            chart.removeAttribute('data-chart-initialized');
            while (chart.firstChild) {
                chart.removeChild(chart.firstChild);
            }
        });
        initializeCharts();
    }, 250);
});

// Project Modal Functionality
let currentProjectId = null;

// Function to show project details
function showProjectDetails(projectId) {
    const project = getProjectById(projectId);
    if (!project) return;
    
    currentProjectId = projectId;
    
    // Update modal content
    document.getElementById('project-modal-title').textContent = project.title;
    document.getElementById('project-modal-description').textContent = project.description;
    document.getElementById('project-modal-image').src = project.image;
    document.getElementById('project-modal-image').alt = project.title;
    
    // Update technologies
    const techList = document.getElementById('project-modal-technologies');
    techList.innerHTML = '';
    project.technologies.forEach(tech => {
        const techItem = document.createElement('span');
        techItem.className = 'tech-tag';
        techItem.textContent = tech;
        techList.appendChild(techItem);
    });
    
    // Update features
    const featuresList = document.getElementById('project-modal-features');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update challenges and outcomes
    document.getElementById('project-modal-challenges').textContent = project.challenges;
    document.getElementById('project-modal-outcomes').textContent = project.outcomes;
    
    // Show modal
    document.getElementById('project-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to close project modal
function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
    currentProjectId = null;
}

// Add event listeners to portfolio items
document.addEventListener('DOMContentLoaded', () => {
    // Add click event to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        const projectId = projectDetails[index]?.id || `project-${index}`;
        item.setAttribute('data-project-id', projectId);
        item.addEventListener('click', () => {
            showProjectDetails(projectId);
        });
    });
    
    // Close modal when clicking close button or outside the modal content
    document.getElementById('project-modal-close').addEventListener('click', closeProjectModal);
    document.getElementById('project-modal').addEventListener('click', (e) => {
        if (e.target.id === 'project-modal') {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('project-modal').classList.contains('active')) {
            closeProjectModal();
        }
    });
});

// Initialize functions
revealOnScroll();
highlightNavOnScroll();
initializeCharts(); // Initialize charts on page load