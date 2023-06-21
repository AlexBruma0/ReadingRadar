// const axios = require('axios');

// // set up the request parameters
// const params = {
// api_key: "5C34E3D2794B4C448573F4E730AA68E9",
//   amazon_domain: "amazon.ca",
//   asin: "B0BRGJKKKN",
//   type: "product"
// }

// // make the http GET request to ASIN Data API
// axios.get('https://api.asindataapi.com/request', { params })
// .then(response => {

//     // print the JSON response from ASIN Data API
//     console.log(JSON.stringify(response.data, 0, 2));

//   }).catch(error => {
// // catch and print the error
// console.log(error);
// })
const {MongoClient} = require('mongodb');
async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = `mongodb+srv://bruma:Canuckhead22@cluster0.egeqpgy.mongodb.net/test?retryWrites=true&w=majority`
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};