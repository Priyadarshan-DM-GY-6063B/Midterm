let fallingChars = [];
let gravity = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(25); //size of the text
  textAlign(BOTTOM);

  // Generates a grid of falling characters across the screen
  for (let i = 0; i < 100; i++) { // this helps to how many characters should fall in the screen
    fallingChars.push(new FallingChar(random(width), random(-500, 0)));
  }
}

function draw() {
  background(0, 150); // Black background with some transparency for a trail effect

  // Start falling characters
  for (let char of fallingChars) {
    char.update();
    char.display();
  }

  // Placeholder for future effects or animations
  // TODO: Add code for additional visual effects here
}

// Control the gravity acceleration with mouse movement
function mouseMoved() {
  gravity = map(mouseX, 0, width, 0.1, 5);
}

// Change the color of the falling code when the mouse is clicked
function mousePressed() {
  for (let char of fallingChars) {
    char.changeColor();
  }
}

// Class definition for falling characters
class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.char = this.getRandomChar(); // Generates a random character
    this.speed = random(2, 5);
    this.color = color(0, 255 , 0); // green color
  }

  getRandomChar() {
    // Get a random character from A-Z or 0-9
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars.charAt(floor(random(chars.length)));
  }

  update() {
    // Apply gravity
    this.y += this.speed * gravity;

    // Reset position if it goes off the bottom of the screen
    if (this.y > height) {
      this.y = random(-100, -50);
      this.x = random(width);
      this.char = this.getRandomChar(); // Change character upon reset for variety
    }
  }

  display() {
    fill(this.color);
    text(this.char, this.x, this.y);
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255)); // Random color on click
  }
}

// Placeholder function for future enhancements
function addVisualEffects() {
  // TODO: Implement new visual effects or transformations on the falling characters
}


