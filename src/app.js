const express = require('express');
const app = express()


app.get('/', (req, res) => {
    res.send("Home page")
})
app.post('/about', (req, res) => {
    res.send({
        name: "vikash Khowal",
        isMale: true
    })
})
app.delete('/delete', (req, res) => {
    res.send("Data deleted Successfully!!")
})

app.listen(3333, () => {
    console.log("Server is running on port 3333")
}) 