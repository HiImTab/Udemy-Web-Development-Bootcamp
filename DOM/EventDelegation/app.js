const form = document.querySelector('#shelterForm');
const input = document.querySelector('#catName');
const cats = document.querySelector('#cats');
const lis = document.querySelectorAll('li');

cats.addEventListener('click', function(e){
    console.log('click on ul');
    console.log(e); //look at target (refers to target/li that was clicked on)

    //e.target.remove();
    //if target is LI, remove
    //in a boolean if it not li/if false, then the right side of && will not run
    e.target.nodeName == 'LI' && e.target.remove();
})

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