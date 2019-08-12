let mongoose = require('mongoose');
require('dotenv').config();

class Database {
  constructor() {
    this._connect()
  }
  
_connect() {
     mongoose.connect(process.env.DATABASE_STR,{useNewUrlParser: true})
       .then(() => {        
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error' + err)
       })
  }
}
mongoose.set('useFindAndModify', false);

module.exports = new Database()