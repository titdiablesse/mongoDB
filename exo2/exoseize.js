const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // Requête simple pour trouver le film avec le résumé contenant "la guerre du Vietnam"
        const result = {
            summary: { $regex: "la guerre du Vietnam", $options: "i" } // Recherche de motif 
        };

        const projection = {
            _id: 0, // Exclure le champ _id
            title: 1, // Inclure le champ title
            year: 1 // Inclure le champ year
        };

        const film = await db.collection('films').findOne(result, projection);

        if (film) {
            console.log("Titre du film:", film.title);
            console.log("Année de sortie:", film.year);
        } else {
            console.log("Aucun film trouvé avec 'la guerre du Vietnam' dans le résumé.");
        }

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();

