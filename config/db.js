//mongoose - npm install --save mongoose

//ODM - object data models

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/sept-bookmarks', {useNewUrlParser: true}).then(function(){
    console.log('connected to db');
}).catch(function(err){
    console.log('error connecting to db', err);
})

module.exports = {
    mongoose
}