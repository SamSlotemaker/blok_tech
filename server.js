const express = require('express');
const app = express();
const port = 3000;


let data = {
  title: "Datingapp",
  page: "About",
  name: "Sam Slotemaker"
}

app
  .use(express.static('public'))
  .set('view engine', 'ejs')
  .set('views', 'view')




app.get('/finding', (req, res) => {
  res.render('finding.ejs', {
    data
  })
})

app.get('/finding', (req, res) => {
  res.sendFile('public/finding.html' , { root : __dirname});
})

app.get('*', (req, res) => {
  res.end('Error: 404 - Page not found');
})

app.listen(port, () => console.log(`app running on port: ${port}`));