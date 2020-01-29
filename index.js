const express = require('express');
const {uuid} = require('uuidv4');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 8080;

var tokens = [];
var glassesDB = [];
glassesDB["1"] = {
    "id": "1",
    "title": "Gafas Julbo Polarized 3 verde",
    "description": "Gafas Julbo Vermont Classic marrón con lentes Polarized 3 verde",
    "price": 32,
    "images": ["https://media.deporvillage.com/h_500,w_500,f_auto,q_auto,c_pad,b_white/product/ju-ju0109050_002.jpg", "https://media2.deporvillage.com/h_1000,w_1000,f_auto,q_auto,c_pad,b_white/product/ju-ju0109050_001.jpg"],
    "details": {
        "lensesDiameter": "12",
        "bridgeMaterial": "10",
        "rimsMaterial": "test"
    },
    "colors": ["#cc9900", "#4d3900"],
    "bgColor": '#999966',
};
glassesDB["2"] = {
    "id": "2",
    "title": "Gafas Julbo Spectron 4 cromo",
    "description": "Gafas Julbo Vermont Classic Spectron 4 cromo",
    "price": 34,
    "images": ["https://media.deporvillage.com/w_900,f_auto,q_auto,c_pad,b_white/product/j010-20125ok.jpg"],
    "details": {
        "lensesDiameter": "12",
        "bridgeMaterial": "10",
        "rimsMaterial": "test"
    },
    "colors": ["#cc9900", "#4d3900"],
    "bgColor": '#999966',
};
glassesDB["3"] = {
    "id": "3",
    "title": "Gafas Oakley Sutro",
    "description": "Gafas Oakley Sutro Matte White con lentes Prizm Road",
    "price": 103,
    "images": ["https://media2.deporvillage.com/w_900,f_auto,q_auto,c_pad,b_white/product/ok-0oo9406__940606.jpg", "https://media2.deporvillage.com/w_900,f_auto,q_auto,c_pad,b_white/product/ok-0oo9406__940603.jpg"],
    "details": {
        "lensesDiameter": "12",
        "bridgeMaterial": "10",
        "rimsMaterial": "test"
    },
    "colors": ["#e0e0d1", "#999966"],
    "bgColor": '#f5f5f0',
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/list/init', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({'token': uuid().toString()});
});

app.get('/api/list/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        'status': 200,
        "data": {
            "glasses": [
                {
                    "id": "1",
                    "title": "Gafas Julbo Polarized 3 verde",
                    "description": "Gafas Julbo Vermont Classic marrón con lentes Polarized 3 verde",
                    "price": 32,
                    "images": ["https://media.deporvillage.com/h_500,w_500,f_auto,q_auto,c_pad,b_white/product/ju-ju0109050_002.jpg", "https://media2.deporvillage.com/h_1000,w_1000,f_auto,q_auto,c_pad,b_white/product/ju-ju0109050_001.jpg"],
                    "colors": ["#cc9900", "#4d3900"],
                    "bgColor": '#999966',
                },
                {
                    "id": "2",
                    "title": "Gafas Julbo Spectron 4 cromo",
                    "description": "Gafas Julbo Vermont Classic Spectron 4 cromo",
                    "price": 34,
                    "images": ["https://media.deporvillage.com/w_900,f_auto,q_auto,c_pad,b_white/product/j010-20125ok.jpg"],
                    "colors": ["#cc9900", "#4d3900"],
                    "bgColor": '#999966',
                },
                {
                    "id": "3",
                    "title": "Gafas Oakley Sutro",
                    "description": "Gafas Oakley Sutro Matte White con lentes Prizm Road",
                    "price": 103,
                    "images": ["https://media2.deporvillage.com/w_900,f_auto,q_auto,c_pad,b_white/product/ok-0oo9406__940606.jpg", "https://media2.deporvillage.com/w_900,f_auto,q_auto,c_pad,b_white/product/ok-0oo9406__940603.jpg"],
                    "colors": ["#e0e0d1", "#999966"],
                    "bgColor": '#f5f5f0',
                }
            ]
        }
    });
});

app.get('/api/list/:token', (req, res) => {
    let token = req.params["token"];
    console.log(`/api/list/${token}`);
    let inventory = tokens[token];
    let glasses = [];
    if (typeof inventory !== "undefined") {
        glasses = inventory;
    }

    res.setHeader('Content-Type', 'application/json');
    res.json({
        'status': 200,
        "data": {
            "glasses": glasses
        }
    });
});

app.get('/api/list/:token/count', (req, res) => {
    let token = req.params["token"];
    console.log(`/api/list/${token}/count`);
    let inventory = tokens[token];
    let count = 0;
    if (typeof inventory !== "undefined") {
        count = inventory.length;
    }


    res.setHeader('Content-Type', 'application/json');
    res.json({
        'status': 200,
        "count": count
    });
});

app.get('/api/detail/:token/:id', (req, res) => {
    let token = req.params["token"];
    let id = req.params["id"];
    console.log(`/api/list/${token}`);
    let inventory = tokens[token];
    const found = inventory.find(element => element.id === id);

    console.log("found", found);

    res.setHeader('Content-Type', 'application/json');
    res.json({
        'status': 200,
        "data": found
    });
});

app.get('/api/reset/:token', (req, res) => {
    let token = req.params["token"];
    console.log(`/api/reset/${token}`);
    tokens[token] = [];

    res.setHeader('Content-Type', 'application/json');
    res.json({
        'status': 200
    });
});

app.post('/api/add/:token', (req, res) => {
    console.log('Got body:', req.body);
    let token = req.params["token"];
    let id = req.body.id;
    console.log(`/api/add/${token} with ${id}`);

    let inventory = tokens[token];
    var ar = [];
    if (typeof inventory === 'undefined') {
        tokens[token] = [];
    } else {
        ar = tokens[token];
    }

    ar.push(glassesDB[id]);
    tokens[token] = ar;

    console.log(tokens[token]);

    res.setHeader('Content-Type', 'application/json');
    res.json({
        'status': 200
    });
});

app.post('/api/remove/:token', (req, res) => {
    let token = req.params["token"];
    let id = req.body.id;
    console.log(`/api/remove/${token} ${id}`);
    let inventory = tokens[token];

    var foundIndex = inventory.findIndex(element => element.id === id);
    if (foundIndex > 0) {
        inventory.splice(foundIndex, 1);
    }
    console.log(inventory);
    console.log("foundIndex", foundIndex);

    tokens[token] = inventory;

    res.setHeader('Content-Type', 'application/json');
    res.json({
        'status': 200
    });
});

app.post('/api/payment/:token', (req, res) => {
    let token = req.params["token"];
    console.log(`/api/payment/${token}`);

    res.setHeader('Content-Type', 'application/json');
    res.json({
        'status': 200
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
