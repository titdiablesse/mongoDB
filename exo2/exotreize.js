const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // Requête pour trouver tous les titres de film dont le réalisateur n'est pas "Tarantino"
        const query = {
            director: { $ne: "Tarantino" } 
            // $ne correspond a not equal (different de )
        };

        const options = {
            projection: { _id: 0, title: 1 } 
            // Pour ne récupérer que les titres des films
        };

        const results = await db.collection('films').find(query, options).toArray();

        console.log("Films not directed by Tarantino:");
        results.forEach(film => {
            // cette boucle sert a afficher les titres des films trouve dans la collections
            console.log(film.title);
        });

    } catch (err) {
        console.error(err);
        
    } finally {
        await client.close();
    }
}

main();
