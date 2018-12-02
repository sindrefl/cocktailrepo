package no.sindre.barapplication.payload

import no.sindre.barapplication.models.Glass

class CocktailChangeRequest(
        val amounts: List<String>,
        val drinkId : Int,
        val ingredients: List<String>,
        val glass: Glass,
        val name: String,
        val recipe: String
)