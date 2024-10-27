let fallingChars = [];
let nameString = 'THE MATRIX'; // Your name
let gravity = 0.1;
let startFalling = false; // Flag to control when to start falling

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER);
  
  // Create falling character instances for each letter in your name
  for (let i = 0; i < nameString.length; i++) {
    fallingChars.push(new FallingChar(random(width), 0, nameString.charAt(i)));
  }
}

function draw() {
  background(0, 150); // Dark background with some transparency for a trail effect

  if (!startFalling) {
    // Display the full name at the top
    fill(0, 255, 0); // Green color
    text(nameString, width / 2, height / 4);
    
    // Start falling after a delay
    if (frameCount > 200) { // Start falling after 60 frames (~1 second)
      startFalling = true;
    }
  } else {
    // Update and display each falling character
    for (let char of fallingChars) {
      char.update();
      char.display();
    }
  }
}

function mouseMoved() {
  // Control the gravity acceleration with mouse movement
  gravity = map(mouseX, 0, width, 0.1, 5);
}

function mousePressed() {
  // Change the color of the falling code when the mouse is clicked
  for (let char of fallingChars) {
    char.changeColor();
  }
}

class FallingChar {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char; // Set the character to the provided letter from the name
    this.speed = random(2, 5);
    this.color = color(0, 255, 0); // Default green color
  }

  update() {
    // Apply gravity
    this.y += this.speed * gravity;

    // Reset position if it goes off the bottom of the screen
    if (this.y > height) {
      this.y = random(-100, -50);
      this.x = random(width);
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
