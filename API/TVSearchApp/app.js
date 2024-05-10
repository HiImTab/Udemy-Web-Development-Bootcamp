const form = document.querySelector('#searchForm');

/*
The HTML <input> name Attribute is used to specify a name for an <input> element. 
It is used to reference the form-data after submitting the form or to reference the element 
in JavaScript
*/

form.addEventListener('submit', async function(e){
    e.preventDefault();
    /* console.dir(form); 
    console.log(form.elements.query.value);*/
    const searchTerm = form.elements.query.value;
   /*  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`) */
   const config = {params: {q: searchTerm, isFunny: 'tab'}}
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
    console.log(res.data[0].show.image.medium);
    displayShowImages(res.data);
    form.elements.query.value ="";
})

const displayShowImages = (shows) => {
    for(let i of shows){
        if(i.show.image){ //if the show has an image
            const img = document.createElement('img');
            img.src = i.show.image.medium;
            document.body.append(img);
        }
    }
}