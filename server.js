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


//een random auto kiezen als foto
let randomCar1;
let randomCar2;

randomCar = () => {
  const randomNumber = () => {
    return Math.floor(Math.random() * images.length);
  }

  randomCar1 = randomNumber();
  randomCar2 = randomNumber();

  console.log(randomCar1 + " " + randomCar2);

  //zorg er voor dat de auto's nooit hetzelfde kunnen zijn
  while (randomCar1 === randomCar2) {
    randomCar2 = randomNumber();
    console.log(randomCar1 + " " + randomCar2)
  }
}

randomCar();



let data = {
  title: "Datingapp",
  page: "About",
  name: "Sam Slotemaker",
  imageUrl1: images[randomCar1],
  imageUrl2: images[randomCar2],
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
function finding(req, res){
  res.render('finding.ejs', {
    data
  })
}

//ongeldige pagina
function error404(req, res) {
  res.status(404).end('Error: 404 - Page not found');
}

//verzenden van image op antwoorden van vraag
function sendImage(req, res)  {
  collection.insertOne({
    answer: req.body.car
  });
  randomCar();
  res.redirect('/finding');
}


app.listen(port, () => console.log(`app running on port: ${port}`));