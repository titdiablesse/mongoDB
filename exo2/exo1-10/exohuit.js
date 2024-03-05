const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")

        // Afficher les noms et prénoms des acteurs qui ont joué dans "Apocalypse Now".

        const result = await db.collection("films").find(
            {
                "title" : "Apocalypse Now"

            },
            {projection : {  _id: false, "actors.last_name":1, "actors.first_name":1}

            }
        ).toArray();

        console.log(result[0].actors);
    }
    catch (e) {

        console.error(e);
    }

    finally {

        await client.close();
    }
}

main()

// 8 - Afficher les noms et prénoms des acteurs qui ont joué dans "Apocalypse Now".
// Methode de wolfgang

// const apocalypseNowActors = await db.collection('films').aggregate([

//     { $match: { title: 'Apocalypse Now' } },

//     { $unwind: '$actors' },

//     { $project: {'actors.last_name': 1, 'actors.first_name': 1, _id: 0} }

// ]).toArray();

// console.log(apocalypseNowActors);