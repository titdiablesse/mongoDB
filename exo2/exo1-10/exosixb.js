const { MongoClient } = require('mongodb');



async function main() {

  const uri = "mongodb://localhost:27017/films";

  const client = new MongoClient(uri);

  const db = client.db();



  try {

    await client.connect();

    console.log("Connected to the server");

    const filmsCollection = db.collection('films');

    const filmsWithUmaThurman = await filmsCollection.find(

        { "actors.last_name": "Thurman", 

        "actors.first_name": "Uma" 

        }, {projection:{title : true, _id:0, year : true}}).toArray();

    console.log("Films avec Uma Thurman:");

    filmsWithUmaThurman.forEach(film => {

      console.log(`Titre: ${film.title}, Année de sortie: ${film.year}`);

    });

    console.log(filmsWithUmaThurman);

  } catch (e) {

    console.error(e);

  } finally {

    await client.close();

  }

}

main()