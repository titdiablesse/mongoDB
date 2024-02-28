const { MongoClient } = require('mongodb');

// FS permet de lire un fichier 
const fs = require('fs').promises;


async function main(){
    const uri = "mongodb://localhost:27017/dataTest";
    // Créer l'instance du client mongoDB
    const client = new MongoClient(uri);

    // Méthode pour effectuer les requêtes sur la BDD
    const db = client.db();
    try {
        // convertir le fichier JSON en objet JS et lire le fichier
        const data = JSON.parse(await fs.readFile('database.json', 'utf-8'));

        // se connecter au serveur
        await client.connect();
        console.log("Connected to the server");

        // parcourir les collections et insérer les documents
        for (const [collectionName, documents] of Object.entries(data)) {

            // créer les collection en fonction des clés du fichier JSON
            const collection = db.collection(collectionName);

         
            // insérer les documents dans la collection
            await collection.insertMany(documents);

            console.log(`Insertion terminée pour la collection ${collectionName}`)
        }





   
    } catch (e) {

        console.error(e);

    } finally {

        // Fermer la connexion à la BDD 
        await client.close();

    }

}
main()