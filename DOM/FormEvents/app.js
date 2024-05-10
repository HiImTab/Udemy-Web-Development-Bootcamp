const form = document.querySelector('#shelterForm');
const input = document.querySelector('#catName');
const cats = document.querySelector('#cats');

console.log(input);


form.addEventListener('submit', function(e) {
    //so it doesn;t go to /shelter
    e.preventDefault(); //prevent default behavior(most common to do on a form)
    console.log(input.value);
    const catName = input.value;
    const newLi = document.createElement("li");
    //<li></li>
    newLi.innerText = catName;
    console.log(newLi);
    cats.append(newLi);
    //set input(text box) back to empty
    input.value = '';
})