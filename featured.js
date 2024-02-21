// // JavaScript code
// async function fetchRandomRecipes() {
//     // const apiUrl = 'https://www.themealdb.com/api/json/v1/1/randomselection.php';
//     const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         displayRecipes(data.meals);
//     } catch (error) {
//         console.error('Error fetching random recipes:', error);
//     }
// }

// function displayRecipes(recipes) {
//     const featuredRecipesContainer = document.getElementById('featuredRecipes');

//     if (recipes) {
//         recipes.forEach(recipe => {
//             const recipeElement = document.createElement('div');
//             recipeElement.classList.add('recipe');
//             recipeElement.innerHTML = `
//                 <h3>${recipe.strMeal}</h3>
//                 <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
//                 <p>${recipe.strInstructions}</p>
//             `;
//             featuredRecipesContainer.appendChild(recipeElement);
//         });
//     } else {
//         featuredRecipesContainer.innerHTML = '<p>No featured recipes available</p>';
//     }
// }

// // Fetch random recipes when the page loads
// fetchRandomRecipes();
// JavaScript code




async function fetchRandomRecipes() {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayRecipes(data.meals);
        displayFixedRecipeImage(data.meals[0].strMealThumb);
    } catch (error) {
        console.error('Error fetching random recipes:', error);
    }
}

function displayRecipes(recipes) {
    const featuredRecipesContainer = document.getElementById('featuredRecipes');

    if (recipes) {
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerHTML = `
                <h3>${recipe.strMeal}</h3>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <p>${recipe.strInstructions}</p>
            `;
            featuredRecipesContainer.appendChild(recipeElement);
        });
    } else {
        featuredRecipesContainer.innerHTML = '<p>No featured recipes available</p>';
    }
}

function displayFixedRecipeImage(imageUrl) {
    const fixedRecipeImage = document.getElementById('fixedRecipeImage');
    fixedRecipeImage.src = imageUrl;
}

// Fetch random recipes when the page loads
fetchRandomRecipes();