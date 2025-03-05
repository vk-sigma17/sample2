const express = require('express');
const app = express()


// app.use('/sample', (req, res, next) => {
//     console.log("Handler 1");
//     // res.send("Route Handler 1")
//     // next();

// }, (req, res, next) => {
//     console.log("Handler 2");
//     // res.send("Route Handler 2")
//     next();
    
// }, (req, res, next) => {
//     console.log("Handler 3");
//     res.send("Route Handler 3")
    

// })

// app.get('/:id', (req, res) => {
//     res.send(`Home page : ${req.params.id}`)
// })
// app.post('/about', (req, res) => {
//     res.send({
//         name: "vikash Khowal",
//         isMale: true
//     })
// })
// app.delete('/delete', (req, res) => {
//     res.send("Data deleted Successfully!!")
// })

app.get('/skip', (req, res, next) => {
    console.log('This handler will be skipped');
    next('route'); // Skips to the next matching route handler
  }, (req, res) => {
    res.send('You will not see this response because the handler is skipped');
  });
  
  // Next matching route handler
  app.get('/skip', (req, res) => {
    res.send('Skipped to this route handler');
  });

app.listen(3333, () => {
    console.log("Server is running on port 3333")
}) 