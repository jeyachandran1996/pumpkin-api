import * as dotenv from "dotenv"
const cors = require('cors');
const express = require('express');
import * as mongoose from "mongoose"
import {routes} from "./routes.config"

const app = express();
const db = mongoose.connection

dotenv.config({path: __dirname+'/.env'})

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true})
db.on('error',console.error.bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log("DB Connected")
})
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({message: 'Welcome to Flutter Application'});
});
let routesMap = routes.map((route: any)=>{
    app.use('/api'+route.path, route.handler)
    return route
})
Promise.all(routesMap)
.then((data: any)=>{
    // console.log(data)
})
.catch((error:any)=>{
    console.log(error)
})
.finally(()=>{
    app.listen(process.env.PORT, () =>
        console.log(`Example app listening on port ${process.env.PORT}!`),
    );
})