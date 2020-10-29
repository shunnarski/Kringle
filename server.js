// Importing dependencies
const express = require("express");
const https = require("https");
const http = require("http");
const request = require("request");
const path = require("path");
const giftsCRUD = require("./GiftsCRUD")
const awsconfig = require('./awsconfig')

const GIFTSTABLE = "gifts";
var AWS = awsconfig.AWS;

var docClient = new AWS.DynamoDB.DocumentClient();

async function getGiftListAsync(user_id) {
    const params = {
        TableName: GIFTSTABLE,
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
             ":user_id": user_id
        }
    };

    const res = await docClient.query(params).promise();
    return res.Items[0];
}

function addGiftToList(gift) {
    const updateExpression = "SET gift" + gift.id + " = :vals";
    const conditionExpression = "attribute_not_exists(gift" + gift.id + ")";
    const params = {
        Key: {user_id: gift.user_id},
        TableName: GIFTSTABLE,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: {
            ":vals": {
                user_id: gift.user_id,
                id: gift.id,
                name: gift.name,
                price: gift.price,
                link_url: gift.link_url,
                photo_url: gift.photo_url,
                server: gift.server
            }
        },
        conditionExpression: conditionExpression
    }

    console.log("adding item");
    docClient.update(params, function(err, data) {
        if(err) {
            console.error(err);
        }
        else {
            console.log(JSON.stringify(data, null, 2));
        }
    });
}

function deleteGiftFromList(gift) {
    const setQuery = "REMOVE gift" + gift.id;
    console.log(setQuery);
    const params = {
        Key: {user_id: gift.user_id},
        TableName: GIFTSTABLE,
        UpdateExpression: setQuery,        
    }

    console.log("deleting item");
    docClient.update(params, function(err, data) {
        if(err) {
            console.error(err);
        }
        else {
            console.log(JSON.stringify(data, null, 2));
        }
    });
}


// Starting Express app
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language");
    next();
});

// Set the base path to the kringle dist folder
app.use(express.static(path.join(__dirname, 'dist/kringle')));

/////////// NODE REQUESTS ////////////

// Any routes will be redirected to the angular app
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/kringle/index.html'));
});

app.get('/getGiftListForUser/:userId', async function(req, res) {

    let user_id = req.params["userId"];
    const Item = await getGiftListAsync(user_id);

    var gift_list = [];

    // filter only the gifts to pass back
    var gift_keys = Object.keys(Item).filter(k => {
        return k.substring(0, 4) == "gift";
    });

    gift_keys.sort();

    gift_keys.forEach(key => {
        gift_list.push(Item[key]);
    })
  
    let response = {
        user_id: user_id,
        gifts: gift_list.sort()
    }
    res.json(response);
});

app.all('/scrapeAmazonGift/:url', function(req, res, next) {
    
    let url = req.params['url'];
    var URL = "https://www.amazon.com/FLAMMA-FS22-Stereo-Effects-Function/dp/B08BZ518HD/ref=sr_1_1_sspa?dchild=1&keywords=guitar+pedals&qid=1602214171&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzTTZKNE9aSkNOUTFKJmVuY3J5cHRlZElkPUEwMTY3NDc2RlZHTTEzOUlKRERHJmVuY3J5cHRlZEFkSWQ9QTA5NzcxMzkyTVZOWkJJR0FPQkIzJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ=="
    URL = URL.split("&qid")[0];
    const options = {
        url: URL,
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate, sdch, br",
            "Accept-Language": "en-US,en;q=0.8",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
        }
    }

    request(options, function(error, response, body) {
        let json = JSON.parse(body);
        console.log(json);
    })
    next();
})

app.post('/addGiftToList', function(req, res) {

    const gift = req.body;
    const response = addGiftToList(gift);
    res.send("gift added")
    // console.log("hello");
    // console.log(req.body);
    // res.send("Post request sent successfully")
})

app.post('/deleteGiftFromList', function(req, res) {
    const gift = req.body;
    const response = deleteGiftFromList(gift);
    res.send("gift removed")
    console.log(gift);
});

// starting server on port 8080
app.listen(8080, () => {
    console.log("Server started!");
    console.log("on port 8080");
})