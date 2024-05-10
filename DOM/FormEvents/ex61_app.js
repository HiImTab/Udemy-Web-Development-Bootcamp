// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');
const prod = document.querySelector('#product');
const qty = document.querySelector('#qty');
const list = document.querySelector('#list');


form.addEventListener('submit', function(e){
    
    e.preventDefault();
    const p = prod.value;
    const q = qty.value;
    
    const newLi = document.createElement('li');
    newLi.innerText = `${q} ${p}`;
    list.append(newLi); 
    //for udemy practice since append not supported
   /*  list.appendChild(newLi); */
    
    prod.value = '';
    qty.value = '';
})