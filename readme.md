npm init -y

npm i express pg sequelize sequelize-cli

create app.js in root dir

node app.js

add new start 

"scripts": {
    "dev": "node app.js"
  },
npm install -D nodemon

npm run dev

mkdir src

npx sequelize-cli init

the leave only davelopment in config. Delete all others
configurate database => username,password,database,host,dialect,port

index.js change config path




express import
create server  
call express() 

app.listen(port) // at the very bottom

create get method
app.get('/zorik', function, next)
res.send("gfg)






----------------Migration----------------

change in config database to test4, create new database in navicat

npx sequelize-cli migration:generate --name create_user_table

add migraion file in src/migration folder

npx sequelize-cli db:migrate  /////////////run

in file app.js  import User model,

create new router for get-all-users example /get-all-users GET
User.findAll();


create new router for create user, POST  example .post /user
send first_name, last_name in request body,
const {first_name, last_name } = req.body;
User.create({first_name, last_name });

app.use

create new router for get user by id, GET

.get('/get-user/:id')

const {id} = req.params
User.findByPk(id);



all database connections are made with async await //bolor database connectionnery katarvum en async awaitov



////////////////////////////////////////////////////
auth router for login and registr


log
bodiic username password

retern {
  token: jwt.sign(SECRET, 2d)
  ...user
}

////////////////////////////
create joi validator for user and book 


////////////////////////////
create new products considering that
Only admin users can create new products
and all other users can see them

First, we need to create a model for 
these products and these products need 
to be saved in the database 


for this we need to generate 
migration and write all the 
product data in it


Considering that we do not have an administrator,
first we need to create a new user who will be the administrator