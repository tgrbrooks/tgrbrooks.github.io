// Get all the events and create individual animations for them
for (let i = 1; i <= 6; i++){
  var event_name = 'event'+i;
  var event_element = document.getElementsByClassName(event_name);
  var mask_name = 'mask'+i;
  var mask_element = document.getElementsByClassName(mask_name);

  // Event expansion animation: fill with colour, expand out, hide mask
  const expandAnimation = anime.timeline({
    targets: event_element,
    easing: 'easeInOutSine',
    direction: 'normal',
    zIndex: 10,
    delay: anime.stagger(1),
    loop: false,
    autoplay: false,
    // Play in reverse when clicked twice to hide
    complete: function (anim) {
      anim.direction = (anim.direction == 'normal') ? 'reverse' : 'normal';
    }
  })
  // Fill the background of the mask
  .add({
    targets: mask_element,
    backgroundColor: "#343a40",
    delay: anime.stagger(1)
  })
  // Expand the event window outwards, remove the left and right borders
  .add({
    targets: event_element,
    scaleX: [1, 30],
    scaleY: [1, 20],
    borderTopWidth: ['5px', '1px'],
    borderBottomWidth: ['5px', '1px'],
    borderLeftWidth: ['5px', '0px'],
    borderRightWidth: ['5px', '0px'],
    delay: anime.stagger(10)
  })
  // Hide the mask that was covering the background image
  .add({
    targets: mask_element,
    backgroundColor: "#FFF",
    opacity: 0,
    delay: anime.stagger(1)
  })

  // Play the animation when the event is clicked
  var event_class = '.event'+i;
  document.querySelector(event_class).onclick = expandAnimation.restart;

  // Separate out the letters in the event label
  var label_name = '.label'+i;
  var textWrapper = document.querySelector(label_name);
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  // Create a fade in animation for the event label
  const labelAnimation = anime.timeline({
    autoplay: false,
    loop: false
  })
  .add({
    targets: label_name+' .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 75 * (i+1)
  });

  // Separate out the letters in the event date
  var date_name = '.date'+i;
  var dateWrapper = document.querySelector(date_name);
  dateWrapper.innerHTML = dateWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  // Create a fade in animation of the event date
  const dateAnimation = anime.timeline({
    autoplay: false,
    loop: false,
  })
  .add({
    targets: date_name+' .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 75 * (i+1),
    direction: 'reverse'
  });

  // Fade in the event label and date when the mouse goes over the event, only do it once
  $(event_class).one('mouseover', function(){
    labelAnimation.restart();
    dateAnimation.restart();
  });

}
