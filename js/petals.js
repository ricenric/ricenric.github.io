const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');
let petals = [];  // keep only this one declaration

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Petal {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; 
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.speed = 0.5 + Math.random() * 1;
        this.size = 1.25 + Math.random() * 3;
        this.swaySpeed = 0.01 + Math.random() * 0.03;
        this.angle = Math.random() * Math.PI * 2;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.y += this.speed;
        this.angle += this.swaySpeed;
        this.x += Math.sin(this.angle) * 1.2;
        if (this.y > canvas.height) this.reset();
    }
}

export function setPetalCount(count) {
    petals = [];  // reassign, not redeclare
    for (let i = 0; i < count; i++) {
        petals.push(new Petal());
    }
}

setPetalCount(130);
animate();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}