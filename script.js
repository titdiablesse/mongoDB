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


 ///////////////////////////// Filtrage et projection /////////////////////////////
        const result = await db.collection('Formations').find(
            // Filtre toutes les formations dont la durée est supérieure ou égale à 50 heures
            {duree_heures: {$gte: 40}},
            // Projection pour afficher uniquement le titre et le tarif
            {projection: {_id: false, titre: 1, tarif: 1}}
        ).toArray();

        // console.log(result);

///////////////////////////// Opérateurs de requête /////////////////////////////


// Trier par ordre croissant ou décroissant en fonction du tarif 
const sortedForma = await db.collection('Formations').find().sort(
                        // Trier les formations par tarif croissant
                        // 1 = croissant et -1 = décroissant
                        {tarif: -1}
                ).toArray();

        // console.log(sortedForma);


// Renvoyer 2 documents 
const limitedForma = await db.collection('Formations').find().limit(2).toArray(); 
// console.log(limitedForma);       

// Compter le nombre de documents dans la collection Formations
const count = await db.collection('Formations').countDocuments();
// console.log(count);


//  Retoruner les étudiants qui ont un champ age
const existStud = await db.collection('Etudiants').find({'age' : {$exists : true}}).toArray();
// console.log(existStud);


// Retourne le nom des étudiant sans doublon
const distinctStud = await db.collection('Etudiants').distinct('nom');
// console.log(distinctStud);

// Projection avec opérateur de requête 
// par default _id est toujours renvoyé
const projectStud = await db.collection('Etudiants').find({}).project({nom: 1, prenom: 1, _id: 0, tel:1, age:1}).toArray();
// console.log(projectStud);
                    

// retourner tous les etudiants avec tous les champs existants
const allStud = await db.collection('Etudiants').find({}).toArray();
console.log(allStud);

// Exercice faire un affichage de tous le étudiants selon le modèle 
// 1 . Nom Prenom Mail 
// ---------------------
// 2 . Nom Prenom Mail 

// faire passer la requête pour récupérer tous les étudiants dans une fonction 

}catch (e) {

        console.error(e);

    }
    finally {

        // Fermer la connection à la BDD 
        await client.close();

    }

}

main()