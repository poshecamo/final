document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start
    };

    // Change color every 2 seconds with a smooth transition
    setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById("enter");
let askButton = document.getElementById("ask");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let item = document.getElementsByTagName("li");

function inputLength() {
    return input.value.length;
}

function listLength() {
    return item.length;
}

function createListElement(task) {
    let li = document.createElement("li"); // creates an element "li"
    li.appendChild(document.createTextNode(task)); // makes text from input field the li text
    ul.appendChild(li); // adds li to ul
    input.value = ""; // Reset text input field

    // START STRIKETHROUGH
    function crossOut() {
        li.classList.toggle("done");
    }
    li.addEventListener("click", crossOut);
    // END STRIKETHROUGH

    // START ADD DELETE BUTTON
    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    dBtn.addEventListener("click", () => {
        ul.removeChild(li);
    });
    li.appendChild(dBtn);
    // END DELETE BUTTON
}

function addTask(task) {
    let tasks = Array.from(ul.getElementsByTagName("li"));
    let duplicate = tasks.some(t => t.textContent.trim() === task.trim());

    if (duplicate) {
        alert("Task already exists!");
    } else {
        createListElement(task);
    }
}

function addListAfterClick() {
    if (inputLength() > 0) {
        addTask(input.value);
    }
}

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) { // this now looks to see if you hit "enter"/"return"
        addTask(input.value);
    }
}

function askUserForTasks() {
    let task;
    while (true) {
        task = prompt("Enter a new task (leave empty to stop):");
        if (!task) break; // Exit the loop if the user enters an empty string
        addTask(task);
    }
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
askButton.addEventListener("click", askUserForTasks);
