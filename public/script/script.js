

let imageOne = document.querySelector('.choice img:first-of-type');
let imageTwo = document.querySelector('.choice img:last-of-type');

let imageClicked = 1;

imageOne.addEventListener('click', () => {
    imageClicked = 1;
    document.getElementById('id').value = imageClicked;
    imageOne.style.opacity = 1;
    imageTwo.style.opacity = .5;
    console.log(imageClicked);
})


imageTwo.addEventListener('click', () => {
    imageClicked = 2;
    document.getElementById('id').value = imageClicked;
    imageTwo.style.opacity = 1;
    imageOne.style.opacity = .5;
    console.log(imageClicked);
});




