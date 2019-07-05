const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const yoyos = require('./yoyos.json');

const BASE_URL = 'YOUR NGROK HTTPS URL';

require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.post("/yoyos", (req, res) => {
  const { parameters, outputContexts } = req.body.queryResult;
  if (parameters.yoyos && parameters.yoyos.length) {
    return res.json({
      fulfillmentText: `What would you like to know about ${parameters.yoyos}?`
    });
  } else if (parameters.specs) {
    const yoyo_id = outputContexts[0].parameters.yoyos.replace(/ /g, '');
    const spec = parameters.specs;

    let spec_value = yoyos.find(item => item.id == yoyo_id)[spec];
    let payload = { is_url: false };
    if (spec == 'image') {
      spec_value = `${BASE_URL}/images/${spec_value}`
      payload = {
        is_url: true
      }
    }

    return res.json({
      fulfillmentText: spec_value,
      payload
    });
  }

  const names = yoyos.map(({ name }) => name);

  return res.json({
    fulfillmentText: "The yoyos available are: " + names.join(', ')
  });
});


const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on ports ${PORT}`);
  }
});