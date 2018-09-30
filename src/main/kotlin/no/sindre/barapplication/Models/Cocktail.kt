package no.sindre.barapplication.Models

enum class Glass{
    HIGHBALL, COCKTAIL, ROCKS, COFFEE, COLLINS, WINE, BEER,PARFAIT,PINT,MASON,CHAMPAGNE,SHOT,PUNCH,PITCHER,MARGARITA_COUPETTE,OLD_FASHIONED,MARTINI,COUPE,NICK,BALLOON,HURRICANE,MARGARITA,WHITE,WHISKEY,BRANDY,IRISH,CORDIAL,COPPER,JAR,POUSSE
}

data class Cocktail(var name : String,var glass : Glass, var category: Category, var ingredients : List<Ingredient>, var amounts : List<String>, var description : String, var recipe :String){
    var alcoholic = true
    var image_link : String? = null

}