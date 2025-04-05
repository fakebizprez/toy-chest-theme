/**
 * Toy Chest Theme - Sample JavaScript File
 * This file demonstrates how the theme highlights different JavaScript elements.
 */

// Constants and variables with different types
const MAX_ITEMS = 100;
let toyCount = 0;
const PI = 3.14159;
const AVAILABLE = true;
const THEME_NAME = "Toy Chest";

/**
 * Represents a toy in the toy chest
 * @class
 */
class Toy {
  /**
   * Create a new toy
   * @param {string} name - The toy's name
   * @param {string} color - The toy's color
   * @param {number} age - Recommended age
   */
  constructor(name, color, age) {
    this.name = name;
    this.color = color;
    this.recommendedAge = age;
    this.id = `toy-${++toyCount}`;
  }

  /**
   * Check if the toy is appropriate for a given age
   * @param {number} childAge - The child's age
   * @returns {boolean} Whether the toy is appropriate
   */
  isAppropriateFor(childAge) {
    return childAge >= this.recommendedAge;
  }

  /**
   * Get a description of the toy
   * @returns {string} The toy description
   */
  getDescription() {
    return `${this.name} (${this.color}) - For ages ${this.recommendedAge}+`;
  }
}

// Array of objects
const toyChest = [
  new Toy("Building Blocks", "#23364a", 3),
  new Toy("Action Figure", "#30cf7b", 5),
  new Toy("Puzzle", "#5f207a", 4),
  new Toy("Race Car", "#be2d26", 6),
  new Toy("Rubber Duck", "#e7d74b", 1),
  new Toy("Robot", "#41c3ad", 8)
];

/**
 * Filter toys by recommended age
 * @param {Array} toys - Array of toys
 * @param {number} age - The age to filter by
 * @returns {Array} Filtered toys
 */
function filterToysByAge(toys, age) {
  return toys.filter(toy => toy.isAppropriateFor(age));
}

// Arrow function with template literals
const describeToys = (toys) => {
  return toys.map(toy => {
    const { name, color, recommendedAge } = toy;
    return `${name} (${color}): For ages ${recommendedAge}+`;
  });
};

// Async function with try/catch
async function fetchToyData() {
  try {
    const response = await fetch('https://api.example.com/toys');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching toy data: ${error.message}`);
    return [];
  }
}

// Event listener
document.addEventListener('DOMContentLoaded', () => {
  const toysForAge5 = filterToysByAge(toyChest, 5);
  console.log(describeToys(toysForAge5));
  
  // Conditional (ternary) operator
  const message = toysForAge5.length > 0 
    ? `Found ${toysForAge5.length} appropriate toys!` 
    : 'No appropriate toys found.';
  
  console.log(message);
});

// Export the Toy class
export default Toy;
