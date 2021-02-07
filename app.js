// Search button event start

const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', function () {

    const itemName = document.getElementById('search-input').value;

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + itemName)
        .then(res => res.json())
        .then(data => {
            removePreviousItems();
            searchFoodItems(data);

        })

})
// Search button event end

// Search food item function start here
const searchFoodItems = items => {
    const foodMeals = items.meals;
    if (foodMeals) {
        items.meals.forEach(item => {
            const itemName = item.strMeal;
            const itemImg = item.strMealThumb;
            const itemId = item.idMeal;
            const mealItemDiv = document.createElement('div');
            mealItemDiv.className = 'col-md-3 item-collums'

            let cardHtml = `
                    <div onclick="getIngredientsMeasureInformation(${itemId})" class="card rounded-3 border-0" >
                        <img src="${itemImg}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h6 class="card-title food-title text-center">${itemName}</h6>
                        </div>
                    </div>
                  
                    `;
            mealItemDiv.innerHTML = cardHtml;


            const parentNode = document.getElementById('food-items');
            parentNode.appendChild(mealItemDiv);
        });

    }
    //  If not found any food item(condition return false)
    else {
        console.log("'not found'")

        const notFoundDiv = document.getElementById("not-found-div");
        notFoundDiv.style.display = 'block';
    }

}
// Search food item function end here


// Previous Items Remove function start here

function removePreviousItems() {
    document.getElementById('ingredient-section').innerText = "";
    const notFoundDiv = document.getElementById("not-found-div");
    notFoundDiv.style.display = 'none';
    const parentNode = document.getElementById('food-items');
    parentNode.innerText = "";
}

//Previous Items Remove function ends here


// ingredients item show function starts here
const getIngredientsMeasureInformation = id => {
    document.getElementById('ingredient-section').innerText = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const elements = Object.keys(meal);
            const strIngredientArray = [];
            const strMeasureArray = [];
            elements.forEach(element => {

                if (element.startsWith('strIngredient') && meal[element] != null && meal[element] != "") {
                    strIngredientArray.push(meal[element]);
                }
            });

            elements.forEach(element => {

                if (element.startsWith('strMeasure') && meal[element] != " " && meal[element] != "" && meal[element] != null) {
                    strMeasureArray.push(meal[element]);

                }
            });


            const showIngredientsSection = document.getElementById('ingredient-section');
            const ingredientItem = document.createElement('div')

            const informationHtml = `
        <div class="row d-flex justify-content-center-flex justify-content-center">
                <div class="col-md-5 informations">
                    <div class="info-image">
                        <img src="${meal.strMealThumb}" width="100%" alt="">
                    </div>
                  
                        <h1>${meal.strMeal}</h1><br>
                        <h5 >Ingredients</h5><br>

                    <div id="ingredient-list">
                  
                    </div>
                  
                </div>

         </div>
    
        `;
            ingredientItem.innerHTML = informationHtml;
            showIngredientsSection.appendChild(ingredientItem);


            const ingredientList = document.getElementById('ingredient-list');
            let ingredientInformations = " ";

            strIngredientArray.forEach((ingredient, index) => {
                const measure = strMeasureArray[index];
                console.log(measure, ingredient);

                ingredientInformations += `
            <p><i class="fa fa-check-square tick-icon" aria-hidden="true"></i> ${measure} ${ingredient} </p>

            `;

            });

            ingredientList.innerHTML = ingredientInformations;

        })
}

// ingredients item show function ends here
