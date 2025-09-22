/* === User Input Logic === */
// Defines variables "userInput" and "displayArea" as corresponding HTML elements.
let userInput = document.getElementById("user-input");
let displayArea = document.getElementById("display-area");

// Put user cursor in "user-input" element on boot.
userInput.focus();

// Adds an event listener that listens for a key press.
userInput.addEventListener("keydown", function(event) {
    // Checks if the key pressed is the "Enter" key
    if (event.key === "Enter") {
        // Defines variable "userText" as the value of variable "userInput"
        let userText = userInput.value;
        
        // Checks if the "userText" is empty. If not, then proceed.
        if (userText !== "") {
            // Assigns variable "newListItem" as a created HTML "list item" element.
            let newListItem = document.createElement("li");

            // Use the value of the "userText" variable and make it the text content of the variable "newListItem."
            newListItem.textContent = userText;
			
			/* === Remove Individual List Item === */
			// Adds a remove button for each individual list item.
            // Creates a variable called "removeButton". Within that variable, creates an HTML span element.
            let removeButton = document.createElement("span");
			
			// Defines the "textContent" property of the "removeButton" span HTML element as "x".
            removeButton.textContent = "x";
			
			// Adds the CSS class "remove-item" to "removeButton"
            removeButton.classList.add("remove-item");
            
            // Gives a child element, "removeButton", to the parent element, "newListItem." This means that removeButton is nested within the
			// newListItem element.
            newListItem.appendChild(removeButton);

            // Makes the button listen for the event of a "click."
            removeButton.addEventListener("click", function() {
				// Refers to this element, "removeButton", and removes its parent element (which includes "removeButton" itself.)
                this.parentElement.remove();
            });
			

            // Puts the content of the variable "newListItem" at the beginning of the display area.
            displayArea.append(newListItem);

            // Replace whatever is in the text box with nothing.
            userInput.value = "";
        }
    }
});

/* ==================== */

/* === Reset Button Logic === */

// Creates "resetButton" variable that refers to the "reset-button" element.
let resetButton = document.getElementById("reset-button");

// Adds event listener that listens for if the reset button is clicked.
resetButton.addEventListener("click", function() {
    // Remove all list items within the "displayArea" element.
    displayArea.innerHTML = "";
});

/* ==================== */

/* === Choose Button Logic ===*/

// Assigns the audio file "cm-positive.mp3" to the "cmPositive" variable
let cmPositive = new Audio('./cm-positive.mp3');

// Assigns the audio file "cm-negative.mp3" to the "cmNegative" variable
let cmNegative = new Audio('./cm-negative.mp3');

//
let muteAudioCheckbox = document.getElementById("mute-audio");

// Assigns HTML element "choose-button" as the "chooseButton" variable.
let chooseButton = document.getElementById("choose-button");

// Defines variable "autoRemoveCheckbox" as the "auto-remove" HTML element.
let autoRemoveCheckbox = document.getElementById("auto-remove");

// Creates a variable called "intervalId", but does not give it a value yet.
let intervalId;
// Creates variable "currentIndex" and gives it a value of 0.
let currentIndex = 0;

// Cycling Animation

