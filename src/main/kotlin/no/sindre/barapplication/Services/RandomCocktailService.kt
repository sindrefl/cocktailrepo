package no.sindre.barapplication.Services

import no.sindre.barapplication.Models.Category
import no.sindre.barapplication.Models.Cocktail
import no.sindre.barapplication.Models.Glass
import no.sindre.barapplication.Repositories.CocktailRepository
import no.sindre.barapplication.Repositories.IngredientsRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class RandomCocktailService(val cocktailRepository: CocktailRepository,
                            val ingredientsRepository: IngredientsRepository,
                            val cocktailService: CocktailService){



    var randomCocktail : Cocktail = Cocktail("jsaf", Glass.BALLOON, Category("ds"), emptyList(), emptyList(),",","")

    fun updateRandomCocktail() : Unit {
        val range = cocktailRepository.getMinMax()
        val rand : Random = Random()
        randomCocktail = cocktailService.getCocktail(rand.nextInt(range.second - range.first + 1) + range.first)
    }


}

