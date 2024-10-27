let fallingChars = [];
let gravity = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  textAlign(CENTER);
  fill(0, 255, 0); // Default green

  // Generate a set of falling character instances
  for (let i = 0; i < 100; i++) {
    fallingChars.push(new FallingChar(random(width), random(-500, 0)));
  }
}

function draw() {
  // Background fade effect for a smooth trail
  background(0, 100);

  // Update and display each falling character
  for (let char of fallingChars) {
    char.update();
    char.display();
  }
}

function mouseMoved() {
  // Adjust gravity based on mouse position, making code fall faster as mouse moves to the right
  gravity = map(mouseX, 0, width, 0.1, 2);
}

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(2, 5);
    this.baseColor = color(0, random(180, 255), 0); // Slight color variation for each
    this.char = this.getRandomChar();
  }

  getRandomChar() {
    // Create a random character from A-Z, 0-9, and special characters
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    return chars.charAt(floor(random(chars.length)));
  }

  update() {
    // Apply gravity
    this.y += this.speed * gravity;

    // Reset position if it goes off the bottom of the screen
    if (this.y > height) {
      this.y = random(-100, -50);
      this.x = random(width);
      this.char = this.getRandomChar(); // Change character for variety
    }
  }

  display() {
    // Subtle color shift for realism
    fill(this.baseColor);
    text(this.char, this.x, this.y);
  }
}
