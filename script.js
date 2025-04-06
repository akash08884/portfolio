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
                // Initialize charts when skills section comes into view
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

// Function to initialize charts
function initializeCharts() {
    // Get chart containers
    const barChartElement = document.querySelector('.chart-bar');
    const lineChartElement = document.querySelector('.chart-line');
    const pieChartElement = document.querySelector('.chart-pie');
    const scatterChartElement = document.querySelector('.chart-scatter');
    
    // Charts will be animated through CSS animations with delays
    // No need for setTimeout as we're using CSS animations with delays
    // .chart-bar - shows immediately
    // .chart-line - shows after 2s delay
    // .chart-pie - shows after 4s delay
    // .chart-scatter - shows after 6s delay
    
    // Only initialize if elements exist and don't already have charts
    if (barChartElement && !barChartElement.hasAttribute('data-chart-initialized')) {
        // Create bar chart
        const barCtx = document.createElement('canvas');
        barChartElement.appendChild(barCtx);
        barChartElement.setAttribute('data-chart-initialized', 'true');
        
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Power BI', 'Excel', 'SQL', 'Python', 'Tableau'],
                datasets: [{
                    label: 'Data Analysis Tools',
                    data: [90, 85, 80, 75, 70],
                    backgroundColor: [
                        'rgba(65, 88, 208, 0.7)',
                        'rgba(100, 88, 208, 0.7)',
                        'rgba(150, 88, 208, 0.7)',
                        'rgba(200, 88, 208, 0.7)',
                        'rgba(200, 130, 192, 0.7)'
                    ],
                    borderColor: [
                        'rgba(65, 88, 208, 1)',
                        'rgba(100, 88, 208, 1)',
                        'rgba(150, 88, 208, 1)',
                        'rgba(200, 88, 208, 1)',
                        'rgba(200, 130, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
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
    
    if (lineChartElement && !lineChartElement.hasAttribute('data-chart-initialized')) {
        // Create line chart
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
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#fff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
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
    
    if (pieChartElement && !pieChartElement.hasAttribute('data-chart-initialized')) {
        // Create pie chart
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
    
    if (scatterChartElement && !scatterChartElement.hasAttribute('data-chart-initialized')) {
        // Create scatter chart
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
}

// Initialize functions
revealOnScroll();
highlightNavOnScroll();
initializeCharts(); // Initialize charts on page load