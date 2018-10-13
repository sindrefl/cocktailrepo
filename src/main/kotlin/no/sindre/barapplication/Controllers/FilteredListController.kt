package no.sindre.barapplication.Controllers

import no.sindre.barapplication.Models.Category
import no.sindre.barapplication.Models.Cocktail
import no.sindre.barapplication.Models.Glass
import no.sindre.barapplication.Services.CocktailService
import no.sindre.barapplication.Services.FilterService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/filtered")
class FilteredListController(val cocktailService: CocktailService,
                             val filterService: FilterService) {
    
    @GetMapping("/suggestions/drink")
    fun getDrin(@RequestParam drink: String) =
            filterService.getSpecificDrinkSuggestions(drink)


    @GetMapping("/suggestions/category")
    fun getCateg(@RequestParam category: String) =
            filterService.getCategorySuggestions(category)

    @GetMapping("/specificDrink")
    fun searchForSpecific(@RequestParam name: String) =
            filterService.getFilteredDrinkList(name)


    @GetMapping("/drinks")
    fun getFiltered(@RequestParam(required = false) category: String, @RequestParam(required = false) glass: String, @RequestParam page: Int): List<Cocktail> {
        val res =
                if (category.isBlank() && glass.isBlank()) {
                    cocktailService.getCocktails()
                } else if (category.isBlank()) {
                    filterService.getFilteredDrinkList(Category(""), Glass.valueOf(glass))
                } else if (glass.isBlank()) {
                    filterService.getFilteredDrinkList(Category(category))
                } else {
                    filterService.getFilteredDrinkList(Category(category), Glass.valueOf(glass))
                }
        return if (res.size > page * CocktailController.PAGE_SIZE) {
            res.subList((page - 1) * CocktailController.PAGE_SIZE, page * CocktailController.PAGE_SIZE)
        } else if (res.size < (page - 1) * CocktailController.PAGE_SIZE) {
            emptyList()
        } else {
            res.subList((page - 1) * CocktailController.PAGE_SIZE, res.size)
        }
    }

    @GetMapping("/pagecount")
    fun getNumberOfPages(
            @RequestParam glass: String,
            @RequestParam category: String
    ): Int = filterService.getPageCount(glass, category)

}