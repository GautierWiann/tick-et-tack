var userModel = require('../models/user');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/login', function(req, res, next) {
  req.session.dataCard = []
  var exist = true
  res.render('login', {exist});
});

router.post('/sign-up', async function(req, res, next) {
  
  var existentUser = await userModel.findOne({ email:req.body.email });
  if (!existentUser) {
    
    var newuser = new userModel ({
      
      name: req.body.name,
      FirstName: req.body.FirstName,
      email: req.body.email ,
      password: req.body.password,
     });
     
     // We save our new user in our MongoDB
    var newUserSaved = await newuser.save();

    req.session.name = {name: newUserSaved.name, id: newUserSaved._id};
    req.session.FirstName = {name: newUserSaved.FirstName, id: newUserSaved._id};

     res.redirect('/index');
   
    }else {
      res.redirect('/users/login');
}

});

  router.post('/sign-in', async function(req, res, next) {
var exist = true
    var existentUser = await userModel.findOne({ email:req.body.email, password:req.body.password });
    console.log(existentUser);
   
     if(existentUser) {

     req.session.user = { name: existentUser.name, id: existentUser._id};
  
      console.log("EXISTENT USER :", existentUser);
      res.redirect('/');
     
    } else {
      console.log("NOT EXISTENT USER :"+ existentUser);
      exist = false
      res.render('login', {exist});
    }

    });

    router.get('/logout', function(req, res) {

      res.redirect('/users/login');

      req.session.user = null
     });


     router.get('/trips', async function (req, res, next) {

   var user = await userModel.findById(req.session.user.id);
   
   console.log(user);

    var date = [];

    for (var i = 0; i < date.length; i++) {
      if ().date < Date.now()) {
        date.push(user.trips[i])
      }
    }

      console.log(date)

      res.render('lastrips', { title: 'My last trips', date: date });
    });
    

module.exports = router
