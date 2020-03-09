const express = require('express');
const app = express();
const port = 4000;
let collection = null;
require('dotenv').config()


//database configuratie
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

  collection.insertOne({
    answer: req.body.imageClicked
  })

  randomCar();
  
  res.redirect('/finding');

})

app.listen(port, () => console.log(`app running on port: ${port}`));