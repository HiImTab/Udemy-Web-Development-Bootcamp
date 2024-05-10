var client = new petfinder.Client({apiKey: "5dzkcg6fNICN3Udu5eCeygVWQqZLiNXJU1G4bMlK5vzNM5JsQP", 
secret: "lXkzyCf2JXXByN5bkgZoy8f6uYCXZsnMPM9uaLy8"});



 client.animal.search({location: "Phoenix, AZ"})
    .then(function (response) {
        // Do something with `response.data.animals`
        console.log(response);
    })
    .catch(function (error) {
        // Handle the error
    });   



/* client.organization.search({location: "Phoenix, AZ"})
  .then(resp => {
    // Do something with resp.data.organizations
    console.log(resp);
  }); */


/*     async function showAnimals(animalType, searchBreed) {
        let page = 1;
        do {
          apiResult = await client.animal.search({
            type: animalType,
            breed: searchBreed,
            page,
            limit: 100,
          });
          let dogIdx = (page - 1) * 100;
          apiResult.data.animals.forEach(function(animal) {
            console.log(` -- ${++dogIdx}: ${animal.name} id: ${animal.id} url: ${animal.url}`);
          });
      
          page++;
        } while(apiResult.data.pagination && apiResult.data.pagination.total_pages >= page);
      }
      
      (async function() {
        await showAnimals("Dog", "Husky");
      })(); */