var response = [];
var ingredients = [];
var resultsToDisplay = [];
var goodFoods = ["Broccoli", "Cauliflower", "Kale", "Cabbage", "Brussel Sprouts", "Lettuce", "Spinach", "Swiss Chard", "Endives","Beet greens", "Romaine", "Turnip", "Kohlrabi", "Bok Choy",
"Watercress", "Collards", "Kale", "Mustard Greens", "Rutabaga", "Celery", "Parsley", "Fennel", "Carrots", "Parsnip", "Garlic", "Onion", "Shallots", "Chives", "Leek", "Egglant",
"Tomato", "Pumpkin", "Squah", "Cucumber", "Muskmelon", "Watermelon", "Broccoli Sprouts", "Mustard Greens", "Horseradish", "Potatos", "Apple", "Pear", "Arugula", "Oranges", "Grapefruit",
"Lemons", "Limes", "Tangerines", "Strawberries", "Blueberries", "Peaches", "Fortified Soymilk", "Yogurt", "Lentils", "Poultry", "Soybeans", "Peas", "Chickpeas", "Lima Beans", "Peanut",
"Carob", "Kidney Beans", "Mung beans", "Pinto Beans", "Black-eyed Peas"];

//Makes a call to the API with user's query, returns an array of recipes that match
function getRecipe(q){
	console.log(q);
	$.ajax({
			//Edit endpoint below to modify call
		url:"https://api.spoonacular.com/recipes/complexSearch?apiKey=99a01e3d7525405894929bfbec77ffa3&addRecipeInformation=true&addRecipeNutrition=true&number=1&query="+q,
		success: function(res) {
			response = res;
			console.log(res.results[0]);
			//document.getElementById("output").innerHTML="<h1>"+res.results[0].title+"</h1><br><img src='"+res.results[0].image+"' width='400' /><br>Ready in "+res.results[0].readyInMinutes+" minutes"
			//getSource(res.results[0].id);
		}
	});
}

//Gets the source of the recipe by making another API call using the id fetched from getRecipe()
//The function was from the tutorial but we'll still want to use it, probably.
function getSource(id){
	$.ajax({
	url:"https://api.spoonacular.com/recipes/"+id+"/information?apiKey=99a01e3d7525405894929bfbec77ffa3",
	success: function(res) {
		document.getElementById("sourceLink").innerHTML=res.sourceUrl
		document.getElementById("sourceLink").href=res.sourceUrl
	}
	});
}

//Applies point system to the API response
function rankResults(response){
	// global var response is the full JSON response
	// we don't need to call the api here
	// go through each element in response, call getIngredients
	// add recipe object WITH SCORE to resultsToDisplay
	// sort resultsToDisplay based on score
	
}

//Gets list of ingredients from a given recipe
function getIngredients(recipe){
	// we don't need to call the api here, just parse recipe
	// suggestions: apply point system here and return a number
}

//Displays results, post-pointing
function displayResults(id){
	//HTML modification to display resultsToDisplay
}
