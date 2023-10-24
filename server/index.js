const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

//ประกาศการใช้งาน cors และ express.json()
app.use(cors());
app.use(express.json());


//การสร้าง object เพื่อเชื่อมฐานข้อมูลโดยรระบุ user,host,password,database
const db = mysql.createConnection({
    //เมื่อเชื่อมต่อ api ได้ถูกต้องจะทำการ run คำสั่ง sql 
    user: "root",
    host: "localhost",
    password: "",
    database: "air_conditioner_db"
})
app.get('/air', (req, res) => {
    db.query("SELECT * FROM air_conditioner", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const brand = req.body.brand ;
    const size_btu = req.body.size_btu;
    const price = req.body.price;

    db.query("INSERT INTO air_conditioner (name,type,brand,size_btu,price) VALUES (?,?,?,?,?)",
        [name,type,brand,size_btu,price],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values inserted")
            }
        }
    );
});

app.get('/edit/:id',(req,res)=>{
  const sql = "SELECT * FROM air_conditioner WHERE id = ?";
  const id = req.params.id;
  db.query(sql,[id],(err,result) =>{
    if(err) return res.json({Error:err});
    return res.json(result);
  })
})


app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const type = req.body.type;
    const brand = req.body.brand ;
    const size_btu = req.body.size_btu;
    const price = req.body.price;
    const sql = "UPDATE air_conditioner SET `name` = ?,`type` = ?,`brand` = ?,`size_btu` = ?,`price`  = ? WHERE id = ?";
    db.query(sql,[name,type,brand,size_btu,price, id]
     ,
      (err, result) => {
        if (err) return res.json('Error');
        return res.json({updated:true})
        }
    );
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM air_conditioner WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
});