const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const database =[];

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    const input_url = req.body.org_url;
    const domain_name = 'shorty.in/';
    const randomstring = Math.random().toString(32).substring(2,6)+Math.random().toString(32).substring(2,6);
    const output_url = domain_name+randomstring;
    
    database.push({output_url});

    res.json(output_url);
    console.log(input_url);
    console.log(output_url);
})

app.get('/', (req,res) => {
    res.send('this is working');
});

app.listen(3000, () => {console.log('app is running on port 3000');
});