const express = require("express");
const app = express();
const config = require("./config");
const MenuItem = require("./models/MenuItem");
const Admin = require("./models/Admin");
const Soup = require("./models/Soup");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//test connection to DB
config.authenticate().then(function () {
    console.log("Database is connected");
  })
  .catch(function () {
    console.log("There is no connection to DB");
  });

//get all items
app.get("/menuitems", function (req, res) {
  MenuItem.findAll()
    .then(function (results) {
      res.status(200).send(results);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

//get an item
app.get("/menuitems/:menuItem_name", function (req, res) {
  let menuItemName = req.params.menuItem_name;

  MenuItem.findByPk(menuItemName)
    .then(function (result) {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send("Item does not exist");
      }
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

//create an item
app.post("/menuitems", function (req, res) {
	let menuItem_info = req.body;
	let result = {
		name: menuItem_info.name,
		price: menuItem_info.price,
		description: menuItem_info.description,
		type: menuItem_info.type,
		category: menuItem_info.category,
		calories: menuItem_info.calories,
		allegrens: menuItem_info.allegrens,
	}
 
	MenuItem.create(result)
	  .then(function () {
		 res.status(200).send(result);
	  })
	  .catch(function (error) {
		 res.status(500).send(error);
	  });
 });
 
 //delete an item
 app.delete("/menuitems/:menuItem_name", function (req, res) {
	let menuItemName = req.params.menuItem_name;
 
	MenuItem.findByPk(menuItemName).then(function (result) {
	  if (!result) {
		 res.status(500).send("Item does not exist");
	  } else {
		 result
			.destroy()
			.then(function (result) {
			  res.status(200).send(result);
			})
			.catch(function (error) {
			  res.status(500).send(error);
			});
	  }
	});
 });
 
 //update an item
 app.put("/menuitems/:menuItem_name", function (req, res) {
	let menuItemName = req.params.menuItem_name;
	let menuItem_info = req.body;
 
	MenuItem.findByPk(menuItemName).then(function (result) {
	  if (!result) {
		 res.status(500).send("Item does not exist");
	  } else {
		 result.description = menuItem_info.description;
		 result.category = menuItem_info.category;
		 result.calories = parseInt(menuItem_info.calories);
		 result.allegrens = menuItem_info.allegrens;
		 result.price = menuItem_info.price;
		 result.type = menuItem_info.type;
 
		 result
			.save()
			.then(function (result) {
			  res.status(200).send(result);
			})
			.catch(function (error) {
			  res.status(500).send(error);
			});
	  }
	});
 });

//get all soups
app.get("/soups", function (req, res) {
  Soup.findAll()
    .then(function (results) {
      res.status(200).send(results);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

//get a soup
app.get('/soups/:soup_name',function(req,res){

	let soupName = req.params.soup_name;

	Soup.findByPk(soupName)
	.then(function(result){
		if(result){
			res.status(200).send(result);
		}else{
			res.status(500).send("Item does not exist")
		}
	})
	.catch(function(error){
		res.status(500).send(error);
	})
})

//add a new soup
app.post('main/soups',function(req,res){
	let Soup_info = req.body;

	Soup.create(Soup_info)
	.then(function(){
		res.status(200).send(Soup_info);
	})
	.catch(function(error){
		res.status(500).send(error);
	})
})

//delete a soup
app.delete('main/soups/soup_name', function(req,res){

	let soupName = req.params.soup_name;

	Soup.findByPk(soupName)
	.then(function(result){
		if(!result){
			res.status(500).send('Item does not exist');
		}else{
			result.destroy()
			.then(function(result){
				res.status(200).send(result);
		})
			.catch(function(error){
				res.status(500).send(error);
			})
	}})
})

//get all adminitstrators
app.get("/admins", function (req, res) {
  Admin.findAll()
    .then(function (results) {
      res.status(200).send(results);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
});

//delete an administrator
app.delete("/admins/:admin_email", function (req, res) {
  let AdminEmail = req.params.admin_email;

  Admin.findByPk(AdminEmail).then(function (result) {
    if (!result) {
      res.status(500).send("Administrator does not exist");
    } else {
      result
        .destroy()
        .then(function (result) {
          res.status(200).send(result);
        })
        .catch(function (error) {
          res.status(500).send(error);
        });
    }
  });
});

//add new administrator
app.post("/register", function (req, res) {
  let clearTextPassword = req.body.password;
  let salt = 10;

  bcrypt.hash(clearTextPassword, salt, function (error, passwordHash) {
    if (error) {
      res.status(500).send(error);
    } else {
      let Admin_info = req.body;
      Admin_info.password = passwordHash;

		//create an admin
      Admin.create(Admin_info).then((result) => {
          res.status(200).send(result);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  });
});

//admin login 
app.post('/login', function(req, res) {
	let emailAddress = req.body.email;
	let clearTextPassword = req.body.password;
 
	// Finding admin
	let data = {
	  where: {email: emailAddress}
	};
 
	Admin.findOne(data).then(result => {
		 if (result) {
			bcrypt.compare(clearTextPassword, result.password, function(err, output) {
			  if (output) {
				 res.status(200).send(result);
			  } else {
				 res.status(401).send('Incorrect password');
			  }
			});
		 } else {
			res.status(404).send('User does not exist!');
		 }
	  })
	  .catch(err => {
		 res.status(500).send(err);
	  });
 });


// //get an administrator
// app.get("/admins/:admin_email", function(req,res){
// 	let adminEmail = req.params.admin_email;
	
// 	Admin.findByPk(adminEmail)
// 	.then(function(result){
// 		if(result){
// 			res.status(200).send(result);
// 		}else{
// 			res.status(500).send("Administrator does not exist");
// 		}
// 	})
// 	.catch(function(error){
// 		res.status(500).send(error);
// 	});
// });



app.listen(3000, function () {
  console.log("server is running at port 3000....");
});
