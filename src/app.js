const express = require('express');
const app = express()
const {connectDB} = require('./config/database')
// const {adminAuth} = require('./middleware/auth')

const { user } = require('./model/user')
const validateSignupData = require('./utils/validation')
const bcrypt = require('bcrypt'); // or 'bcrypt' if you are using that


app.use(express.json())

app.post("/userSignUp", async(req, res) => {
    
    validateSignupData(req)
    const {firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = new user({firstName, lastName, email, password: hashedPassword})
    try{
        await User.save();
        res.send("Data Added SuucessFully!!")

    }
    catch(err){
        res.status(400).send(err.message)
    }

})

// login account
app.post("/login", async(req, res) => {
    try{
        const { email, password} = req.body;
         // Validate input
         if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const oneUser = await user.findOne({email: email});
        if(!oneUser){
            throw new Error("Invalid Credentials");
        }
        const ValidPassword = await bcrypt.compare(password, oneUser.password)
        if(!ValidPassword){
            throw new Error("password is not valid!!")
        }
        res.send(`${oneUser.firstName}, Login Successfully`)
        // res.status(200).send(`${oneUser.firstName} User Login Successfully`);

    }
    catch(err){
        res.status(400).send("Invalid Credientials!!!")
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

app.patch("/updateOne/:userId", async(req, res) => {
    const userId = req.params?.userId;
    const updateData = req.body;
    // console.log("ASDFG", userId);
    // console.log("ASDFG", updateData);
    try{
        const ALLOWED_UPDATES = ["photoURL", "about", "gender", "skills", "firstName", "lastName", "age"];

        const isUpdateAllowed = Object.keys(updateData).every((k) => ALLOWED_UPDATES.includes(k))
        if(!isUpdateAllowed){
            throw new Error("update Not Allowed!")
        }
        if(data?.skills.length > 10){
            throw new Error("Skills Cannot be more than 10");
        }

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
