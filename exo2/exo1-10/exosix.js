// 6 - Afficher les titres des films et leur année de sortie dans lesquels "Uma Thurman" a joué.

const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")

        const result = await db.collection("films").find(
            {
                "actors.first_name": "Uma",
                "actors.last_name": "Thurman"

            },
            {projection : { "title":1, _id: false, year: 1}

            }
        ).toArray();

        console.log(result);
    }
    catch (e) {

        console.error(e);
    }

    finally {

        await client.close();
    }
}

main()


