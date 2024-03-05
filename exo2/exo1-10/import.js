const { MongoClient } = require('mongodb');
const fs = require('fs').promises; 

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {

        const data = JSON.parse(await fs.readFile('films.json', 'utf-8'));

        await client.connect();
        console.log("Connected to the server");

        const collections = client.db().collection('films');

        const result = await collections.insertMany(data);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();