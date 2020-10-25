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


function addGiftToList(user_id, gift) {
    giftsCRUD.addGift(user_id, gift);
}

// Starting Express app
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
    const val = await getGiftListAsync(user_id);
    res.json(val);
});

// starting server on port 8081
app.listen(8080, () => {
    console.log("Server started!");
    console.log("on port 8080");
})