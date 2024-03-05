// 14 : Afficher le nombre de films par genre.

const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        // séquence d'opérations d'agrégation pour compter le nombre de films par genre
        const result = [
            { $group: { _id: "$genre", count: { $sum: 1 } } }
            // $groupe : regroupe les documents qui se trouve dans le champ genre,
            // _id : "genre" regroupe les document par la valeur champ, ensuit count permet de compter et $sum calacul la somme des films par genre en +1
        ];

        const results = await db.collection('films').aggregate(result).toArray();

        console.log("Nombre de films par genre:");
        results.forEach(result => {
            console.log(`${result._id}: ${result.count}`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();
