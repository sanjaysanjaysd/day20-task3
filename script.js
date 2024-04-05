// Function to fetch meal data from the MealDB API based on category
async function fetchMealsByCategory(category) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error("Error fetching meal data:", error);
      return [];
    }
  }
  
  // Function to display meals on the webpage based on category
  async function displayMealsByCategory(category) {
    const mealsContainer = document.getElementById("mealContainer");
    const meals = await fetchMealsByCategory(category);
  
    // Clear previous meals
    mealsContainer.innerHTML = "";
  
    // Display each meal
    meals.forEach((meal) => {
      const mealCard = document.createElement("div");
      mealCard.classList.add("col-md-4");
  
      const cardContent = `
              <div class="card">
                  <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                  <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">Category: ${meal.strCategory}</p>
                  </div>
              </div>
          `;
      mealCard.innerHTML = cardContent;
      mealsContainer.appendChild(mealCard);
    });
  }
  
  // Event listener for the category select dropdown
  document
    .getElementById("categorySelect")
    .addEventListener("change", function () {
      const selectedCategory = this.value;
      displayMealsByCategory(selectedCategory);
    });
  
  // Call the displayMealsByCategory function when the page loads with a default category
  window.onload = () => displayMealsByCategory("Beef"); // Default category: Beef