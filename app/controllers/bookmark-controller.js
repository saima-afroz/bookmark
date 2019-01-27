const express = require('express');
const router = express.Router();
const { Bookmark } = require('../models/bookmark');

const { ObjectID } = require('mongodb');


router.get('/', function(req,res){
  //res.send('welcome to the bookmark website')
  Bookmark.find().then(function(bookmarks){
      res.send(bookmarks)
  })
.catch(function(err){
    res.send(err)
})
})



router.get('/:id',function(req,res){
 let id = req.params.id
 Bookmark.findById(id).then(function(bookmark){
     res.send(bookmark)
 }).catch(function(err){
     res.send("oops wrong id")
 })
})

router.post('/',function(req,res){
    let body = req.body;
    let collection = new Bookmark(body)
    collection.save().then(function(bookmark){
        res.send(bookmark)
    }).catch(function(err){
        res.send(err)
    })
})

router.put('/:id',function(req,res){
    let id = req.params.id;
    let body = req.body
    Bookmark.findByIdAndUpdate(id, {$set: body}, {new: true}).then(function(bookmark){
        res.send(bookmark)
    }).catch(function(err){
        res.send(err)
    })

})

router.delete('/:id',function(req,res){
    let id = req.params.id;
 Bookmark.findByIdAndDelete(id).then(function(bookmark){
     res.send({
         noitice: 'successfully deleted the bookmark'
     })
 }).catch(function(err){
     res.send(err);
 })

})

router.get('/tags/:name', function(req,res){
    let tag = req.params.name
    Bookmark.find({tags: tag}).then(function(bookmark){
        res.send(bookmark)
    }).catch(function(err){
        res.send(err)
    })    
})

router.get('/tags',function(req,res){
  let allTags= req.query.names
  allTags = allTags.split(',')
  Bookmark.find({tags: {"$all":
  [allTags[0],allTags[1],allTags[2],allTags[3],allTags[5]]}}).then(function(bookmark){
  res.send(bookmark)
  }).catch(function(err){
      res.send(err)
  })
})




module.exports = {
    bookmarksController: router
}

