package no.sindre.barapplication.models

import javax.annotation.Generated

enum class Glass{
    HIGHBALL, COCKTAIL, COFFEE, COLLINS, WINE, BEER,PARFAIT,PINT,MASON,CHAMPAGNE,SHOT,PUNCH,PITCHER,MARGARITA_COUPETTE,OLD_FASHIONED,MARTINI,COUPE,NICK,BALLOON,HURRICANE,MARGARITA,WHITE,WHISKEY,BRANDY,IRISH,CORDIAL,COPPER,JAR,POUSSE
}

data class Cocktail(var name : String,
                    var glass : Glass,
                    var category: Category,
                    var ingredients : List<Ingredient>,
                    var amounts : List<String>,
                    var description : String,
                    var recipe :String){
    @Generated
    var cocktail_id : Int? = null

    var alcoholic = true
    var image_link : String? = null

}