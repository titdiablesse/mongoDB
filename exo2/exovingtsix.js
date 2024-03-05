const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);
    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")
     await db.collection("films").deleteMany(
        { 
        year: 1970})

        // console.log(result);
    }
    catch (e) {

        console.error(e);
    }

    finally {

        await client.close();
    }
}

main()
