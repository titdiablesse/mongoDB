const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // Requête pour mettre à jour l'année de sortie du film "La Guerre des étoiles"
        const filter = { title: "La Guerre des étoiles" }; // Filtre pour trouver le film
        const updateDocument = {
            $set: { year: 1978 } // Mettre à jour l'année de sortie à 1978
        };

        const result = await db.collection('films').updateOne(filter, updateDocument);

        console.log(`${result.modifiedCount} document(s) mis à jour.`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();

