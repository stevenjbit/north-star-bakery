// Array to manage the favorite items data
let favoriteItemsArray = [];

// Function to load favorites from localStorage when the page opens
function loadFavorites() {
    const storedFavorites = localStorage.getItem('bakeryFavorites');
    
    if (storedFavorites) {
        // Convert the string back into an array of objects
        favoriteItemsArray = JSON.parse(storedFavorites);
        renderFavorites();
    }
}

// Function to update the page dynamically with the favorites list
function renderFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    
    // Only run this if we are on the products.html page
    if (!favoritesList) return; 
    
    favoritesList.innerHTML = ''; // Clear the current list
    
    // Loop through the array and create a list item for each favorited object
    for (let i = 0; i < favoriteItemsArray.length; i++) {
        let listItem = document.createElement('li');
        listItem.textContent = favoriteItemsArray[i].name;
        favoritesList.appendChild(listItem);
    }
}

// Function triggered when the user clicks "Add to Favorites"
function addToFavorites(itemName) {
    // Object to store the specific product's data
    const productObject = { name: itemName };
    
    // Add the new object to the array
    favoriteItemsArray.push(productObject);
    
    // Save the updated array to localStorage as a string
    localStorage.setItem('bakeryFavorites', JSON.stringify(favoriteItemsArray));
    
    // Dynamically update the page
    renderFavorites();
    
    // Provide a small alert to confirm the interaction
    alert(itemName + " was added to your favorites!");
}


// --- TOUCHSTONE 4: FORM VALIDATION ---

// Wait for the HTML to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // Automatically attempt to load favorites (will only show on products page)
    loadFavorites(); 

    const contactForm = document.getElementById('contactForm');
    
    // Only run validation if the form exists on the current page
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // 1. Clear any previous error messages
            document.getElementById('emailError').textContent = '';
            document.getElementById('messageError').textContent = '';

            // 2. Validate Email format (must contain an @ symbol)
            const emailValue = document.getElementById('emailInput').value;
            if (!emailValue.includes('@')) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address containing an @.';
                isValid = false;
            }

            // 3. Validate Message length (must be at least 10 characters)
            const messageValue = document.getElementById('messageInput').value;
            if (messageValue.length < 10) {
                document.getElementById('messageError').textContent = 'Your message must be at least 10 characters long.';
                isValid = false;
            }

            // 4. Prevent form submission if any validation failed
            if (!isValid) {
                event.preventDefault(); 
            }
        });
    }
});
