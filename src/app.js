const express = require('express');
const app = express()
const {adminAuth} = require('./middleware/auth')

app.use('/admin', adminAuth);  // this line auth check to go to routers

app.get('/admin/getAllData', (req, res) => {
    res.send("All Data Received!!")
})

app.get("/admin/allDataDeleted", (req, res) => {
    res.send("All Data Deleted!!")
})


app.listen(3333, () => {
    console.log("Server is running on port 3333")
}) 