const express = require('express');
const app = express()
const {connectDB} = require('./config/database')
// const {adminAuth} = require('./middleware/auth')
const { user } = require('./model/user')

app.use(express.json())

app.post("/userSignUp", async(req, res) => {
    // const {firstName, lastName, email, password } = req.body;

    
    const User = new user(req.body)

    try{
        await User.save();
        res.send("Data Added SuucessFully!!")

    }
    catch(err){
        res.status(400).send(err.message)
    }

})


connectDB()
    .then(() => {
        console.log("DB Connection Established!!")
        app.listen(3333, () => {
            console.log("Server is running on port 3333")
        }) 
    })
    .catch((err) => {
        console.error("DB Connection Can Not Be esta" + err)
    })
