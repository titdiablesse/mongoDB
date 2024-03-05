const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // Requête simple pour trouver les films dans lesquels joue l'acteur "Robert Redford"
        const result = {
            "actors.last_name": "Redford", // Recherche par nom de famille de l'acteur
            "actors.first_name": "Robert" // Recherche par prénom de l'acteur
        };

        const projection = {
            _id: 0, // Exclure le champ _id
            title: 1, // Inclure le champ title
            year: 1 // Inclure le champ year
        };

        const films = await db.collection('films').find(result, projection).toArray();

        if (films.length > 0) {
            console.log("Films dans lesquels joue Robert Redford:");
            films.forEach(film => {
                console.log("Titre du film:", film.title);
                console.log("Année de sortie:", film.year);
                console.log("-----------------------------");
                // permet de faire une separation entre les titres
            });
        } else {
            console.log("Aucun film trouvé dans lesquels joue Robert Redford.");
        }

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();
