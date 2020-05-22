const staggerVisualizerEl = document.querySelector('.stagger-visualizer');
const fragment = document.createDocumentFragment();
const grid = [50, 15];
const col = grid[0];
const row = grid[1];
const numberOfElements = col * row;

// Get array corresponding to phrase
//var text_array = phraseToArray("Hello");
var text_array = phraseToArray(document.getElementById("divname").innerHTML, col, row);

// Create the individual elements in the grid and store in a variable
var div_elements = [];
for (let i = 0; i < numberOfElements; i++) {
  div_element = document.createElement('div');
  fragment.appendChild(div_element);
  div_elements.push(div_element);
}

// Store the elements with different colours in another variable
var col_elements = [];
for (let i = 0; i < numberOfElements; i++) {
  if(text_array[i]){
    col_elements.push(div_elements[i])
  }
}

// Code to change phrase shown
/*
var text_array = phraseToArray("Projects");
col_elements = [];
for (let i = 0; i < numberOfElements; i++) {
  if(text_array[i]){
    col_elements.push(div_elements[i])
  }
}
*/

// Generate a random number to decide on the animation
var rand = Math.random();

staggerVisualizerEl.appendChild(fragment);

// Starting animation
const startAnimation = anime.timeline({
  //targets: '.stagger-visualizer div',
  targets: div_elements,
  easing: 'easeInOutSine',
  //delay: anime.stagger(50),
  loop: false,
  autoplay: false
})

if( rand >= 0 && rand <= 0.25 ){
  // Flatten the squares to lines
  startAnimation.add({
    rotate: 0,
    scaleX: 2.5,
    scaleY: .25,
    delay: anime.stagger(4, {from: 'center'})
  })
  // Rotation
  startAnimation.add({
    scale: .5,
    scaleX: 1,
    rotate: 180,
    duration: 500,
    delay: anime.stagger(100, {grid: grid, from: 'center'})
  })
}

if( rand > 0.25 && rand <= 0.5 ){
  // Make smaller and rotate at same time
  startAnimation.add({
    scaleX: .25,
    scaleY: .25,
    rotate: anime.stagger([180, 0], {grid: grid, from: 'center'}),
    delay: anime.stagger(20, {from: 'center'})
  })
}

if( rand > 0.5 && rand <= 0.75 ){
  // Change the squares to circles
  startAnimation.add({
    borderRadius: ['0%', '50%']
  })
  // Make a wave
  startAnimation.add({
    scale: [
      {value: 2, easing: 'easeInOutQuad', duration: 500},
      {value: .1, easing: 'easeOutSine', duration: 500}
    ],
    delay: anime.stagger(200, {grid: grid, from: 'center'})
  })
}

if( rand > 0.75 && rand <= 1){
  // Lift up the squares
  startAnimation.add({
    translateY: -50,
    scaleX: .5,
    scaleY: .5,
    delay: anime.stagger(5, {from: 'first'})
  })
  // Drop them back down again
  startAnimation.add({
    translateY: 0,
    duration: 500,
    delay: anime.stagger(5, {from: 'last'}),
    easing: 'easeOutElastic'
  })
}

// Change text color
startAnimation.add({
  targets: col_elements,
  backgroundColor: "#FFF",
  borderColor: "#343a40",
  delay: anime.stagger(0, {grid: grid, from: 'center'}),
  easing: 'easeInOutSine'
})
// Scale back to squares
startAnimation.add({
  targets: div_elements,
  rotate: 0,
  scaleY: 1,
  scaleX: 1,
  scale: 1,
  borderRadius: '0%',
  delay: anime.stagger(20, {grid: grid, from: 'center'})
})

// Play the animation on page open
startAnimation.play();

// Button press animation
const staggersAnimation = anime.timeline({
  //targets: '.stagger-visualizer div',
  targets: div_elements,
  easing: 'easeInOutSine',
  delay: anime.stagger(50),
  loop: false,
  autoplay: false
})
// Make a wave animation and reduce scale by half
.add({
  translateX: [
    {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'x'}) },
    {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'x'}) },
    {value: anime.stagger('0', {grid: grid, from: 'center', axis: 'x'}) }
  ],
  translateY: [
    {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'y'}) },
    {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'y'}) },
    {value: anime.stagger('0', {grid: grid, from: 'center', axis: 'y'}) }
  ],
  duration: 800,
  scale: [
    {value: .8},
    {value: 1}
  ],
  delay: anime.stagger(100, {grid: grid, from: 'center'})
})
// Move squares back to original position and size
/*.add({
  translateX: [
    {value: anime.stagger('0', {grid: grid, from: 'center', axis: 'x'}) },
  ],
  translateY: [
    {value: anime.stagger('0', {grid: grid, from: 'center', axis: 'y'}) },
  ],
  duration: 500,
  scale: 1,
  delay: anime.stagger(100, {grid: grid, from: 'center'})
})*/

// Play animation on click
document.querySelector('.stagger-visualizer').onclick = staggersAnimation.restart;
