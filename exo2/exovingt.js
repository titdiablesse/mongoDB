const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // Requête pour trouver les titres des films dans lesquels joue Clint Eastwood
        const result = {
            "actors.last_name": "Eastwood",
            "actors.first_name": "Clint"
        };

        const projection = {
            _id: 0,
            title: 1
        };

        const films = await db.collection('films').find(result, projection).toArray();

        if (films.length > 0) {
            console.log("Titres des films dans lesquels joue Clint Eastwood:");
            films.forEach((film, index) => {
                console.log(`<${index + 1}> - Titre du film: ${film.title}`);
            });

            // Liste complète des titres de tous les films
            const allFilms = await db.collection('films').distinct('title');

            // Trouver le film manquant
            const filmsWithEastwood = films.map(film => film.title);
            const missingFilm = allFilms.filter(title => !filmsWithEastwood.includes(title));
            console.log("Il manque le film suivant dans la liste:", missingFilm);
        } else {
            console.log("Aucun film trouvé dans lesquels joue Clint Eastwood.");
        }

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();