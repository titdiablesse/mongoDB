const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // Requête pour trouver tous les titres de films du genre "Action" ou "Aventure"
        const result = {
            genre: { $in: ["Action", "Aventure"] }
        };

        // Options pour trier les résultats par genre
        const options = {
            sort: { genre: 1 }
        };

        const results = await db.collection('films').find(result, options).toArray();

        console.log("Films sorted by genre (Action or Adventure):");
        results.forEach(film => {
            console.log(film.title);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();
