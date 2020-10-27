// Importing dependencies
const express = require("express");
const https = require("https");
const http = require("http");
var path = require("path");
var giftsCRUD = require("./GiftsCRUD")


const awsconfig = require('./awsconfig')
var AWS = awsconfig.AWS;

var docClient = new AWS.DynamoDB.DocumentClient();

async function getGiftListAsync(user_id) {
    const params = {
        TableName: "gifts",
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
             ":user_id": user_id
        }
    };

    const res = await docClient.query(params).promise();
    return res.Items[0];
}

function addGiftToList(gift) {
    const params = {
        Key: {user_id: gift.user_id},
        TableName: "gifts",
        UpdateExpression: "SET #g = list_append(#g, :vals)",
        ExpressionAttributeNames: {
            "#g": "gifts"
        },
        ExpressionAttributeValues: {
            ":vals": [{
                id: gift.id,
                name: gift.name,
                price: gift.price,
                link_url: gift.link_url,
                photo_url: gift.photo_url,
                server: gift.server
            }]
        }
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
    const response = await getGiftListAsync(user_id);
    res.json(response);
});

app.post('/addGiftToList', function(req, res) {

    const gift = req.body;
    const response = addGiftToList(gift);
    res.send("Updated")
    // console.log("hello");
    // console.log(req.body);
    // res.send("Post request sent successfully")
})

app.post('/deleteGiftFromList/:giftId', function(req, res) {
    let gift_id = req.params['giftId'];
    console.log(gift_id);
    console.log("HELLO");
});

// starting server on port 8081
app.listen(8080, () => {
    console.log("Server started!");
    console.log("on port 8080");
})