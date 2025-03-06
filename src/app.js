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
//  get userData by Email
app.post("/getOne", async(req, res) => {
    const userEmail = req.body.email;
    try{
        const getuser = await user.findOne({email: userEmail});
        if(getuser.length === 0){
            res.status(404).send("Something went wrong!!")
        }
        res.send(getuser);
    }
    catch(err){
        res.status(400).send("something went wrong!!")
    }
})

// getAll Feed
app.get("/getAll", async(req, res) => {
    try{
        const allUsers = await user.find({});
        if(allUsers.length === 0){
            res.status(404).send("something Went wrong!!")
        }
        res.send(allUsers)
    }
    catch(err){
        res.status(400).send("something went wrong!!")
    }
})

// delete one user
app.delete("/deleteOne", async(req, res) => {
    const userId = req.body.userId;
    try{
        await user.findByIdAndDelete({_id: userId});
        res.send("user Deleted!!")
    }
    catch(err){
        res.status(400).send("Something went wrong!!")
    }
})

app.patch("/updateOne", async(req, res) => {
    const userId = req.body.userId;
    const updateData = req.body;
    try{
        const updatedUser = await user.findByIdAndUpdate({_id: userId}, updateData,
            {new : true} // now console will give updated user
        );
        res.send("user Updated!!");
        console.log(updatedUser);
    }
    catch(err){
        res.status(400).send("Something went wrong!!")
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
