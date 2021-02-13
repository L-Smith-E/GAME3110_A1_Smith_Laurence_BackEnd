const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient(); 

exports.handler = async (event) => {
    //Get User Id from the query param
    console.log(event); 
    console.log(db);
    const requestUID = event.queryStringParameters['user_id'];
    // Get the item from the database
    let params = {
        TableName : 'user_profiles',
        Key: {
            "user_id": requestUID
        }
    };
    //Return the item json
    let result = await db.get(params).promise();
    
    if (result.Item == null)
    {
        const response = {
            statusCode: 404,
            body: "Could not find user with given id",
        };
        return response;
    }
    //Else prettify result and send response
    
    const responseBody = {
        "name": result.Item.user_name,
        "level": result.Item.level
    };
   
    console.log(result);
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(responseBody),
    };
    return response;
};
