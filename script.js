// Three.js Particle Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("three-canvas"),
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const particles = new THREE.BufferGeometry();
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
}

particles.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);
const material = new THREE.PointsMaterial({ color: 0x00f5ff, size: 2 });
const mesh = new THREE.Points(particles, material);
scene.add(mesh);

camera.position.z = 100;

function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.0005;
    mesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// Register plugin first (fixes any ScrollTrigger timing issues)
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.to(".hero h1", {
    duration: 0.9,
    y: 0,
    opacity: 1,
    ease: "power3.out",
});
gsap.to(".hero p", {
    duration: 0.9,
    y: 0,
    opacity: 1,
    delay: 0.2,
    ease: "power3.out",
});
gsap.to(".btn", {
    duration: 0.9,
    y: 0,
    opacity: 1,
    delay: 0.4,
    ease: "power3.out",
});

// Skills: batch reveal (smooth + aligned, no weird offsets)
gsap.utils.toArray(".skill-card").forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 85%" },
        y: 28,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
        delay: i * 0.03,
    });
});

// Projects: staggered reveal
gsap.from(".project-card", {
    scrollTrigger: { trigger: ".projects-grid", start: "top 85%" },
    y: 60,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12,
});

// Timeline items reveal
gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power3.out",
    });
});

// Contact section animations
gsap.from(".contact-info p", {
    scrollTrigger: { trigger: ".contact-info p", start: "top 85%" },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
});

gsap.from(".socials a", {
    scrollTrigger: { trigger: ".socials", start: "top 85%" },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1,
});

gsap.from(".contact-form", {
    scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
    y: 50,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
});

// Back to Top button visibility
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});
// Smooth scroll is already enabled via CSS scroll-behavior
// VanillaTilt is auto-initialized via data-tilt attributes
const nameElement = document.querySelector(".hero h1 span");
const nameText = "Jainil aliwala"; // Change to your real name
let i = 0;
let isDeleting = false;

function typeLoop() {
    if (!isDeleting) {
        nameElement.textContent = nameText.substring(0, i + 1);
        i++;
        if (i === nameText.length) {
            setTimeout(() => (isDeleting = true), 1000); // pause before deleting
        }
    } else {
        nameElement.textContent = nameText.substring(0, i - 1);
        i--;
        if (i === 0) {
            isDeleting = false;
        }
    }
    setTimeout(typeLoop, isDeleting ? 100 : 150);
}

nameElement.classList.add("typewriter");
typeLoop();
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});