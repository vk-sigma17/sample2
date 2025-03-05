const express = require('express');
const app = express()


app.get('/', (req, res) => {
    res.send("Home page")
})
app.get('/about', (req, res) => {
    res.send("about page")
})
app.get('/contact', (req, res) => {
    res.send("contact page")
})

app.listen(3333, () => {
    console.log("Server is running on port 3333")
}) 