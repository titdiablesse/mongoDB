const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to server");

        const db = client.db();

        const exo10Results = await db.collection('films').aggregate([
            {
                $match: {
                    year: {
                        $lt: 1968
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    year: 1
                }
            },
            {
                $sort: {
                    year: 1
                }
            }
        ]).toArray();

        console.log(exo10Results);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await client.close();
    }
}

main();