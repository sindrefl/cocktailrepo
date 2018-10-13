package no.sindre.barapplication.Controllers


import no.sindre.barapplication.Models.Category
import no.sindre.barapplication.Models.Cocktail
import no.sindre.barapplication.Models.Glass
import no.sindre.barapplication.Models.Ingredient
import no.sindre.barapplication.Services.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api")
class CocktailController(
        val cocktailService: CocktailService,
        val randomCocktailService: RandomCocktailService,
        val filterService: FilterService,
        val ingredientsService: IngredientsService,
        val env: Environment
) {

    @PostMapping("/addDrink")
    fun addDrink(@RequestBody cocktail: Cocktail) {
        cocktailService.addCocktail(cocktail)
    }


    @GetMapping("/random")
    fun index(): Cocktail {
        randomCocktailService.updateRandomCocktail()
        return randomCocktailService.randomCocktail
    }

    @GetMapping("/allDrinks")
    fun getDrinks(): List<Cocktail> = cocktailService.getCocktails()



    @GetMapping("/glassTypes")
    fun getGlasses(): Array<Glass> {
        return Glass.values()
    }

    @GetMapping("/glassTypes/{length}")
    fun getGlasses(@PathVariable length: Int): List<Glass> {
        return Glass.values().take(length)
    }

    @GetMapping("/categories")
    fun getCategories(): List<Category> {
        return cocktailService.getCategories()
    }

    @GetMapping("/categories/{length}")
    fun getCategories(@PathVariable length: Int): List<Category> {
        return cocktailService.getCategories().take(length)
    }

    @GetMapping("/ingredients")
    fun getIngredients(): List<Ingredient> = ingredientsService.getIngredients()


    /*
    @RequestMapping("/cocktails.csv")
    fun getCocktailsAsCsv(response: HttpServletResponse) {
        response.contentType = ("text/csv")
        response.setHeader("Content-Disposition", "attachment; filename=\"cocktails.csv\"")
        csvService.writeCocktails(response.writer, cocktailService.getCocktails());
        response.writer.flush()
        response.writer.close()
    }
    */

    companion object {
         val LOG: Logger  = LoggerFactory.getLogger(CocktailController::class.java.name)
        const val PAGE_SIZE = 20
    }
}