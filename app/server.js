const responseHelper = require('express-response-helper').helper();
const express = require ("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const cors = require("cors")
const db  = require('./models/index.js')


var corsOptions = {
    origin: "http://localhost:8801"
}

app.use(responseHelper)
db.sequelize.sync({ force: false, alter: true})
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("this is just a base project")
})

app.get('/user', async (req, res) => {
    const user = await db.User.findAll();
    res.respond(user, 200);
    // The usual way (without express-response-helper)
    // res.status(200).json({ name: 'john' });
  
    // But with express-response-helper;
    //res.respond({ name: 'john' });
  });
  
  app.get('/404', function(req, res) {
    // The usual way (without express-response-helper)
    // res.status(404).send('Resoure Not Found');
  
    // But with express-response-helper;
    res.failNotFound('Resoure Not Found');
  
    // This returns a response like this:
    /*
      {
        "status": 404,
        "error": "404",
        "messages": "Resoure Not Found"
      }
    */
  });
app.listen(port, () => {
    console.log(`the server run at localhost on port: ${port}`)
})