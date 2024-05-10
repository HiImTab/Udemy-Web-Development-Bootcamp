
let input = prompt("What would you like to do?");

const todos = ['Lallala', 'yayyaya'];

while(input !== 'quit' && input !== 'q'){

    if(input === 'list'){
        for(let i = 0; i < todos.length; i++){
            console.log(`${i}: ${todos[i]}`);
        }
    }
    else if(input === 'new'){
        let newTodo = prompt("Enter a new todo:");
        todos.push(newTodo);
        console.log(`${newTodo} added to Todo list...`);
    }
    else if(input === 'delete'){
        let index = parseInt(prompt("Enter number of todo list to delete:"));
        if(!Number.isNaN(index)){
            //where to start splice, and how many to delete
            let deletedTodo = todos.splice(index, 1);
            //returns an array of deleted
            console.log(`Deleted ${deletedTodo[0]}...`);
        }
        console.log('Ummm wtf did you just enter? That isn\'t a number dummy...');
    }
    input = prompt("What would you like to do?");
}

console.log("All done");