
// import structure pour la base de donnée 
const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);
    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")
// exo1
        const result = await db.collection("films").find(
            {
                "director.last_name": "Spielberg",
                genre: 'Aventure'
            },
            {projection : { "title":1, _id: false}

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