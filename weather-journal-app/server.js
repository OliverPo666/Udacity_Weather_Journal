// Setup empty JS object to act as endpoint for all routes
console.log('server running!!');
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();
app.use(cors());
app.listen(8000);

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/add", async (req, res) => {
    const allData = await req.body;
    projectData = allData;
    res.send(projectData);
    //console.log(projectData);
});

app.get("/all", async (req, res) => {
        res.send(projectData);
});

// app.get('/', (req, res) =>{
//     console.log('cool');
//     res.send('hi');
// })


// Initialize the main project folder
app.use(express.static('website'));

