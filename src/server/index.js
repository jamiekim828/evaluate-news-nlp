var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
var bodyParser = require('body-parser');
var cors = require('cors');
var AYLIENTextAPI = require('aylien_textapi');
const dotenv = require('dotenv');
dotenv.config();

const projectData = [];

// set aylien API credentials
// NOTICE that textapi is the name I used, but it is arbitrary.
// You could call it aylienapi, nlp, or anything else,
//   just make sure to make that change universally!
var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express();
app.use(cors());

// to use json
app.use(bodyParser.json());

// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('dist'));

console.log(__dirname);

console.log(JSON.stringify(mockAPIResponse));

app.get('/', function(req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});

// app.get('/test', function(req, res) {
//   res.send(mockAPIResponse);
// });

// GET '/all'
app.get('/all', getProjectData);

function getProjectData(req, res) {
  res.send(projectData);
  console.log('projectData', projectData);
}

// Post Route

// app.post('/test', async function(req, res) {
//   await addData();
//   res.send('post success');
// });

// const addData = async (req, res) => {
//   console.log('addData req', req, 'res', res);

//   await textapi.sentiment(
//     {
//       text: 'John is a great football player!'
//     },
//     function(error, response) {
//       if (error === null) {
//         projectData.push(response);
//       } else {
//         console.log(error);
//       }
//     }
//   );
// };

app.post('/test', addData);

function addData(req, res) {
  console.log('req.body', req.body);
  textapi.sentiment(
    {
      text: req.body.text
    },
    function(error, response) {
      if (error === null) {
        projectData.push(response);
      } else {
        console.log(error);
      }
    }
  );
}
