package no.sindre.barapplication.Controllers


import no.sindre.barapplication.Models.Category
import no.sindre.barapplication.Models.Cocktail
import no.sindre.barapplication.Models.Glass
import no.sindre.barapplication.Services.CSVService
import no.sindre.barapplication.Services.CocktailService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.io.IOException
import java.net.URL
import java.nio.file.Files
import java.nio.file.Paths
import java.util.logging.Logger
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api")
class CocktailController(@Autowired
                         var cocktailService: CocktailService,
                         @Autowired
var csvService: CSVService
) {

    val LOG = LoggerFactory.getLogger(CocktailController::class.java.name)

    @RequestMapping("/")
    fun home(): String{
        return "This is the home"
    }



    @PostMapping("/addDrink")
    fun addDrink(@RequestBody cocktail: Cocktail){
        if(cocktail.name.contains('*')){
            cocktail.name = "Quick Fuck"
        }
        if(cocktail.name.contains("\"")){
            cocktail.name = cocktail.name.replace("\"", "")
        }
        downloadImage(cocktail.image_link, cocktail.name.replace(' ', '_'))
        cocktailService.addCocktail(cocktail)
    }


    fun downloadImage(url: String?, name : String){
        var fileName = name
        if(url.isNullOrBlank()){
            return
        }
        if(name.contains("/")){
            fileName = name.replace("/","_")
        }

        try {
            val image = URL(url).openStream().use({ input -> Files.copy(input, Paths.get("C:/Users/sindre.flood/Documents/MyBar/MyBarServer/target/classes/static/images/drinks/$fileName.jpg")) })
        } catch (e : IOException) {
            LOG.error("image failed: ${e.message}")
        }
    }


    @GetMapping("/random")
    fun index(): Cocktail{
        cocktailService.updateRandomCocktail()
        return cocktailService.randomCocktail
    }

    @GetMapping("/allDrinks")
    fun getDrinks() : List<Cocktail> = cocktailService.getCocktails()


    @GetMapping("/filteredDrinks/{searchString}")
    fun getFiltered(@PathVariable searchString : String) = cocktailService.getFilteredDrinkList(searchString)

    @GetMapping("/glassTypes")
    fun getGlasses() : Array<Glass> {
        return Glass.values()
    }

    @GetMapping("/glassTypes/{length}")
    fun getGlasses(@PathVariable length:Int) : List<Glass> {
        return Glass.values().take(length)
    }

    @GetMapping("/categories")
    fun getCategories() : List<Category> {
        return cocktailService.getCategories()
    }

    @GetMapping("/categories/{length}")
    fun getCategories(@PathVariable length: Int) : List<Category> {
        return cocktailService.getCategories().take(length)
    }

    @RequestMapping("/cocktails.csv")
    fun getCocktailsAsCsv(response:HttpServletResponse){
        response.contentType = ("text/csv")
        response.setHeader("Content-Disposition", "attachment; filename=\"cocktails.csv\"")
        csvService.writeCocktails(response.writer, cocktailService.getCocktails());
        response.writer.flush()
        response.writer.close()
    }
}