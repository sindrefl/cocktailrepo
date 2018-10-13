package no.sindre.barapplication.Services

import no.sindre.barapplication.Models.Category
import no.sindre.barapplication.Models.Cocktail
import no.sindre.barapplication.Models.Glass
import no.sindre.barapplication.Repositories.CocktailRepository
import org.springframework.stereotype.Service

@Service
class FilterService(val cocktailService: CocktailService,
                    val cocktailRepository: CocktailRepository){

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

}

