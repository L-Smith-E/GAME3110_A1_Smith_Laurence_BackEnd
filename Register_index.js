
/*global params*/
///*global user_id*/
///*global password*/
///*global DOB*/

// Loads in the AWS SDK
const AWS = require('aws-sdk');
// Creates the document client specifing the region 
// The tutorial's table is 'in us-east-1'
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    console.log(event);
    // Captures the requestId from the context message
    // let userid = event.user_id;
// let requestId = context.awsRequestId;
// requestId = event.queryStringParameters['user_id']['password']['DOB'];
   let body = JSON.parse(event.body)
let data = {
  user_id: body.user_id,
  password: body.password,
  DOB: body.DOB,
}
console.log(data);
   let params = {
     TableName: 'user_profiles',
     Item:{
     "user_id": data.user_id,
     "Money": 10,
     "password": data.password,
     "DOB": data.DOB
       }
   };  
   console.log("Adding a new Item...");
   console.log(ddb);
   
  ddb.put(params, function(err, data) {
      if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          const response = {
            statusCode: 404,
            body: "Could not find user with given id",
        };
        return response;
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
         const response = {
            statusCode: 200,
            body: "user added",
        };
        return response;
    }
});
   
    // Handle promise fulfilled/rejected states
    // await createUser(requestId).then(() => {
    //     callback(null, {
    //         statusCode: 201,
    //         body: '',
    //         headers: {
    //             'Access-Control-Allow-Origin' : '*'
    //         }
    //     });
    // }).catch((err) => {
    //     console.error(err)
    // })

    
     //function createUser(requestId){
    
       
    //  };
    //   return ddb.put(params).promise();  
    //  }
   
// 
    
//     db.put(params, function(err,data){
//     if(err){
//         callback (err,null);
//     }else{
//         callback(null, data);
//     }
//     });
// };

//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify("hello"),
//     };
    
//     let body = JSON.parse(event.body);
//     response.body = body.user_id;
//     response.body = body.level;
    
//     // if(event.httpMethod == 'GET')
//     // {
//     //     response.body = "You did a GET!";
//     //   return response;   
//     // }  
//     // else if (event.httpMethod == 'POST')
//     // {
//     //     response.body = "You did a POST";
//     //     return response;
//     // }
    
    
//     console.log("Sending response with status code");
//     return response;
// }
// };
};