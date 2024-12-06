const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error.js');
const {mongoConnect,getDb} = require('./util/database.js')
const User = require('./models/user.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6752816005888c854e018e31')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      console.log('inside the user',req.user);
      
      // req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
  try {
    app.listen(3000)
    console.log("Connected to Mongodb Atlas");
  } catch (error) {
    console.log(error);
  }
})

// connectMongoose((client)=>{
// });