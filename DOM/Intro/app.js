//Selecting*************

//older wayish (not as common to use)
//getElementById (only gives us one object/element)

//***********document is an object that’s made available by the browser**********
//do in console f12
const banner = document.getElementById('banner');
//console.dir(banner);  **************************************


//getELementsByTagName (selects more than one element)
const allImages = document.getElementsByTagName('img');
//returns (an HTML collection)what looks like an array but isn't
//consists of objects(elements inside HTML collection) called Element
//console.dir(allImages[1]);

//look at output in browser console
for(let img of allImages){
    console.log(img.src);
    //img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Partridge_Silkie_hen.jpg/900px-Partridge_Silkie_hen.jpg"
} 

//getELementsByClassName (selects more than one element)
console.log(document.getElementsByClassName("square"));

const sqImgs = document.getElementsByClassName('square');

/* for(let img of sqImgs){
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg';
} */


//BETTER WAY TO SELECT ELEMENTS*************************************
//query selector (combo of all 3^^^, can select by h1, #red, .big (like css))
//only gives us the first match*
console.log(document.querySelector('p'));
//by id
console.log(document.querySelector('#banner'));
//by class
console.log(document.querySelector('.square'));
//get 2nd img on document 
console.log(document.querySelector('img:nth-of-type(2)'));

//finding an attribute  (attribute selector)
/*select all a elements where the title
attribute is set to "Java"*/
console.log(document.querySelector('a[title="Java"]'));

//returns a collection (not just the 1st match)
console.log(document.querySelectorAll('p'));

//descentdent selector (get all anchor tags in a p)
console.log(document.querySelectorAll('p a'));

//-------------------------------------------------------------
//doesn't show things that are hidden
console.log(document.querySelector('p').innerText);
/* document.querySelector('p').innerText = "uhhhh wut did I just do";  */

//returns every element in this element(p) (even hidden things (if display is set to none))
console.log(document.querySelector('p').textContent);

const allLinks = document.querySelectorAll('a');

for(let link of allLinks){
    link.innerText = "I AM A LINK!!!";
}

console.log(document.querySelector('h1').innerHTML);
//can actually read html using innterHTML
document.querySelector('h1').innerHTML = '<i>KAKAKKAKA</i>';
document.querySelector('h1').innerHTML += '<sup>lololololol</sup>';
//uncludes contents even all of the HTML tags
console.log(document.querySelector('p').innerHTML);

//-----------------------------------------------------------
//attributes

console.log(document.querySelector('#banner').id);

const firstLink = document.querySelector('a');

//most of the time there won't be a difference but with href there is
//diff between these two
//goes to js object
console.log(firstLink.href);
//this one just takes the text between the quotes href=""
console.log(firstLink.getAttribute('href'));

firstLink.setAttribute('href', "http://www.google.com");

//console.log(document.querySelector('input[type="text"]'));
const input = document.querySelector('input[type="text"]');
console.log(input.type);
input.type = "color";
input.setAttribute('type', 'text');

//---------
const h1 = document.querySelector("h1");
/* h1.style.textAlign */

//get style of h1 element
console.log(window.getComputedStyle(h1));
console.log(window.getComputedStyle(h1).fontSize);
//h1.style only works if you have in html: <h1 style="color: magenta"></h1>
//not a preferred way
/* h1.style.color = "olive";  */ //overrides magenta with olive

for(let link of allLinks){
    link.style.color = "#006c68"
    link.style.textDecorationColor = "magenta";
    link.style.textDecorationStyle = 'wavy';
}

/* const i = document.querySelector('img');
i.style.borderRadius */

//------------------------- CLASS LIST

console.log(document.querySelector('h2'));
const h2 = document.querySelector('h2');
console.log(h2.getAttribute('class'));

//to add two classes (kind of annoying, but there is an easier way)
/* h2.setAttribute('class', 'purple');
let curClasses = h2.getAttribute('class');
h2.setAttribute('class', `${curClasses} border`); */

h2.classList.add('purple'); 
h2.classList.add('border');
console.log(h2.getAttribute('class'));
h2.classList.remove('border');
console.log(h2.classList.contains('border'));  //returns false cause it doesn't contain border

h2.classList.toggle('purple'); //toggles purple off
h2.classList.toggle('purple'); //toggles purple back on

//------------------------------------PARENTS, CHILDREN, SIBLING

const firstBold = document.querySelector('b');
firstBold.parentElement; //goes to parent which is p
firstBold.parentElement.parentElement; //goes to parent of p which is body
firstBold.parentElement.parentElement.parentElement; //goes to route html element

const paragraph = firstBold.parentElement;
console.log(paragraph.children);

const sqImg = document.querySelector('.square');

console.log(sqImg.parentElement);
console.log(sqImg.nextSibling); //gives text nodes (because new lines are either side) (same for prev sibling)
console.log(sqImg.nextElementSibling); //gives next img (what you expect it to do)


//--------------------------------CREATE ELEMENT
const newImg = document.createElement('img'); //creates empty img

newImg.src = "https://media.istockphoto.com/photos/curious-cat-crawling-into-a-bag-picture-id1352397634?b=1&k=20&m=1352397634&s=170667a&w=0&h=Sp00kPZi-lm6w8kdgN0oCSC7x16RLuBMJfjCsAOdfeU="

//1st way to append
//append to page (append to last child of the body)
document.body.appendChild(newImg);
newImg.classList.add('square');

const newH3 = document.createElement('h3');
newH3.innerText = 'meow meow ima cow';
document.body.appendChild(newH3);

//2nd way to append (more flexible)
const p = document.querySelector('p');
p.append('i am a new thingy that is added using js', '...lallalalalalalala');

const newB = document.createElement('b');
newB.append('Hi');
p.prepend(newB);

const newH2 = document.createElement('h2');
newH2.append("Chickens are bacawkesome!");

h1.insertAdjacentElement('afterend', newH2); 
console.log(h1.nextElementSibling);

const new2H3 = document.createElement('h3');
new2H3.innerText = 'yayaya';
h1.after(new2H3);

//-----------------------------------------REMOVE

//more tedious/older
const firstLi = document.querySelector('li');
firstLi.parentElement.removeChild(firstLi);

//recent/newer/more flexible/ not compatible w/ IE (internet explorer)
const img = document.querySelector('img');
img.remove();
