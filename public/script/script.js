

let imageOne = document.querySelector('.choice img:first-of-type');
let imageTwo = document.querySelector('.choice img:last-of-type');

let imageClicked;

imageOne.addEventListener('click', () => {
    imageClicked = 1;
    imageOne.style.opacity = 1;
    imageTwo.style.opacity = .5;
    console.log(imageClicked);
})


imageTwo.addEventListener('click', () => {
    imageClicked = 2;
    imageTwo.style.opacity = 1;
    imageOne.style.opacity = .5;
    console.log(imageClicked);
});


// imageClicked = 1;

  module.exports = imageClicked