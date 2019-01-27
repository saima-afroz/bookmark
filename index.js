const express = require('express');
const app = express();
const { mongoose } = require('./config/db'); 
const { bookmarksController } = require('./app/controllers/bookmark-controller');
const { Bookmark } = require('./app/models/bookmark')

const port = 3001;

app.use(express.json()); 

app.get('/', function(req,res){
    res.send('welcome to the site');
});

app.use('/bookmarks', bookmarksController)

app.get('/:hash', function(req,res){
    let hashValue = req.params.hash
    Bookmark.findOne({hashedUrl: hashValue}).then(function(bookmark){
     res.redirect(bookmark.originalUrl)
    }).catch(function(err){
        res.send(err)
    }) 
    
})
app.listen(port, function(){
    console.log('listening to the port',port);
});

