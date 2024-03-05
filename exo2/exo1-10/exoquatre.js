const { MongoClient } = require('mongodb');
async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);


    // 4 - Afficher la liste de tous les "genres" de la collection sans doublon. Puis affichez le nombre de genres présents dans cette collection.

    const db=client.db();
    try {
        await client.connect();
        console.log("connected to server")

        const result = await db.collection("films").distinct("genre");
            var count = 0 
            result .forEach(()=>{count ++})
            console.log  ("Il y a au total " + count +" genres de films");
    




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