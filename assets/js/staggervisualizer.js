const staggerVisualizerEl = document.querySelector('.stagger-visualizer');
const fragment = document.createDocumentFragment();
const grid = [50, 15];
const col = grid[0];
const row = grid[1];
const numberOfElements = col * row;

// Convert a phrase to an array of bools
function phraseToArray(phrase){
  // Type a phrase (less than 8 characters)
  var letter_array = [];

  // Get an array of the letters in grid format from letters.js
  for( var i = 0; i < phrase.length; i++ ){
    for( var j = 0; j < letters.length; j++ ){
      if( phrase.charAt(i) == letters[j][0] ){
        var letter_copy = [];
        for( var k = 1; k < letters[j].length; k++ ){
          letter_copy.push(letters[j][k])
        }
        letter_array.push(letter_copy);
      }
    }
  }

  // Work out the buffer from top and sides
  var row_buffer = Math.max(Math.floor((row - 8)/2), 0);
  var phrase_size = 6*phrase.length;
  var col_buffer = Math.max(Math.floor((col - phrase_size)/2), 0);

  // Put the letter arrays into a word array the size of the grid
  var text_array = [];
  for( var i = 0; i < row; i++){
    var i_b = i - row_buffer;
    for( var j = 0; j < col; j++){
      var j_b = j - col_buffer;
      var letter_index = Math.floor(j_b/6);
      var index = 6*i_b + j_b - 6*letter_index;
      if( i_b < 0 || i_b > 7 || letter_index >= letter_array.length || letter_index < 0){
        text_array.push(0);
      }
      else{
        if(letter_array[letter_index][index] == "0"){
          text_array.push(0);
        }
        else{
          text_array.push(1);
        }
      }
    }
  }
  return text_array;
}

// Get array corresponding to phrase
//var text_array = phraseToArray("Hello");
var text_array = phraseToArray(document.getElementById("divname").innerHTML);

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