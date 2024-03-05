const { MongoClient } = require('mongodb');
const fs = require('fs').promises; 

async function main() {
    const uri = "mongodb://localhost:27017/filmTest";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to the server");
// Création constante qui stocker un tableau champs pour faire la recherche dans la collection film (afin de faire des jointures futures)
        const filmsArray = [
            { title: "Ben-Hur", box_office_fr: 13_850_000, box_office_us: 98_000_000 },
            { title: "Mars Attacks!", box_office_fr: 2_150_000, box_office_us: 100_000_000 },
            { title: "Blade Runner", box_office_fr: 2_130_000, box_office_us: 95_000_000 },
            { title: "Predator", box_office_fr: 1_500_000, box_office_us: 120_000_000 },
            { title: "E.T. l'extra-terrestre", box_office_fr: 9_420_000, box_office_us: 140_000_000 }
          ]; 
// Variable Film stoque les films les uns après les autres dans ma boucle; et filmsarray sert à stoquer tous les films pour mettre dans la nouvelle collection 
          for(let film of filmsArray){
            let data = await client.db().collection("films").findOne(
                // data va stocker les id des films/
                {
                    title:film.title
                }
            )
            // S'il ne trouve pas de film dans la collec films qui correspond au titre des films dans le tableau filmsarray, il renvoie un console log
            if(data){
            await client.db().collection("exploitation").insertOne(
                {
                    title:film.title,
                    box_office_fr:film.box_office_fr,
                    box_office_us:film.box_office_us,
                    film_id:data._id
                }
            )} else{
                console.log(`Le film ${film.title} n'a pas été trouvé`)
            }
          }

      
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();