var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page:"main.ejs" });
});

// router.get('/books', function(req, res, next) {
//   res.render('index', { page:"books.ejs" });
// });

// router.get('/users', function(req, res, next) {
//   var sql = "SELECT * FROM users ";
//   conn.query(sql,[req.body.id],function(err,row){
//     if(err){
//       throw err;
//     }
//     //res.send(row);
//     res.render('index', { page:"user.ejs",data:row });
//   });
// });
// router.post('/signup', function(req, res, next) {
//   var sql = "SELECT * FROM users WHERE id =?";
//   conn.query(sql,[req.body.id],function(err,row){
//     if(err){
//       throw err;
//     }
//     if(row.length===0){
//       var sql = "INSERT INTO users(name,id,pw) VALUES (?,?,?)";
//       conn.query(sql,[req.body.name, req.body.id, req.body.pw],function(err, result){
//         if(err){
//           throw err;
//         }
//         if(result){
//           res.send('회원가입 완료');

//         }else{
//           res.send('회원가입 실패');
//         }
//       })

//     }else{
//       res.send("회원가입 불가능");

//     }
//   });
// });
module.exports = router;
