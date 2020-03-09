const express = require('express');
const app = express();
const port = 4000;
// var imageClicked = require('./public/script/script')

require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@datingapp-alfy7.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

// console.log(imageClicked);

let images = [
  "images/audi.jpg",
  "images/porsche.png",
  "images/mercedes.jpeg",
  "images/bentley.jpg"
]

const randomCar = () => {
  return Math.floor(Math.random() * images.length);
}

let randomCar1 = randomCar();
let randomCar2 = randomCar();

console.log(randomCar1 + " " + randomCar2);

while (randomCar1 === randomCar2) {
  randomCar2 = randomCar();
  console.log(randomCar1 + " " + randomCar2)
}



let data = {
  title: "Datingapp",
  page: "About",
  name: "Sam Slotemaker",
  imageUrl1: images[randomCar1],
  imageUrl2: images[randomCar2],
}

let playerAnswers = {

}



app
  .use(express.static('public'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .use(express.urlencoded({
    extended: false
  }))



app.get('/finding', (req, res) => {
  res.render('finding.ejs', {
    data
  })
})

// app.get('/finding', (req, res) => {
//   res.sendFile('public/finding.html' , { root : __dirname});
// })

app.get('*', (req, res) => {
  res.status(404).end('Error: 404 - Page not found');
})


app.get('/sendImage', (req, res) => {
  res.render('finding.ejs', {
    data
  }) 
})
app.post('/sendImage', (req, res) => {
  playerAnswers.questionOne = req.body.imageClicked;
  res.send(playerAnswers);
})

app.listen(port, () => console.log(`app running on port: ${port}`));