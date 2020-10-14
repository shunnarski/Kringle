
const awsconfig = require('./awsconfig')
var AWS = awsconfig.AWS;
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Movies",
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});