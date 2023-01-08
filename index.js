const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(express.static("public"));

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'YOUR PASSWORD', //ENTER YOUR SQL PASSWORD
    database:'mysqlform'
});



con.connect(function(error){
	if(error){
		console.log("Database connection failed");
	}else{
        console.log('Database Connected');
    }
})


app.get("/",function(req,res){
	res.sendFile(__dirname + "/public/index.html");
});



app.post("/api",function(req,res){
	const data = req.body;
	let sql = `INSERT INTO myform(fname,lname,age,phone) VALUES ("${data.fname}","${data.lname}","${data.age}","${data.phone}")`;

	con.query(sql,function(error,result){
		if(error){
			console.log(error);
		}
		else{
			// res.status(200).json(result);
			res.redirect('/api/show')
		}		
	})
      
});

app.get("/api/show",function(req,res){
	let sql = `SELECT * FROM myform`;
	con.query(sql,function(error,data){
		if(error){
			console.log(error);
		}
		else{
			res.status(200).json(data);
		}			
	})
});

app.listen(3330)

