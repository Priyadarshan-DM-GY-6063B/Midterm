let fallingChars = [];
let gravity = 0.1;
let colorPalette = []; // Array to store green colors
let radius = 100; // Radius for the circle
let currentPatternChars = []; // Array to store the current pattern characters

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(25);
  textAlign(CENTER, BOTTOM);

  // Initialize the color palette with shades of green
  colorPalette = [
    color(0, 255, 0),   // Bright green
    color(0, 200, 0),   // Medium green
    color(0, 150, 0),   // Dark green
    color(0, 255, 100),  // Light green
    color(50, 255, 50)   // Lighter green
  ];

  // Generate falling characters with colors from the palette
  for (let i = 0; i < 100; i++) {
    fallingChars.push({
      x: random(width),
      y: random(-800, 0),
      speed: random(2, 5),
      color: random(colorPalette), // Choose color from the green palette
      char: getRandomChar(),
      inPattern: false, // Whether the character is in a pattern
      targetX: null, // Target position for forming patterns
      targetY: null // Target position for forming patterns
    });
  }
}

function draw() {
  background(0, 150); // Black background with transparency

  // Update and display falling characters
  for (let char of fallingChars) {
    updateFallingChar(char);
    displayChar(char);
  }
}

// Control the gravity acceleration with mouse movement
function mouseMoved() {
  gravity = map(mouseX, 0, width, 0.1, 5);
}

// Change the color of falling characters when the mouse is clicked
function mousePressed() {
  // If there are currently characters in a pattern, reset them to falling state
  if (currentPatternChars.length > 0) {
    for (let char of currentPatternChars) {
      char.inPattern = false; // Reset character to fall normally
      char.color = random(colorPalette); // Reset to a color from the green palette
    }
    currentPatternChars = []; // Clear the current pattern characters
  } else {
    formCirclePattern(); // Form a new pattern if none exists
  }
}

// Function to form a circular pattern
function formCirclePattern() {
  let centerX = width / 2;
  let centerY = height / 2; // Center of the canvas

  
  currentPatternChars = randomSubset(fallingChars, 20); // Choose 20 random characters for the pattern

  for (let i = 0; i < currentPatternChars.length; i++) {
    let char = currentPatternChars[i];
    let angle = map(i, 0, currentPatternChars.length, 0, TWO_PI); // Calculate angle for each character
    char.targetX = centerX + cos(angle) * radius; // Calculate X position
    char.targetY = centerY + sin(angle) * radius; // Calculate Y position
    char.inPattern = true; // Mark as being in pattern
    char.color = color(255); // Set color to white for the circular pattern
  }
}

// Function to update the position of a falling character
function updateFallingChar(char) {
  // Update position based on whether in a pattern or falling normally
  if (char.inPattern) {
    // Move towards the target position for the pattern
    char.x = lerp(char.x, char.targetX, 0.1);
    char.y = lerp(char.y, char.targetY, 0.1);
  } else {
    // Regular falling behavior
    char.y += char.speed * gravity;

    // Reset position if it goes off the bottom of the screen
    if (char.y > height) {
      char.y = random(-100, -50);
      char.x = random(width);
      char.char = getRandomChar(); // Reset character on position reset
      char.color = random(colorPalette); // Reset color for the new character from the palette
    }
  }
}

// Function to display a falling character
function displayChar(char) {
  fill(char.color);
  text(char.char, char.x, char.y);
}

// Function to get a random character
function getRandomChar() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678";
  return chars.charAt(floor(random(chars.length)));
}

// Function to get a random subset of an array this is used to reduce computational power instead using all the characters
function randomSubset(array, count) {
  let subset = [];
  while (subset.length < count && array.length > subset.length) {
    let randomIndex = floor(random(array.length));
    let item = array[randomIndex];
    if (!subset.includes(item)) subset.push(item);
  }
  return subset;
}
