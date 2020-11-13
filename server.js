// Importing dependencies
const express = require("express");
const https = require("https");
const http = require("http");
const request = require("request");
const path = require("path");
const giftsCRUD = require("./GiftsCRUD");
const awsconfig = require('./awsconfig');
const environment_vars = require('./envs');
var EventEmitter = require('events').EventEmitter;

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

function getEtsyGiftInfo(listing_id, user_id) {
    let api_key = "?api_key=" + environment_vars.EtsyAPISecrets.keystring;
    var listing_url = environment_vars.EtsyAPISecrets.listings_api_server + listing_id;

    var etsyGift = {};

    etsyGift.link_url = "";
    etsyGift.user_id = user_id;
    etsyGift.id = 0;
    etsyGift.server = "etsy.com";
    
    let options = {
        url: listing_url + api_key
    };

    const urls = [(listing_url + api_key)];

    // request(options, async function(error, response, body) {
    //     // emitter.data = JSON.parse(body);
    //     data = await JSON.parse(body).results[0];
    //     // emitter.emit('update');
    //     // let results = data.results[0];
    //     // console.log(results);
    //     // etsyGift.name = results.title;
    //     // etsyGift.price = parseFloat(results.price);
    // });

    const promises = urls.map(url => {
        request(url, function(error, response, body) {
            return JSON.parse(body);
        })
    });
    Promise.all(promises).then((data) => {
        console.log(data);
    })

    // emitter.on('update', function() {
    //     let results = emitter.data.results[0];
    //     etsyGift.name = results.title;
    //     etsyGift.price = parseFloat(results.price);

    // });

    // options = {
    //     url: listing_url + "/images" + api_key
    // };

    // // let emitter_images = new EventEmitter();
    // await request(options, function(error, response, body) {
    //     emitter_images.data = JSON.parse(body);
    //     emitter_images.emit('images');
    // });

    // emitter_images.on('images', function() {
    //     let result_images = emitter_images.data.results[0];
    //     etsyGift.photo_url = result_images.url_fullxfull;
    // });

    return etsyGift;
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

app.all("/getEtsyInfo/:listing_id/:user_id", function(req, res, next) {
    let listing_id = req.params['listing_id'];
    let user_id = req.params['user_id'];

    let etsyGift = getEtsyGiftInfo(listing_id, user_id);
    // let api_key = "?api_key=" + environment_vars.EtsyAPISecrets.keystring;
    // var listing_url = environment_vars.EtsyAPISecrets.listings_api_server + listing_id;

    // var etsyGift = {};

    // etsyGift.link_url = "";
    // etsyGift.user_id = user_id;
    // etsyGift.id = 0;
    // etsyGift.server = "etsy.com";
    
    // let options = {
    //     url: listing_url + api_key
    // };

    // let emitter = new EventEmitter();
    // request(options, function(error, response, body) {
    //     emitter.data = JSON.parse(body);
    //     emitter.emit('update');
    // });

    // emitter.on('update', function() {
    //     let results = emitter.data.results[0];
    //     etsyGift.name = results.title;
    //     etsyGift.price = parseFloat(results.price);

    //     console.log(etsyGift);
    // });
    // next();

    // options = {
    //     url: listing_url + "/images" + api_key
    // };

    // let emitter_images = new EventEmitter();
    // request(options, function(error, response, body) {
    //     emitter_images.data = JSON.parse(body);
    //     emitter_images.emit('images');
    // });

    // emitter_images.on('images', function() {
    //     let result_images = emitter_images.data.results[0];
    //     etsyGift.photo_url = result_images.url_fullxfull;
    //     console.log(etsyGift);
    // })

    // next();

    res.json(etsyGift);

});


app.all("/getEtsyInfo/:listing_id/images", function(req, res, next) {
    let listing_id = req.params['listing_id'];
    let api_key = "?api_key=" + environment_vars.EtsyAPISecrets.keystring;
    var listing_url = environment_vars.EtsyAPISecrets.listings_api_server + listing_id;
    
    const options = {
        url: listing_url + "/images" + api_key
    };

    let emitter = new EventEmitter();
    request(options, function(error, response, body) {
        emitter.data = JSON.parse(body);
        console.log(emitter.data);
        emitter.emit('udpate');
    });

    emitter.on('update', function() {
        res.json(emitter.data.results[0]);
    });
});

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