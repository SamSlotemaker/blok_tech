let tab1 = document.getElementById('tab1')
let labelOne = document.getElementById('labelOne')
let inputOne = document.getElementById('inputOne')
let imageOne = document.getElementById('imageOne').setAttribute('draggable', false);
let imageTwo = document.getElementById('imageTwo').setAttribute('draggable', false);
console.log(inputOne)
console.log(imageOne)
console.log(imageTwo)
let labelTwo = document.getElementById('labelTwo')
let inputTwo = document.getElementById('inputTwo')

let heartOne = document.getElementById('heartOne')
let screenWidth = window.innerWidth


console.log(screenWidth)
console.log(labelOne)
console.log(labelTwo)
console.log(heartOne)

function mouseOver(event) {
    console.log("over")
    console.log(event.x)

    calculateStylePercentage(event.x)

}

function calculateStylePercentage(x) {
    let newPercentageLeft = x / screenWidth * 100
    let newPercentageRight = 100 - newPercentageLeft

    labelOne.style.width = newPercentageLeft + "%"
    labelTwo.style.width = newPercentageRight + "%"
    heartOne.style.left = newPercentageLeft + "%"

    if(newPercentageLeft >= 70){
        inputOne.checked = true;
    }
    else if(newPercentageLeft <= 30){
        inputTwo.checked = true;
    }
    else{
        inputOne.checked = false;
        inputTwo.checked = false;
    }

    console.log(newPercentageLeft)
}

heartOne.addEventListener('mousedown', function(){
    heartOne.setAttribute('draggable', false);
    tab1.addEventListener('mousemove', mouseOver)
})

window.addEventListener('mouseup', function() {
    tab1.removeEventListener('mousemove', mouseOver)
})
