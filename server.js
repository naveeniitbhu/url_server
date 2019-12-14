const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    const input_url = req.body.org_url;
    const output_url = req.body.result_url;
    res.json('success');
    console.log(input_url);
    console.log(output_url);
})

app.get('/', (req,res) => {
    res.send('this is working');
});

app.listen(3000, () => {console.log('app is running on port 3000');
});