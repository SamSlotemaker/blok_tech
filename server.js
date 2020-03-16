const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();
const session = require('express-session');

app.use(session({
  'secret': '343ji43j4nasaSSAs3jn4jk3n',
  saveUninitialized: false,
  resave: false
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
  .get('/list', list)

  .get('*', error404)




let images = [
  "images/audi.jpg",
  "images/porsche.png",
  "images/mercedes.jpeg",
  "images/bentley.jpg",
  "images/ninjaBike.jpg",
  "images/bike.jpg"
]

let questionNumber = 0;

let data = {
  title: "Datingapp",
  name: "Sam Slotemaker",
  imageUrl1: images[0],
  imageUrl2: images[1],
  imageUrl3: images[2],
  imageUrl4: images[3],
  imageUrl5: images[4],
  imageUrl6: images[5]
}



function list(req, res) {
  collection.findOne({user: "SamSloot"}, done)

  function done(err, data) {
    if(err){
      next(err)
    }
    else{
      res.render('list.ejs', {
        data
      });
    
    }
  }


 
  
}
//find match pagina
function finding(req, res) {
  req.session.user = "SamSloot";

  //delete de huidige antwoorden van de ingelogde gebruiker
  collection.deleteOne({
    user: req.session.user
  })

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
    user: req.session.user,
    answerOne: req.body.car1,
    answerTwo: req.body.car2,
    answerThree: req.body.car3
  }, done);

    function done(err, data) {
    if(err){
      next(err)
    }
    else{
      res.redirect('/list')
    
    }
  }

}


app.listen(port, () => console.log(`app running on port: ${port}`));