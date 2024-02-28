const { MongoClient } = require('mongodb');


async function main(){
    const uri = "mongodb://localhost:27017/dataTest";
    // Créer l'instance du client mongoDB
    const client = new MongoClient(uri);

    // Méthode pour effectuer les requêtes sur la BDD
    const db = client.db();
    try {

///////////////////////////////////// Agrégation avec plusieurs stages /////////////////////////////////

  const aggregationResult = await db.collection('Sessions').aggregate([
    // Première stage d'agrégation 
    {
      $match: {
        date_entree : {$gte: '2024-03-01'}
      }
    }, 
    // Deuxième stage d'agrégation 
    {
      $group: {
        _id: {
            formation_id: '$formation_id',
            lieu: '$lieu'
        },
        total_students: {$sum: {$size: '$participants'}}
      }
    }, 
    // Troisième stage d'agrégation 
    {
      $sort: {
        lieu: 1
      }
    }, 
      // Quatrième stage d'agrégation 
    {
        $limit : 2
    }, 
    // Cinquième stage d'agrégation
    {
        $project: {
            _id: 0,
            formation_id: '$_id.formation_id',
            lieu: '$_id.lieu',
            total_students: 1
        }
    }


  ]).toArray();

//   console.log(aggregationResult);


////////////////////////////////////////////////////  Jointures $lookup /////////////////////////////////

// Afficher nom et prénom des étudiants et les sessions auxquelles ils participent
const studentsSessions = await db.collection('Etudiants').aggregate([
    {
        $lookup: {
            from: 'Sessions',
            localField: '_id',
            foreignField: 'participants',
            as: 'res'
        }
    }, 
    {
        $unwind: '$res'
    },
    {
        $project: {
            _id: 0,
            nom: 1,
            prenom: 1,
            sessions: '$res._id',
            lieu : '$res.lieu',
        }
    }
]).toArray();

// console.log(studentsSessions);

//  Afficher lieu date entrée pour chaque session, titre de la formation et les participants 

const agregResult = await db.collection('Sessions').aggregate([
    {
        $lookup: {
            from: 'Etudiants',
            localField: 'participants',
            foreignField: '_id',
            as: 'participants'
        }
    },
    {
        $project:{
            lieu: 1,
            date_entree: 1,
            participants : {
                // $map est comme une boucle  input = tableau à parcourir as = élement courant de la boucle in = traitement à effectuer sur chaque élement
                $map : {
                    input: '$participants',
                    as: 'participant',
                    in:{
                        $concat: ['$$participant.nom', ' ', '$$participant.prenom']
                    }
                }

            }
        }
    }, 
    {
        $lookup:{
            from: 'Formations',
            localField: 'formation_id',
            foreignField: '_id',
            as: 'formation'
        }
    }, 
    {
        $project:{
            lieu: 1,
            date_entree: 1,
            participants: 1,
            titre_formation: { $arrayElemAt: [ '$formation.titre', 0 ] }
        }
    }

]).toArray();

console.log(agregResult);
  
    




                    

}catch (e) {

        console.error(e);

    }
    finally {

        // Fermer la connexion à la BDD 
        await client.close();

    }

}

main()