const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // Requête pour compter le nombre de films avec une année de sortie supérieure ou égale à 2000
        const result = {
            year: { $gte: 2000 } // $gte signifie supérieur ou égal à
        };

        const count = await db.collection('films').countDocuments(result);

        console.log(`Nombre de films avec une année de sortie supérieure ou égale à 2000: ${count}`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();
