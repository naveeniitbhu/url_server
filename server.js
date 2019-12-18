const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const knex = require('knex')
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'naveen',
      password : 'naveen',
      database : 'urlshort'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    const input_url = req.body.org_url;
    const domain_name = 'http://localhost:3000/';
    const randomstring = Math.random().toString(32).substring(2,6)+Math.random().toString(32).substring(2,6);
    const output_url = domain_name+randomstring;
    
    db('urldb').insert({input_url:input_url,output_url:output_url})
        .then(console.log('success'))
        
    res.json(output_url);

    console.log(input_url);
    console.log(output_url);
})

app.get('/', (req,res) => {
    res.send('this is working');
});

app.get('/:code', (req,res) => {
    res.send('this is working too');
    console.log(req.params.code);
    // res.redirect('https://www.youtube.com/watch?v=paNikhYqdz0');
});

app.listen(3000, () => {console.log('app is running on port 3000');
});