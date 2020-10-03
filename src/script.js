var response = [];

function getRecipe(q){
	console.log(q);
	// $.ajax({
	// 	url:"https://api.spoonacular.com/recipes/complexSearch?apiKey=99a01e3d7525405894929bfbec77ffa3&addRecipeInformation=true&addRecipeNutrition=true&number=1&query="+q,
	// 	success: function(res) {
	// 		console.log(res.results[0]);
	// 		//document.getElementById("output").innerHTML="<h1>"+res.results[0].title+"</h1><br><img src='"+res.results[0].image+"' width='400' /><br>Ready in "+res.results[0].readyInMinutes+" minutes"
	// 		//getSource(res.results[0].id)
	// 	}
	// });
}

function getSource(id){
	$.ajax({
	url:"https://api.spoonacular.com/recipes/"+id+"/information?apiKey=99a01e3d7525405894929bfbec77ffa3",
	success: function(res) {
		document.getElementById("sourceLink").innerHTML=res.sourceUrl
		document.getElementById("sourceLink").href=res.sourceUrl
	}
	});
}

function getIngredients(id){
	$.ajax({
	url:"https://api.spoonacular.com/recipes/"+id+"/information?apiKey=99a01e3d7525405894929bfbec77ffa3",
	success: function(res) {
		//set variables here, model off of getSource
	}
	});
}
