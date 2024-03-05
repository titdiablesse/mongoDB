const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);
    const db = client.db();
    try {
        await client.connect();
        console.log("connected to server")
        const result = await db.collection("films").updateMany(
            { title : "Le Parrain" }, 
            { $addToSet: { actors:{$each:
                [
                {first_name : "John", last_name : "Cazale", birth_date : 1935}, 
                {first_name : "Richard", last_name : "Conte", birth_date : 1910}
            ] 
            }}})
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