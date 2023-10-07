npm init -y

npm i express pg sequelize sequelize-cli

create app.js in root dir

node app.js

add new start dzev

"scripts": {
    "dev": "node app.js"
  },
npm install -D nodemon

npm run dev

mkdir src

npx sequelize-cli init

configmy toxnel miayn development
configurate database => username,password,database,host,dialect,port

index.js change config path




express import
server sarqel express() kanchel

app.listen(port) // amenanerqevum

sarqel get methot
app.get('/zorik', function, next)
res.send("gfg)






----------------Migration----------------

poxel configum databvase-y to tes2, navicatum create new database

npx sequelize-cli migration:generate --name create_user_table

add migraion file in src/migration folder

npx sequelize-cli db:migrate

app.js filum import User model,

create new router for get-all-users example /get-all-users GET
User.findAll();
,

create new router for create user, POST  example .post /user
send first_name, last_name in request body,
const {first_name, last_name } = req.body;
User.create({first_name, last_name });

app.use

create new router for get user by id, GET

.get('/get-user/:id')

const {id} = req.params
User.findByPk(id);


bolor database connectionnery katarvum en asyc awaitov




////////////////////////////////////////////////////
auth router for login and registr


log
bodiic username password

retern {
  token: jwt.sign(SECRET, 2d)
  ...user
}

