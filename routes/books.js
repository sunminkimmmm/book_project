var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
    host:"localhost",
    user:"ksm",
    password:"min8536",
    database:'ksm'
});

conn.connect(function(err){
    if(err){
        throw err;
    }
    console.log('DB Connetoin Sucess');

});

router.get('/',function(req,res,next){
    var sql = "SELECT * FROM books";
    conn.query(sql,function(err,row){
        if(err){
            throw err;
        }
        res.render('index', {page:'./books.ejs',data:row});
    });
    
});

router.post('/addBook',function(req,res,next){

    var sql = "SELECT * FROM books WHERE namebook = ?";
    conn.query(sql,[req.body.namebook],function(err,row){
        if(err){
            throw err;
        }
        if(row.length===0){
            var sql = "INSERT INTO books(namebook,bookQty,price, booksimg)VALUES(?,?,?,?)";
            conn.query(sql,[req.body.namebook,req.body.bookQty,req.body.price,req.body.booksimg],function(err,result){
                if(err){
                    throw err;
                }
                if(result){
                    res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
                    res.write("<script>alert('도서등록 완료');location.href='/books'</script>");
                }else{
                    res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
                    res.write("<script>alert('도서등록 실패');history.back();</script>");
                }
            });
        }else{
            res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
            res.write("<script>alert('중복된 도서입니다');history.back();</script>");
        }
    });
    
});

router.post('/modify',function(req,res){
    // res.send(req.body);
    var sql = "UPDATE books SET ? WHERE idx = ?";
    conn.query(sql,[req.body,req.body.idx],function(err,result){
        if(err){
            throw err;
        }
        console.log(result);
        if(result){
            res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
            res.write("<script>alert('도서수정 완료');location.href='/books'</script>");
        }else{
            res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
            res.write("<script>alert('도서수정 실패');history.back();</script>");
        }
    });
});


router.get('/remove/:id',function(req,res){
    var id = req.params.id;
    var sql = "DELETE FROM books WHERE idx = ?";
    conn.query(sql,[id], function(err,result){
        if(err){
        throw err;
        }
        if(result){
            res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
            res.write("<script>alert('도서삭제 완료');location.href='/books'</script>");
        }else{
            res.writeHead(200,{"content-Type":"text/html;charset=utf-8"});
            res.write("<script>alert('도서삭제 실패');history.back();</script>");
        }

    });

});

module.exports = router;

