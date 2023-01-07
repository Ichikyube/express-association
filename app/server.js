const responseHelper = require('express-response-helper').helper();
const express = require ("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const cors = require("cors")

var corsOptions = {
    origin: "http://127.0.0.1:8801"
}

app.use(responseHelper)

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

const db  = require('./models')
const Role = db.Role;

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Drop and Resync Db.");
    initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
  Role.create({
    id: 2,
    name: "moderator"
  });
  Role.create({
    id: 3,
    name: "admin"
  });
}
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/customer.routes')(app);
require('./routes/product.routes')(app);
require('./routes/order.routes')(app);

app.listen(port, () => {
    console.log(`the server run at localhost on port: ${port}`)
})