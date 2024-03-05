const resulatQuestion20 = await db.collection('movies').aggregate([

    {$match: { 'actors.last_name' : 'Eastwood', 'actors.first_name' : 'Clint'}},

    {$project: {_id:0, title: 1, year: 1}}

]).toArray();


resulatQuestion20.forEach((movie, i)=> {

    console.log(`<${i+1}> - Titre du film ${movie.title}`)

} )