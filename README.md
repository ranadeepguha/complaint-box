                                                  Complaint Box

A web application which takes user complaints as input and stores it in the DynamoDB along with the user's IP Address.
The user can then search for complaints using either the city, state or IP Address to get the list of complaints that were posted from that region

Frontend: HTML, Angular JS,JQuery and AJAX 
Backend: Lambda Using Node
APIs: Created using API Gateway and Lambda
Database: Amazon DynamoDB

How to run this project:

1. Clone the repository
2. Open AWS Console and create two lambda functions: dynamoDBRead and dynamoDBWrite
3. Copy the code from /lambda to each function respectively. Run time should be Node.JS 4.3. For more details on lambda and node visit https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
4. Create APIs using API Gateway to post and fetch the data(with Lambda). You can find a very good tutorial at https://www.youtube.com/watch?v=DSrg7hG-jV4
5. Run index.html 


