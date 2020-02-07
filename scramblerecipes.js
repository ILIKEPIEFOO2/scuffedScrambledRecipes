events.listen("server.datapack.recipes",function(event){
	var recipes=event.getAll().list;
	var recipeResults=[];
	var originalRecipe=[];
	for (recipe in recipes){//Create list of results.
		var result=recipes[recipe].toJson().remove('result');
		if(result){
			recipeResults.push(result);
		}else{
			//console.warn("Recipe does not have result: "+recipes[recipe].toJson());
		}
	}
	for (recipe in recipes){
		var r=recipes[recipe]; // Get Recipe
		var recipeJson=r.toJson(); // Convert recipe to Json.
		var randomResult=recipeResults.splice(Math.round(Math.random(recipeResults.length)),1)[0]; //Get a random recipe result.
		if(randomResult){ //Check if 
			recipeJson.remove('result'); //Remove old result
			recipeJson.remove('group'); //Remove group to hopefully stop old recipes from being weird.
			recipeJson.add('result',randomResult); //Add our random recipe result.
			var fin=r.getType().create(recipeJson); //Create our recipe so it is no longer a JSON.
			fin.id=null; //Remove ID so it is KubeJS auto generated.
			event.addRecipe(fin,r.getType(),null); //Add recipe.
			event.remove(r.id); //Remove original recipe.
		}
	}
	// Remove all old recipes.
});