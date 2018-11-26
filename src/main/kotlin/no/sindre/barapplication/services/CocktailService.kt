package no.sindre.barapplication.services


import no.sindre.barapplication.models.*
import no.sindre.barapplication.repositories.CocktailRepository
import no.sindre.barapplication.repositories.IngredientsRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service


@Service
class CocktailService(val cocktailRepository: CocktailRepository,
                      val ingredientsRepository: IngredientsRepository,
                      val ingredientsService: IngredientsService) {

    val regex = Regex("[^a-zA-Z0-9\\/\\s]")
    fun addCocktail(cocktail: Cocktail){
        cocktail.name = cocktail.name.replace(regex,"")
        cocktail.ingredients = cocktail.ingredients.map { Ingredient(it.name.replace(regex,""), it.description.replace(regex,""), it.type.replace(regex,""), it.isBattery) }.toList()
        cocktail.category = Category(cocktail.category.name.replace(regex,""))
        cocktail.recipe = cocktail.recipe.replace(regex,"")
        cocktail.description = cocktail.description.replace(regex,"")
        cocktail.amounts = cocktail.amounts.map { it.replace(regex,"") }

        val cocktailIds = cocktailRepository.addCocktail(cocktail)
        val ingredientIds = ingredientsRepository.addIngredients(cocktail.ingredients)
        ingredientsRepository.addCocktailIngredients(cocktail.amounts, cocktailIds, ingredientIds)
    }

    fun getCocktail(id :Int) : Cocktail {
        val cocktailPair = cocktailRepository.getCocktail(id)
        cocktailPair.first.ingredients = ingredientsService.getIngredients(cocktailPair.second)
        return cocktailPair.first
    }

    fun getCocktails() : List<Cocktail> {
        val cocktailPairs = cocktailRepository.getAll()

        val res = emptyList<Cocktail>().toMutableList()

        for (pair in cocktailPairs) {
            pair.first.ingredients = ingredientsService.getIngredients(pair.second)
            res.add(pair.first)
        }
        return res
    }

    fun getCocktails(ids : List<Int>) : List<Cocktail> {
        val cocktailPairs = cocktailRepository.getCocktails(ids)
        val res = emptyList<Cocktail>().toMutableList()

        for (pair in cocktailPairs) {
            pair.first.ingredients = ingredientsService.getIngredients(pair.second)
            res.add(pair.first)
        }
        return res
    }


    fun getCategories() : List<Category>{
        return cocktailRepository.getCategories()
    }

    fun deleteById(id: Int){
        cocktailRepository.deleteCocktail(id)
    }

    fun updateCocktail(newCocktail: Cocktail, id: Int){
        cocktailRepository.updateCocktail(newCocktail, id)
    }

    //prevent sql injection
    private fun filterSqlQueries(string: String):Boolean {
        val illegals = listOf<String>("join","select","drop","insert")
        for(ill in illegals){
            if(string.contains(ill)) return true
        }
        return false
    }


    companion object {
        private val LOG = LoggerFactory.getLogger(CocktailService::class.java)
    }

}