const { MongoClient } = require('mongodb');


async function main(){
    const uri = "mongodb://localhost:27017/dataTest";
    // Créer l'instance du client mongoDB
    const client = new MongoClient(uri);

    // Méthode pour effectuer les requêtes sur la BDD
    const db = client.db();
    try {
        await client.connect();
        console.log("Connected to the server");


        // Mettre à jour UN document dans la collection Etudiants
        await db.collection('Etudiants').updateOne(
            {_id: 'etudiant4'},
            {$set: {
                    nom: 'DUCODE',
                    prenom: 'Franck',
                    email: 'd.f@gmail.com',
                    tel: '87398743'

                }}
        );
                    

}catch (e) {

        console.error(e);

    }
    finally {

        // Fermer la connection à la BDD 
        await client.close();

    }

}

main()