const express = require('express');
const app = express()
// const {adminAuth} = require('./middleware/auth')

// app.use('/admin', adminAuth);  // this line auth check to go to routers

// app.get('/admin/getAllData', (req, res) => {
//     res.send("All Data Received!!")
// })

// app.get("/admin/allDataDeleted", (req, res) => {
//     res.send("All Data Deleted!!")
// })

app.use("/", (err, req, res, next) => {
    if (err) {
        console.error(err.stack);
        res.status(500).send("Something went wrong!!");
    }
});

app.get('/user', (req, res, next) => {
    try {
        throw new Error("QQQQQQ");
        res.send("Success!!");
    }
    catch (err) {
        next(err);  // Pass the error to the global error handler
    }
});


app.listen(3333, () => {
    console.log("Server is running on port 3333")
}) 