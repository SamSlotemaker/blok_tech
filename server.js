const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const session = require('express-session');

app.use(session({
  'secret': '343ji43j4nasaSSAs3jn4jk3n',
  'name': 'Sam'
}))

//database configuratie
let collection = null;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@datingapp-alfy7.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true
});

client.connect(function (err, client) {
  if (err) {
    throw err
  }

  collection = client.db("datingapp").collection("userAnswers");
})



let images = [
  "images/audi.jpg",
  "images/porsche.png",
  "images/mercedes.jpeg",
  "images/bentley.jpg"
]

let questionNumber = 0;


// //een random auto kiezen als foto
// let randomCar1;
// let randomCar2;

// randomCar = () => {
//   const randomNumber = () => {
//     return Math.floor(Math.random() * images.length);
//   }

//   randomCar1 = randomNumber();
//   randomCar2 = randomNumber();

//   console.log(randomCar1 + " " + randomCar2);

//   //zorg er voor dat de auto's nooit hetzelfde kunnen zijn
//   while (randomCar1 === randomCar2) {
//     randomCar2 = randomNumber();
//     console.log(randomCar1 + " " + randomCar2)
//   }
// }

// randomCar();



let data = {
  title: "Datingapp",
  name: "Sam Slotemaker",
  imageUrl1: images[0],
  imageUrl2: images[1],
  imageUrl3: images[2],
  imageUrl4: images[3]
}

//routes
app
  .use(express.static('public'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .use(express.urlencoded({
    extended: false
  }))
  .post('/sendImage', sendImage)
  .get('/finding', finding)
  .get('*', error404)


//find match pagina
function finding(req, res) {
  res.render('finding.ejs', {
    data
  })
}

//ongeldige pagina
function error404(req, res) {
  res.status(404).end('Error: 404 - Page not found');
}

//verzenden van image op antwoorden van vraag
function sendImage(req, res) {
  collection.insertOne({
    answerOne: req.body.car1,
    answerTwo: req.body.car2
  });
  // randomCar();
  res.send(`je hebt net vraag 1:${req.body.car1} en vraag 2: ${req.body.car2} naar de database gepusht.`)
  questionNumber++;


}


app.listen(port, () => console.log(`app running on port: ${port}`));