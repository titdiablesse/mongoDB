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


        // insérer UN document dans la collection Etudiants
        await db.collection('Etudiants').insertOne({
            nom: 'DOE',
            prenom: 'John',
            mail: 'j.d@gmail.com',
            tel: '87398743'
        });


        // Insérer plusieurs documents dans la collection Etudiants

        await db.collection('Etudiants').insertMany([
            {
                nom: 'DOE',
                prenom: 'Jane',
                mail: 'j.dd@gmail.com',
                tel: '87398743'
            },
            {
                _id: 'EdudiantDOEJim',
                nom: 'DOE',
                prenom: 'Jim',
                mail: 'JJ.d@gmail.com',
                age: 23,
                hobby: ['football', 'basketball']
            },

    ]);

}catch (e) {

        console.error(e);

    }
    finally {

        // Fermer la connection à la BDD 
        await client.close();

    }

}

main()