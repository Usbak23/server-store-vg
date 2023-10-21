const mongoose = require("mongoose");
const { urlDb } = require('../config');


// mongoose.connect(urlDb, {
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// module.exports = db;




// (2) kita import konfigurasi terkait MongoDB dari app/config/index.js


// (3) connect ke MongoDB menggunakan konfigurasi yang telah kita import
mongoose.connect(urlDb);

// (4) simpan koneksi dalam constant db
const db = mongoose.connection;

// (5) export db supaya bisa digunakan oleh file lain yang membutuhkan
module.exports = db;