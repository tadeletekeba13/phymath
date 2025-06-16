document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('active');
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.animated-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate Cards on Scroll
    const cards = document.querySelectorAll('.card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Populate Physics Cards
    const physicsConcepts = [
        {
            title: "Newton's Laws",
            description: "Understand the foundation of classical mechanics with interactive examples.",
            icon: "fas fa-atom"
        },
        {
            title: "Electromagnetism",
            description: "Explore the relationship between electricity and magnetism.",
            icon: "fas fa-bolt"
        },
        {
            title: "Quantum Mechanics",
            description: "Dive into the strange world of particles and wave functions.",
            icon: "fas fa-atom"
        },
        {
            title: "Thermodynamics",
            description: "Learn about heat, work, and energy transfer in systems.",
            icon: "fas fa-temperature-high"
        },
        {
            title: "Relativity",
            description: "Discover how space and time are relative to the observer.",
            icon: "fas fa-clock"
        },
        {
            title: "Optics",
            description: "Study the behavior and properties of light and its interactions.",
            icon: "fas fa-lightbulb"
        }
    ];
    
    const physicsContainer = document.querySelector('.concept-cards');
    
    physicsConcepts.forEach(concept => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-img">
                <i class="${concept.icon}"></i>
            </div>
            <div class="card-content">
                <h3>${concept.title}</h3>
                <p>${concept.description}</p>
                <a href="#" class="card-btn">Learn More</a>
            </div>
        `;
        
        physicsContainer.appendChild(card);
    });
    
    // Populate Math Cards
    const mathTopics = [
        {
            title: "Calculus",
            description: "Master derivatives, integrals, and the fundamental theorem.",
            icon: "fas fa-infinity"
        },
        {
            title: "Linear Algebra",
            description: "Understand vectors, matrices, and linear transformations.",
            icon: "fas fa-vector-square"
        },
        {
            title: "Probability",
            description: "Learn about random events and statistical analysis.",
            icon: "fas fa-chart-pie"
        },
        {
            title: "Differential Equations",
            description: "Solve equations that describe how quantities change over time.",
            icon: "fas fa-project-diagram"
        },
        {
            title: "Number Theory",
            description: "Explore properties of integers and prime numbers.",
            icon: "fas fa-superscript"
        },
        {
            title: "Geometry",
            description: "Study shapes, sizes, and properties of space.",
            icon: "fas fa-shapes"
        }
    ];
    
    const mathContainer = document.querySelector('.topic-cards');
    
    mathTopics.forEach(topic => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <div class="card-img">
                <i class="${topic.icon}"></i>
            </div>
            <div class="card-content">
                <h3>${topic.title}</h3>
                <p>${topic.description}</p>
                <a href="#" class="card-btn">Learn More</a>
            </div>
        `;
        
        mathContainer.appendChild(card);
    });
    
    // Pendulum Simulation
    const canvas = document.getElementById('pendulumCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 500;
    canvas.height = 400;
    
    // Pendulum parameters
    let pendulum = {
        length: 150,
        angle: Math.PI/4,
        angularVelocity: 0,
        angularAcceleration: 0,
        damping: 0.995,
        bobRadius: 20,
        gravity: 1
    };
    
    // Slider controls
    const lengthSlider = document.getElementById('lengthSlider');
    const angleSlider = document.getElementById('angleSlider');
    
    lengthSlider.addEventListener('input', function() {
        pendulum.length = parseInt(this.value);
    });
    
    angleSlider.addEventListener('input', function() {
        pendulum.angle = parseInt(this.value) * Math.PI / 180;
        pendulum.angularVelocity = 0; // Reset velocity when changing angle
    });
    
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate pendulum physics
        pendulum.angularAcceleration = -pendulum.gravity * Math.sin(pendulum.angle) / pendulum.length;
        pendulum.angularVelocity += pendulum.angularAcceleration;
        pendulum.angularVelocity *= pendulum.damping;
        pendulum.angle += pendulum.angularVelocity;
        
        // Calculate bob position
        const bobX = canvas.width / 2 + pendulum.length * Math.sin(pendulum.angle);
        const bobY = canvas.height / 4 + pendulum.length * Math.cos(pendulum.angle);
        
        // Draw pendulum
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 4);
        ctx.lineTo(bobX, bobY);
        ctx.strokeStyle = '#3a86ff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw bob
        ctx.beginPath();
        ctx.arc(bobX, bobY, pendulum.bobRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ff006e';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw pivot
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 4, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    burger.classList.remove('active');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
});