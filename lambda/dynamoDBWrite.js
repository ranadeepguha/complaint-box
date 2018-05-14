console.log('starting function')

const AWS=require('aws-sdk');
const docClient=new AWS.DynamoDB.DocumentClient({region: 'us-west-2'})

module.exports.dynamodb_write=function(e,ctx,callback)
{
    var params={
        Item: {

            date:Date.now(),
            message: e.message,
            ip: e.IP,
            region: e.region,
            city: e.city,
            country: e.country

        },

        TableName: 'guestbook' //DynamoDB Table name to write to
    };

    docClient.put(params, function(err,data){
        if(err)
        {
            callback(err,null);
        }
        else
        {
            callback(null,data);

        }

    });

}