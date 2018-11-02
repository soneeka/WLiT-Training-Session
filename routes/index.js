var express = require('express');
var router = express.Router();

var Users = require('../models/users');
var Notes = require('../models/notes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WLiT' });
});

router.get('/login', function(req,res){
  res.render('login');

})

router.get('/signup', function(req,res){
  res.render('signup');

})

router.get('/addnote', function(req,res){
  res.render('addnote');

})

router.get('/viewnote', function(req,res){
  res.render('viewnote');

})


router.post('/addnote', function(req,res){
  console.log('',req.body);
  var note= new Notes({
    title: req.body.title,
    note: req.body.note
  })
  var promise = note.save()
  promise.then((note)=>{
    console.log('saved note is:',note);
    Notes.find().exec(function(err,notes){
      res.render('viewnote',{notes})
    });
  });

  router.delete('/deletenote/:id',function(req,res){
    Notes.find({_id: req.params.id}).remove();
  });
 
  // note.save().then((note) =>{
  //   console.log('hhhhhhhhhhhhhsudo ',note);
  // });
})

router.post('/signup', function(req,res){
  console.log('req.........',req.body);
  var user= new Users({
    username: req.body.username,
    password: req.body.password
  });
 
  user.save().then((user) =>{
    console.log('user signed up with values',user);
  })
  });



  router.post('/login', function(req,res){
    if(req.body.username && req.body.password){
      Users.findOne({
        username: req.body.username,
        password: req.body.password
      },function(err,user){
        console.log('user logged in with info', user);
      })
    }
    else {console.log('not registered');}
   
});

module.exports = router;
