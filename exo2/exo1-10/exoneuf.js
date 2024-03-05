const { MongoClient } = require('mongodb');



async function main() {

    const uri = "mongodb://localhost:27017/filmTest";

    const client = new MongoClient(uri);



    try {

        await client.connect();

        console.log("Connected to the server");



        const movies = await client.db('filmTest').collection('films').find(

            {

                title: "Apocalypse Now"

            },

            {

                projection: {

                    "actors.last_name": 1,

                    "actors.first_name": 1,

                    "_id": 0

                }

            }

        ).toArray();

            console.log(movies[0].actors);

      

    } catch (e) {

        console.error(e);

    } finally {

        await client.close();

    }

}



main();