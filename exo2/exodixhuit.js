const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // Requête simple pour trouver les films dont le champ summary contient "famille"
        const result = {
            summary: { $regex: "famille", $options: "i" } // Recherche de motif insensible à la casse
        };

        const projection = {
            _id: 0, // Exclure le champ _id
            title: 1 // Inclure uniquement le champ title
        };

        const films = await db.collection('films').find(result, projection).toArray();

        if (films.length > 0) {
            console.log("Titres des films contenant 'famille' dans le résumé:");
            films.forEach(film => {
                console.log(film.title);
            });
        } else {
            console.log("Aucun film trouvé avec 'famille' dans le résumé.");
        }

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();
