
const awsconfig = require('./awsconfig')
var AWS = awsconfig.AWS;

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "gifts",
    ProjectionExpression: "user_id, gifts",
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
         ":user_id": "1234"
    }
};

console.log("Scanning gifts table.");

docClient.scan(params, onScan);

console.log(queryData);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the gifts
        console.log("Scan succeeded.");
        data.Items.forEach(function(user_data) {
           console.log(user_data);
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}
