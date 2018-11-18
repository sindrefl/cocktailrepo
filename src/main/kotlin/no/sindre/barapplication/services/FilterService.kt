package no.sindre.barapplication.services

import no.sindre.barapplication.models.Category
import no.sindre.barapplication.models.Cocktail
import no.sindre.barapplication.models.Glass
import no.sindre.barapplication.repositories.CocktailRepository
import no.sindre.barapplication.repositories.IngredientsRepository
import org.springframework.stereotype.Service

@Service
class FilterService(val cocktailService: CocktailService,
                    val cocktailRepository: CocktailRepository,
                    val ingredientsRepository: IngredientsRepository){

    fun getPageCount(glass: String, category: String) : Int = cocktailRepository.getPageCount(glass, category)

    fun getFilteredDrinkList(category: Category, glass: Glass) : List<Cocktail>{
        return cocktailService.getCocktails(cocktailRepository.getIdsFromFilter(category, glass))
    }

    fun getFilteredDrinkList(category: Category) : List<Cocktail>{
        return cocktailService.getCocktails(cocktailRepository.getIdsFromFilter(category))
    }

    fun getFilteredDrinkList(drinkName: String) : List<Cocktail>{
        return cocktailService.getCocktails(cocktailRepository.getIdsFromFilter(drinkName))
    }

    fun getSpecificDrinkSuggestions(drink: String): List<String> {
        return cocktailRepository.getSpecificDrinkSuggestions(drink)
    }

    fun getCategorySuggestions(category: String): List<String> {
        return cocktailRepository.getCategorySuggestions(category)
    }

    fun getIngredientSuggestions(ingredient: String): List<String> {
        return ingredientsRepository.getIngredientSuggestions(ingredient)
    }

    fun getFilteredByIngredients(ingredients: Array<String>): List<Cocktail>{
        val ids = ingredientsRepository.getFilteredCocktailIds(ingredients)
        return cocktailService.getCocktails(ids)

    }

}

