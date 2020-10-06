var response = [];
const ingredients = [];
const resultsToDisplay = [];

//Food Conditions
const goodFoods = ["Broccoli", "Cauliflower", "Kale", "Cabbage", "Brussel Sprouts", "Lettuce", "Spinach", "Swiss Chard", "Endives","Beet greens", "Romaine", "Turnip", "Kohlrabi", "Bok Choy",
"Watercress", "Collards", "Kale", "Mustard Greens", "Rutabaga", "Celery", "Parsley", "Fennel", "Carrots", "Parsnip", "Garlic", "Onion", "Shallots", "Chives", "Leek", "Eggplant",
"Tomato", "Pumpkin", "Squash", "Cucumber", "Muskmelon", "Watermelon", "Broccoli Sprouts", "Mustard Greens", "Horseradish", "Potatoes", "Apple", "Pear", "Arugula", "Oranges", "Grapefruit",
"Lemons", "Limes", "Tangerines", "Strawberries", "Blueberries", "Peaches", "Yogurt", "Lentils", "Poultry", "Peas", "Chickpeas", "Lima Beans", "Peanut",
"Carob", "Kidney Beans", "Mung beans", "Pinto Beans", "Black-eyed Peas", "Eggs", "Tofu", "Tempeh", "Edamame", "Wheat", "Rye", "Oats", "Rice", "Corn", "Bulgur", "Barley", "Green tea",
"Kimchi", "Miso", "Sauerkraut", "Parsley", "Rosemary", "Thyme", "Tumeric", "Ginger", "Ground Flaxseeds", "Salmon", "Mackerel", "Sardines", "Artic Char"];

const badFoods = ["Cheeses", "Cream", "Butter", "Ice cream", "Beef", "Lamb", "Organ Meats", "Hydrogenated Oils", "Olive Oil", "Avocado", "Nuts", "Seeds", "Baked Goods", "Crackers",
"Margarine", "Alcohol", "Hydrogenated Oils", "Sugary beverages", "Tobacco Smoke", "Artificial Sweetners", "Cider", "Spirits", "Molluscs", "Fried foods", "Fast Foods"]
		
const questionable = ["Soy","Soybeans", "Fortified Soymilk" ]
		
//Makes a call to the API with user's query, returns an array of recipes that match
function getRecipe(q){
	console.log(q);
	$.ajax({
		//Edit endpoint below to modify call
		url:"https://api.spoonacular.com/recipes/complexSearch?apiKey=99a01e3d7525405894929bfbec77ffa3&addRecipeInformation=true&addRecipeNutrition=true&number=10&query="+q,
		success: function(res) {
			response = res;
			console.log(res.results);
			rankResults(res);
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
	
	response.forEach(function(element) {
  	element.score = 0;
	})

	for(var i = 0 in response){
		// var ingredObject = getIngredients(response[i]);
		// response[i].score = ingredObject.score;
		response[i].score = getIngredients(response[i]);
		resultsToDisplay.push(response[i]);
	}

	// resultsToDisplay.sort(function(a,b) {
	// 	return b.score-a.score;
	// });
	
	console.log(resultsToDisplay);
	
}

//Gets list of ingredients from a given recipe
function getIngredients(recipe){
	var score = 0;
	var result = [];
	var goodIngredients = [];
	var badIngredients = [];
	var questionableIngred = [];
	var ingredientList = recipe.ingredients;
	for(var i = 0 in ingredientList){
		if(goodFoods.includes(ingredientList[i])){
			score++;
			goodIngredients.push(ingredientList[i].name);
		}else if(badFoods.includes(ingredientList[i])){
			score--;
			badIngredients.push(ingredientList[i].name);
		}else if(questionable.includes(ingredientList[i])){
			questionableIngred.push(ingredientList[i].name);
		}
		
		result.score = score;
		// 
 		// var max = Math.max(goodIngredients.length,badIngredients.length,questionableIngred.length);
		// 
		// if(max == goodIngredients.length){
		// 	result.foods = goodIngredients;
		// 	result.category = "G";
		// 	return result;
		// }else if(max == badIngredients.length){
		// 	result.foods = badIngredients;
		// 	result.category = "B";
		// 	return result;
		// }else{
		// 	result.foods = questionableIngred;
		// 	result.category = "NA";
		// 	return result;
		// }

		// var master = [];
		// master.push(goodIngredients);
		// master.push(badIngredients);
		// master.push(questionableIngred);
		
		console.log(score);
		
		return score;
	}
}

//Displays results, post-pointing
function displayResults(id){
	//HTML modification to display resultsToDisplay
}
