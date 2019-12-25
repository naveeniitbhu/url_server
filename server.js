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
    const check_url = input_url.startsWith("http://") ||
                        input_url.startsWith("https://") ||
                        input_url.startsWith("ftp://");
    if(check_url) {
        const domain_name = 'http://localhost:3000/';
        const urlcode = Math.random().toString(32).substring(2,6)+Math.random().toString(32).substring(2,6);
        const output_url = domain_name+urlcode;
    
        db('urldb').insert({input_url:input_url,urlcode:urlcode,output_url:output_url})
            .then(console.log('Database Updated'))
        res.json(output_url);
    } else {
        res.json("Invalid Url");
    }
})

app.get('/', (req,res) => {
    res.send('this is working');
});

app.get('/:code', async (req,res) => {

    const redirectlink = 
            await db('urldb').where({urlcode:req.params.code})
                .select('input_url')
                .then(value => {return value});

    res.redirect(redirectlink[0].input_url);
});

app.listen(3000, () => {console.log('app is running on port 3000');
});