const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);
    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")
    const result = await db.collection("films").deleteOne(
        { 
        title: "Impitoyable"})

        console.log(result);
    }
    catch (e) {

        console.error(e);
    }

    finally {

        await client.close();
    }
}

main()
