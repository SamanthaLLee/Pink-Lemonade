var response = [];
const ingredients = [];
const resultsToDisplay = [];

var key = "";

//Food Conditions
const goodFoods = ["broccoli", "cauliflower", "kale", "cabbage", "brussel sprouts", "lettuce", "spinach", "swiss chard", "endives","beet greens", "romaine", "turnip", "kohlrabi", "bok choy",
"watercress", "collards", "kale", "mustard greens", "rutabaga", "celery", "parsley", "fennel", "carrots", "parsnip", "garlic", "onion", "shallots", "chives", "leek", "eggplant",
"tomato", "pumpkin", "squash", "cucumber", "muskmelon", "watermelon", "broccoli sprouts", "mustard greens", "horseradish", "potatoes", "apple", "pear", "arugula", "oranges", "grapefruit",
"lemons", "limes", "tangerines", "strawberries", "blueberries", "peaches", "yogurt", "lentils", "poultry", "peas", "chickpeas", "lima beans", "peanut",
"carob", "kidney beans", "mung beans", "pinto beans", "black-eyed peas", "eggs", "tofu", "tempeh", "edamame", "wheat", "rye", "oats", "rice", "corn", "bulgur", "barley", "green tea",
"kimchi", "miso", "sauerkraut", "parsley", "rosemary", "thyme", "tumeric", "ginger", "ground flaxseeds", "salmon", "mackerel", "sardines", "artic char"];

const badFoods = ["cheeses", "cream", "butter", "ice cream", "beef", "lamb", "organ meats", "hydrogenated oils", "olive oil", "avocado", "nuts", "seeds", "baked goods", "crackers",
"margarine", "alcohol", "hydrogenated oils", "sugary beverages", "tobacco smoke", "artificial sweetners", "cider", "spirits", "molluscs", "fried foods", "fast foods"]
		
const questionable = ["soy","soybeans", "fortified soymilk" ];
//Makes a call to the API with user's query, returns an array of recipes that match
function getRecipe(q){
	console.log(q);
	$.ajax({
		//Edit endpoint below to modify call
		url:"https://api.spoonacular.com/recipes/complexSearch?apiKey=99a01e3d7525405894929bfbec77ffa3&addRecipeInformation=true&addRecipeNutrition=true&number=10&query="+q,
		success: function(res) {
			response = res;
			//console.log(res.results);
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

	for(var i = 0 in response.results){
		// var ingredObject = getIngredients(response[i]);
		// response[i].score = ingredObject.score;
		response.results[i].score = getIngredients(response.results[i]);
		//console.log();
		//console.log(response.results[i]);
		resultsToDisplay.push(response.results[i]);
	}
	resultsToDisplay.sort(function(a,b) {
		return b.score-a.score;
	});
	
	console.log(resultsToDisplay);
	displayResults(resultsToDisplay);
}

//Gets list of ingredients from a given recipe
function getIngredients(recipe){
	var score = 0;
	var result = [];
	var goodIngredients = [];
	var badIngredients = [];
	var questionableIngred = [];
	var ingredientList = recipe.nutrition.ingredients;
	for(var i = 0 in ingredientList){
		//console.log(ingredientList[i]);
		if(goodFoods.includes(ingredientList[i].name)){
			score++;
			//goodIngredients.push(ingredientList[i].name);
		}else if(badFoods.includes(ingredientList[i].name)){
			score--;
			//badIngredients.push(ingredientList[i].name);
		}else if(questionable.includes(ingredientList[i].name)){
			//questionableIngred.push(ingredientList[i].name);
		}
	}
		//result.score = score;
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
		
		//console.log(score);
		
		return score;
}

//Displays results, post-pointing
function displayResults(resultsToDisplay){
	var i=0;
	var stop=5;
	for (i=0;i<resultsToDisplay.length;i++) {  
			var num = 1+i;
		 document.getElementById("results").innerHTML += "<br>"+num+". <a href='"+resultsToDisplay[i].sourceUrl+"'>" +resultsToDisplay[i].title+"</a> (score: "+resultsToDisplay[i].score+")";
	}
}
