const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();
        
        // Tri par années croissantes
        const ascendingResults = await db.collection('films').aggregate([
            { $sort: { year: 1 } },
            { $limit: 5 }
        ]).toArray();
        console.log(ascendingResults);

        // Tri par années décroissantes
        const descendingResults = await db.collection('films').aggregate([
            { $sort: { year: -1 } },
            { $limit: 5 }
        ]).toArray();
        
        console.log(descendingResults);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();











