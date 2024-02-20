const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe')
})


//get mealmlist that matches with the ingredients
function getMealList() {
    // // Show loading spinner
    // const loadingSpinner = document.getElementById('loadingSpinner');
    // loadingSpinner.style.display = 'block';

    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
    <div class="meal-item" data-id="${meal.idMeal}">
    <div class="meal-img">
        <img src="${meal.strMealThumb}" alt="food" height="260px">
    </div>
    <div class="meal-name">
        <h3>${meal.strMeal}</h3>
        <a href="#" class="recipe-btn">Get Recipe</a>
    </div>
</div>
    `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry we didn't find any meal";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;

        });

}
//get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

//create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions</h3>
<p>${meal.strInstructions}</p>
</div>
<div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="">
</div>
<div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
</div>  
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

// this code is for press enter to search
// Get the search input element
const searchInput = document.getElementById('search-input');

// Add an event listener for the "Enter" key
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Call the search function when Enter is pressed
        getMealList();
    }
});

// Function to  handle specific on home page API request and display the recipe details
function getRecipe(mealName) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    // Make the API request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the API request was successful
            if (data.meals && data.meals.length > 0) {
                const meal = data.meals[0];

                // Generate HTML for the specific meal
                const html = `
        <div class="meal-item" data-id="${meal.idMeal}">
          <div class="meal-img">
            <img src="${meal.strMealThumb}" alt="food" height="260px">
          </div>
          <div class="meal-name">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strInstructions}</p>
            <!-- Add more details as needed -->
          </div>
        </div>
      `;

                // Set the content of the HTML element with the class 'mealList'
                mealList.innerHTML = html;
                mealList.classList.remove('notFound');
            }else {
                const errorMessage = "No meals found for the entered name. Please try again.";
                mealList.innerHTML = errorMessage;
                mealList.classList.add('notFound');
            } 
        
        })
        .catch(error => {
            // Handle errors that may occur during the API request
            console.error('Error fetching meal details:', error);
            const errorMessage = "An error occurred while fetching meal details. Please try again later.";
            mealList.innerHTML = errorMessage;
            mealList.classList.add('notFound');
        });
    }

    // const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    // // Make the API request
    // fetch(apiUrl)
    //     .then(response => response.json())
    //     .then(data => {
    //         // Check if the API request was successful
    //         let html = "";
    //         if (data.meals && data.meals.length > 0) {

    //             // Get the first meal (assuming there is only one result)
    //             const meal = data.meals[0];

    //             // Display the recipe details (customize this part based on your needs)
    //             alert(`Recipe for ${meal.strMeal}:\n${meal.strInstructions}`);
    //         } else {
    //             alert(`Recipe not found for ${mealName}. Please try again.`);
    //         }
    //     })

    //     .catch(error => {
    //         console.error('Error fetching recipe:', error);
    //         alert('An error occurred while fetching the recipe. Please try again later.');
    //     });
// }





// Example: Attach the click event to the "Get Recipe" buttons for each meal item
const recipeButtons = document.querySelectorAll('.recipe-btn');
if (recipeButtons) {
    recipeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default behavior of the anchor tag
            const mealName = button.dataset.meal; // Get the meal name from the data attribute
            getRecipe(mealName);
        });
    });
}

//js for contact  button in the navbar  
document.addEventListener('DOMContentLoaded', function () {
    // Get the "Contact" button from the navbar
    const contactButton = document.getElementById('contactButton');

    // Add a click event listener to the "Contact" button
    if (contactButton) {
        contactButton.addEventListener('click', function (event) {
            // Prevent the default behavior of the link
            event.preventDefault();

            // Get the target element (in this case, the element with id "contact")
            const targetElement = document.getElementById('contact');

            // Scroll to the target element smoothly
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    }
});











