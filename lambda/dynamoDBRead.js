'use strict';

console.log('starting function')

const AWS=require('aws-sdk');
const docClient=new AWS.DynamoDB.DocumentClient({region: 'us-west-2'})

module.exports.dynamodbRead=function(e,ctx,callback)
{

    let ScanningParameters=
        {
            TableName: 'guestbook', //DynamoDB table name to read from
            Limit: 100
        };

    docClient.scan(ScanningParameters, function(err,data){
        if(err)
        {
            callback(err,null)
        }
        else
        {
            callback(null, data)
        }
    });


}