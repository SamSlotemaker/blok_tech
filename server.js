const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();
const session = require('express-session');

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
  .use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
  }))
  .post('/sendImage', sendImage)
  .get('/finding', finding)
  .get('/matches', matches)
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
  name: "Sam Slotemaker"
}

//vul data met foto's; op imageUrlX
for (let i = 0; i < images.length; i++) {
  let index = "imageUrl" + (i + 1);
  data[index] = images[i];
}


function matches(req, res) {
  req.session.user = "SamSloot";
  console.log(req.session.user);
  collection.findOne({
    user: req.session.user
  }, done)

  function done(err, useData) {
    data.user = useData;
    // console.log(data.user)
    if (err) {
      next(err)
    } else {

      if (data.user.answerOne == 1) {
        data.user.answerOneImg = images[0]
      } else {
        data.user.answerOneImg = images[1]
      }
      if (data.user.answerTwo == 1) {
        data.user.answerTwoImg = images[2]
      } else {
        data.user.answerTwoImg = images[3]
      }
      if (data.user.answerThree == 1) {
        data.user.answerThreeImg = images[4]
      } else {
        data.user.answerThreeImg = images[5]
      }


      collection.find({
        user: {
          $ne: req.session.user
        }
      }).toArray(doneTwo);

      function doneTwo(err, useData) {
        if (err) {
          throw err;
        } else {
          console.log(useData);

          data.matches = [];
          for (let i = 0; i < useData.length; i++) {
            if (data.user.answerOne == useData[i].answerOne && data.user.answerTwo == useData[i].answerTwo &&
              data.user.answerThree == useData[i].answerThree) {
              data.matches.push(useData[i])
              console.log(`${useData[i].user} is toegevoegd aan matches`)
            }
          }
          console.log(data.matches);
        }

        res.render('matches.ejs', {
          data
        });
      }




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
    if (err) {
      next(err)
    } else {
      res.redirect('/matches')

    }
  }


}


app.listen(port, () => console.log(`app running on port: ${port}`));