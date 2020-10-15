
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
}

// exports.handler = async(event, context) => {
//     try {
//         const data = await getGiftListAsync(user_id);
//     } catch(err) {
//         return {error: err}
//     }
// }