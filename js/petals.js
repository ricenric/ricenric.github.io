const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');
let petals = [];

// Ensure the canvas stretches to fill the browser window
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Petal {
    constructor() {
        this.reset();
        // Randomize initial Y so they cover the screen immediately on load
        this.y = Math.random() * canvas.height; 
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20; // Start slightly above the top edge
        this.speed = 0.5 + Math.random() * 1; // Downward drift speed
        this.size = 1.25 + Math.random() * 3; // Radius of the particle
        this.swaySpeed = 0.01 + Math.random() * 0.03; // Speed of horizontal wobble
        this.angle = Math.random() * Math.PI * 2; // Initial horizontal sway angle
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 182, 193, 0.6)';
        ctx.save();
        ctx.translate(this.x, this.y);
        // Rotate the petal based on its sway angle so it tumbles naturally
        ctx.rotate(this.angle); 
        ctx.beginPath();
        // Draws an oval/petal shape instead of a perfect circle
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.angle += this.swaySpeed;
        this.x += Math.sin(this.angle) * 1.2; // The math that makes it sway left and right, change multipler for harder or softer sway

        // If the petal falls past the bottom of the screen, reset it to the top
        if (this.y > canvas.height) {
            this.reset();
        }
    }
}

// CHANGE i < x VARIABLE FOR MORE OR LESS PETALS, BIGGER NUMBER = MORE PETALS
for (let i = 0; i < 130; i++) {
    petals.push(new Petal());
}

// The core animation loop
function animate() {
    // Clear the previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the new frame
    petals.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}

// Start the loop
animate();