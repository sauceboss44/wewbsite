
// TODO: fix delays, red/green should blink twice, record high score

let beep = new Audio("../media/beep.mp3")
let wrong = new Audio("../media/wrong.wav")
let correct = new Audio("../media/correct.wav")

let sequence = []
let clicks = []
//number of tiles to remember
let difficulty = 1
let clickNumber = -1
let delay = 250

const timer = ms => new Promise(res => setTimeout(res, ms))



// function arraysEqual(a, b) {
//   if (a === b) return true;
//   if (a == null || b == null) return false;
//   if (a.length !== b.length) return false;
//
//   // If you don't care about the order of the elements inside
//   // the array, you should sort both arrays here.
//   // Please note that calling sort on an array will modify that array.
//   // you might want to clone your array first.
//
//   for (var i = 0; i < a.length; ++i) {
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// }
function disableButtons(){
  for (let i=1; i<5;i++){
    document.getElementById("button".concat(i.toString())).onclick = function(){console.log('')}
    console.log("buttons disabled")
  }
}
function enableButtons(){
  for (let i=1; i<5;i++){
    document.getElementById("button".concat(i.toString())).onclick = function () {userInput(i.toString())}
    console.log("buttons enabled")
  }
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function generateSequence(size){
  var rndInt = randomIntFromInterval(1, 4).toString()
  for (let i=0; i<size; i++){
    rndInt = randomIntFromInterval(1, 4).toString()
    sequence.push(rndInt.toString())
  }
  difficulty+=1
  playSequence()
}


function changeTileColour(buttonNumber) {
  console.log(buttonNumber)
  beep.play()
  beep.currentTime = 0
  document.getElementById("button".concat(buttonNumber)).src="https://re-mm-assets.s3.amazonaws.com/product_photo/46460/large_large_Poly_LightBlue_pms291up_1471509902.jpg"
  setTimeout(function (){
    document.getElementById("button".concat(buttonNumber)).src="https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg"
  }, 225)
}

function playSequence(){
  disableButtons()
  async function load () {
    await timer(1000) // We need to wrap the loop into an async function for this to work
    for (let i=0; i<sequence.length;i++){
      changeTileColour(sequence[i])
      await timer(delay)
    }
  }
  setTimeout(function (){
  enableButtons()
},(delay*difficulty)-250)
  load()
}

function fail(){
  difficulty = 1
  clickNumber = -1
  sequence = []
  clicks = []
  disableButtons()
  async function load () {
    await timer(150)
    document.getElementById("score").textContent = "SCORE:NUM".replace("NUM","0")
    wrong.play()
    wrong.currentTime = 0
    for (let i=1; i<5;i++){
      document.getElementById("button".concat(i.toString())).src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Redsquare.png"
    }
    await timer(250)
    for (let i=1; i<5;i++){
    document.getElementById("button".concat(i.toString())).src="https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg"
    }
  }
  load()
  generateSequence(difficulty)
}

function pass(){
  delay = 1000 - difficulty * 40
  clickNumber = -1
  sequence = []
  clicks = []
  disableButtons()
  console.log("SCORE:NUM".replace("NUM",(difficulty-1).toString()))
  document.getElementById("score").textContent = "SCORE:NUM".replace("NUM",(difficulty-1).toString())
  async function load () {
    await timer(150)
    correct.play()
    correct.currentTime = 0
    for (let i=1; i<5;i++){
      document.getElementById("button".concat(i.toString())).src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Greensquare.png"
    }
    await timer(250)
    for (let i=1; i<5;i++){
    document.getElementById("button".concat(i.toString())).src="https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg"
    }
  }
  load()
  generateSequence(difficulty)
}

function checkSequence(){

  if (clicks[clickNumber] != sequence[clickNumber]) {
    console.log("fail")
    fail()
  }
  if (clicks.length == difficulty-1){
    console.log("pass")
    pass()
  }
}

function userInput(buttonNumber) {
  clickNumber+=1
  changeTileColour(buttonNumber)
  clicks.push(buttonNumber)
  setTimeout(function (){
  checkSequence()
},350)
}




window.addEventListener("load",function() {generateSequence(difficulty) })