// Creates a function called "startCycling" that can be called upon.
function startCycling() {
	//
	let overlay = document.getElementById("overlay");
	overlay.classList.add("active");
    // Creates a variable that contains all of the list items within the "displayArea" element and also tagged with "li."
    let listItems = displayArea.getElementsByTagName("li");
    
    // Checks to see if the number of list items is strictly 0. If it is strictly 0, then the function stops.
    if (listItems.length === 0) {
        return;
    }
    
    // Defines the "intervalId" variable as the result of the "setInterval" function.
    // The "setInterval" function is a function that runs repeatedly with a certain user-defined amount of time between each run or "call."
    intervalId = setInterval(function() {
        // Removes the CSS class "cycling-highlight" from a singular list item within the "listItems" variable.
        listItems[currentIndex].classList.remove("cycling-highlight");
        
        // Increase the value of "currentIndex" by 1, which advances the presently highlighted list item to the next list item.
        currentIndex++;
        
        // Uses a conditional check (if currendIndex is greater than or equal to the total number of listItems) to move currentIndex back to
        // the top of the list.
        if (currentIndex >= listItems.length) {
            currentIndex = 0;
        }
        
        // Adds the "cycling-highlight" CSS class to the list item that currentIndex points to.
        listItems[currentIndex].classList.add("cycling-highlight");
    }, 100) // Sets the repeating interval of the "setInterval" function to 100 milliseconds. Dictates how fast the cycling-highlight moves between
	// items.
    
    // Uses the "setTimeout" function to run the code within the brackets a single time.
    setTimeout(function() {
        // Stops the "intervalId" timer that's currently running.
        clearInterval(intervalId);
        // Removes the CSS class "cycling-highlight" from the list item that currentIndex is pointing to.
        listItems[currentIndex].classList.remove("cycling-highlight");
        
        // Applies the grey "cycling-highlight" to every list item.
        // Creates a loop that will run if the variable "i" is less than the total amount of "listItems" (represented by the "length" property), and adds 1 to "i" after each loop. This means that the loop will
        // stop after it reaches the last list item.
        for (let i = 0; i < listItems.length; i++){
            // Adds the "cycling-highlight" CSS class to all list items one at a time.
            listItems[i].classList.add("cycling-highlight");
        }
        
        // Uses the "setTimeout" function to run the code within the brackets a single time.
        setTimeout(function() {
            
            // Removes the "cycling-highlight" from each listItem.
            // Creates a loop that runs once for each listItem.
            for (let i = 0; i < listItems.length; i++){
                // Remove the "cycling-highlight" CSS class from whatever listItem that the loop is currently on.
                listItems[i].classList.remove("cycling-highlight");
            }
            
            // Generates a random number that can be used to select a list item.
            let randomIndex = Math.floor(Math.random() * listItems.length);
            
            // Gives the list item that randomIndex points to the CSS class of "chosen-item"
            listItems[randomIndex].classList.add("chosen-item");
			
			// Auto-remove checkbox 
			// Checks if the auto-remove checkbox is checked or not. If it is, run the function.
			if (autoRemoveCheckbox.checked) {
				// A single time after 2 seconds, remove the list item at the position, selected by "randomIndex", from the list (listItems.)
				setTimeout(function() {
					listItems[randomIndex].remove();
				}, 1500); // 1500 milliseconds = 1.5 seconds
				listItems[randomIndex].classList.remove("chosen-item");
				listItems[randomIndex].classList.add("auto-remove");
			}
			
			setTimeout(function(){
			//
				overlay.classList.remove("active");
				//
				userInput.focus();
			}, 1500);
			
        }, 1000) // Closes a setTimeout function at 1000 milliseconds
        
    }, 4000) // CLoses a setTimeout function at 4000 milliseconds.
}

// An event listener that listens to if the chooseButton was clicked.
chooseButton.addEventListener("click", function() {
    // Removes the "chosen-item" class from each list item to make sure the previous selection is cleared before making a new one.
    let listItems = displayArea.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++){
        listItems[i].classList.remove("chosen-item");
    }
    
	// If the auto-remove checkbox is UNCHECKED, play "cmPositive.mp3"
	if (!autoRemoveCheckbox.checked) {
		cmPositive.play();
	}
	
	//
	if (autoRemoveCheckbox.checked) {
		cmNegative.play();
	}
	
    // Calls/executes the startCycling function
    startCycling();
});
/* ==================== */

/* === Mute Button Logic === */
//
muteAudioCheckbox.addEventListener("change", function() {
	//
	if (this.checked) {
		cmPositive.muted = true;
		cmNegative.muted = true;
	} else {
		//
		cmPositive.muted = false;
		cmNegative.muted = false;
	}
});
/* ==================== */