const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', function(){
    
    const itemName = document.getElementById('search-input').value;
    // console.log(itemName);

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+itemName)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        removePreviousItems();
        addFoodItems(data);

    })
    
})

const addFoodItems = items => {
    // console.log(items.meals)
    const foodMeals = items.meals;
    if(items.meals){
console.log(items.meals);
        items.meals.forEach(item => {
            // const item = foodMeals[i];
            const itemName = item.strMeal;
            const itemImg = item.strMealThumb;
            const itemId = item.idMeal;
            const mealItemDiv = document.createElement('div');
            mealItemDiv.className = 'col-md-3 item-collums'
            // style="width: 18rem;
                    let cardHtml = `
                    <div onclick="getIngredientsAndMeasure(${itemId})" class="card rounded-3 border-0" >
                        <img src="${itemImg}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h6 class="card-title food-title text-center">${itemName}</h6>
                        </div>
                    </div>
                  
                    `
                    mealItemDiv.innerHTML = cardHtml;
    
            
            const parentNode = document.getElementById('food-items');
            parentNode.appendChild(mealItemDiv);
        });

       


    }
    else{
        console.log("'not found'")
        
        const notFoundDiv = document.getElementById("not-found-div");
        notFoundDiv.style.display = 'block';
    }
    
}

function removePreviousItems(){
    document.getElementById('ingredient-section').innerText = "";
    const notFoundDiv = document.getElementById("not-found-div");
    notFoundDiv.style.display = 'none';
    const parentNode = document.getElementById('food-items');
    parentNode.innerText = "";
} 

// ingredients item show
const getIngredientsAndMeasure = id => {
    document.getElementById('ingredient-section').innerText = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        const myMeal = data.meals[0] ;
        const keys = Object.keys(myMeal);

        const ingredientsArray = [];
        const measureArray = [];
        keys.forEach(key => {
            
            if (key.startsWith('strIngredient')  && myMeal[key] != null && myMeal[key] != "" ) {

                ingredientsArray.push(myMeal[key])
            }
        });
        
        keys.forEach(key => {
            
            if (key.startsWith('strMeasure') && myMeal[key] != "" && myMeal[key] != null && myMeal[key] != " " ) {

                measureArray.push(myMeal[key])
            }
        });

        console.log(ingredientsArray);
        console.log(measureArray);

        const showIngredientsSection = document.getElementById('ingredient-section');
        const ingredientItem = document.createElement('div')

        const card = `
        <div class="row d-flex justify-content-centerd-flex justify-content-center">
              <div class="col-md-5 informations">
                  <div class="info-image">
                      <img src="${meal.strMealThumb}" width="100%" alt="">
                  </div>
                  
                  <h1>${meal.strMeal}</h1><br>
                  <h5 >Ingredients</h5><br>

                  <div id="ingredient">
                  
                        <p><i class="fa fa-check-square tick-icon" aria-hidden="true"></i> TEST </p>

                    </div>
                  
              </div>

              

          </div>
    
    
    
        `
        ingredientItem.innerHTML = card;
        showIngredientsSection.appendChild(ingredientItem);


        const ingredientList = document.getElementById('ingredient');
        let ingredientCard = ``;

        ingredientsArray.forEach((ingredient , index) => {
            const measure = measureArray[index];
            console.log(measure, ingredient);

            ingredientCard += `
            <p><i class="fa fa-check-square tick-icon" aria-hidden="true"></i> ${measure} ${ingredient} </p>

            `
              
        });

        ingredientList.innerHTML = ingredientCard;

        console.log(ingredientCard);
        


    })
}

// getIngredientsAndMeasure(52771);

