const pbgrid = [50, 15];
const pbcol = pbgrid[0];
const pbrow = pbgrid[1];
const pbnumberOfElements = pbcol * pbrow;

for (let i = 1; i <= 5; i++){
  var button_name = '.button'+i;
  const pageButtonEl = document.querySelector(button_name);
  const pbfragment = document.createDocumentFragment();

  // Get array corresponding to phrase
  var div_name = 'divname'+i;
  var pbtext_array = phraseToArray(document.getElementById(div_name).innerHTML, pbcol, pbrow);

  // Create the individual elements in the pbgrid and store in a variable
  var pbdiv_elements = [];
  for (let i = 0; i < pbnumberOfElements; i++) {
    div_element = document.createElement('div');
    div_element.href = pageButtonEl.href;
    pbfragment.appendChild(div_element);
    pbdiv_elements.push(div_element);
  }

  // Store the elements with different colours in another variable
  var pbcol_elements = [];
  for (let i = 0; i < pbnumberOfElements; i++) {
    if(pbtext_array[i]){
      pbdiv_elements[i].style.backgroundColor = '#FFF';
    }
  }

  pageButtonEl.appendChild(pbfragment);

  // Starting animation
  const buttonAnimation = anime.timeline({
    targets: pbdiv_elements,
    easing: 'easeInOutQuad',
    loop: true,
    autoplay: true,
    direction: 'alternate',
  })
  .add({
    duration: anime.random(10000, 30000)
  })
  .add({
    duration: 500,
    translateX: anime.stagger(2, {grid: pbgrid, from: 'center', axis: 'x'}),
    translateY: anime.stagger(2, {grid: pbgrid, from: 'center', axis: 'y'}),
    rotateZ: anime.stagger([0, 90], {grid: pbgrid, from: 'center', axis: 'x'}),
    delay: anime.stagger(50, {grid: pbgrid, from: 'center'})
  })
}
