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
    .catch(error => {
        console.log('Fetch Error :-S', error);
        notFound();
    })
})

const addFoodItems = items => {
    // console.log(items.meals)
    const foodMeals = items.meals;
    
    for (let i = 0; i < foodMeals.length; i++) {
        const item = foodMeals[i];
        const itemName = item.strMeal;
        const itemImg = item.strMealThumb;
        const mealItemDiv = document.createElement('div');
        mealItemDiv.className = 'col-md-3 item-collums'
        // style="width: 18rem;
                let cardHtml = `
                <div class="card rounded-3 border-0" >
                    <img src="${itemImg}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h6 class="card-title food-title text-center">${itemName}</h6>
                    </div>
                </div>
              
                `
                mealItemDiv.innerHTML = cardHtml;

        // console.log(meals[i].strMeal)
        // const item = foodMeals[i];
        // // console.log(item);
        // const itemName = item.strMeal;
        // console.log(itemName);
        const parentNode = document.getElementById('food-items');
        // let foodName = document.createElement('h2');
        // foodName.innerText = itemName;
        // console.log(foodName);
        parentNode.appendChild(mealItemDiv);
    }
}

function removePreviousItems(){
    const parentNode = document.getElementById('food-items');
    parentNode.innerText = "";
} 

function notFound() {
    const mealItemDiv = document.createElement('div');
            mealItemDiv.className = 'col-md-3 item-columns';
            const notFoundCard = `
            <div class="card" style="width: 18rem;">
            <img src="./images/undraw_empty_xct9.svg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Not Found!</h5>
                <p class="card-text">Please Try Again With Correct Keyword!</p>
            </div>
            </div>
             `;
             const parentNode = document.getElementById('food-items');
             parentNode.appendChild(mealItemDiv);
}
// function consoleSomething(){
//     console.log("clicked");
// }