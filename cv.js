const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lines = [];
let nodes = [];
const maxLines = 120;
const maxNodes = 50;

const tl = gsap.timeline({ repeat: -1, repeatRefresh: true });

const split = new SplitText(".quote", { type: "chars, words" });
const chars = split.chars;
// Navbar hover functionality
       document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // បើក/បិទម៉ឺនុយពេលចុចលើ hamburger
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // បិទម៉ឺនុយពេលចុចលើ link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
});
//mouseleave
/*
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('mouseenter', () => {
        navMenu.classList.add('show');
    });

    navMenu.addEventListener('mouseleave', () => {
        navMenu.classList.remove('show');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
});

*/

// Step 1: Set random color for each character
tl.set(chars, {
  color: () => gsap.utils.random([ "#00FFFF",])
}, 0);
//"#39FF14",, "#FF3131", "#FF00FF", "#FFD700", "#FF6EC7"
// Step 2: Fade in characters with stagger
tl.fromTo(chars, { opacity: 0 }, {
  opacity: 1,
  duration: 0.1,
  stagger: 0.1
});

// Step 3: Fade out characters with stagger
tl.to(chars, {
  duration: 0.5,
  opacity: 0,
  stagger: 0.05,
  ease: "power4.inOut"
});
class CircuitLine {
    constructor() {
        this.x1 = Math.random() * canvas.width;
        this.y1 = Math.random() * canvas.height;
        this.x2 = this.x1 + (Math.random() - 0.5) * 150;
        this.y2 = this.y1 + (Math.random() - 0.5) * 150;
        this.opacity = Math.random() * 0.5;
        this.fadeSpeed = (Math.random() * 0.02) + 0.01;
        this.growing = Math.random() > 0.5;
    }

    update() {
        if (this.growing) {
            this.opacity += this.fadeSpeed;
            if (this.opacity >= 0.5) this.growing = false;
        } else {
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0) {
                this.x1 = Math.random() * canvas.width;
                this.y1 = Math.random() * canvas.height;
                this.x2 = this.x1 + (Math.random() - 0.5) * 150;
                this.y2 = this.y1 + (Math.random() - 0.5) * 150;
                this.opacity = 0;
                this.growing = true;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = `rgba(0, 150, 255, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

class CircuitNode {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = (Math.random() * 0.02) + 0.01;
        this.growing = Math.random() > 0.5;
    }

    update() {
        if (this.growing) {
            this.opacity += this.pulseSpeed;
            this.radius += 0.05;
            if (this.opacity >= 0.7 || this.radius >= 3) this.growing = false;
        } else {
            this.opacity -= this.pulseSpeed;
            this.radius -= 0.05;
            if (this.opacity <= 0.2 || this.radius <= 1) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.radius = Math.random() * 2 + 1;
                this.growing = true;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 150, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function init() {
    lines = [];
    nodes = [];
    for (let i = 0; i < maxLines; i++) {
        lines.push(new CircuitLine());
    }
    for (let i = 0; i < maxNodes; i++) {
        nodes.push(new CircuitNode());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines.forEach(line => {
        line.update();
        line.draw();
    });
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
 document.getElementById('contactForm').addEventListener('submit', async function(e) {
      e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        const telegramMessage = 
        `📨 *New Contact Message* %0A------------------%0A👤 *Name:* ${name}%0A📧 *Email:* ${email}%0A📱 *Phone:* ${phone}%0A📝 *Message:* ${message}`;
        const botToken = '8035101574:AAGDlpGQ0EPtsStnlLEvzsscD_uje-D_3Fo'; // 👉 ដាក់ Bot Token
        const chatId = '7834836279';     // 👉 ដាក់ Chat ID
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${telegramMessage}&parse_mode=Markdown`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          alert("✅ Message sent to Telegram successfully!");
          document.getElementById('contactForm').reset();
        } else {
          alert("❌ Failed to send message.");
        }
      } catch (error) {
        alert("🚨 Error: " + error.message);
      }
    });

init();
animate();