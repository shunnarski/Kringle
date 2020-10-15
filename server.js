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

    try {
        const data = await docClient.query(params).promise();
        if (!data) return null;
        return data.Items[0];

    } catch(err) {
        return err;
    }

  


    // docClient.query(params, function(err, data) {

    //     if (err) {
    //         console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    //     } else {
    //         console.log("Query succeeded.");

    //         return await data.Items[0];
    //     }
    // });
}


function addGiftToList(user_id, gift) {
    giftsCRUD.addGift(user_id, gift);
}

// Starting Express app
const app = express();

// Set the base path to the kringle dist folder
app.use(express.static(path.join(__dirname, 'dist/kringle')));

// Any routes will be redirected to the angular app
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/kringle/index.html'));
});


app.get('/getGiftListForUser/:userId', function(req, res) {
    let user_id = req.params["userId"];
    const val = getGiftListAsync(user_id).then((item) => {
        return item;
    });
    res.json(val);
});

// app.get('/get')


// starting server on port 8081
app.listen(8080, () => {
    console.log("Server started!");
    console.log("on port 8080");
})