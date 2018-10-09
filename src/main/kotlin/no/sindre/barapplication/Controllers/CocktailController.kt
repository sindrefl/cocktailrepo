package no.sindre.barapplication.Controllers


import no.sindre.barapplication.Models.*
import no.sindre.barapplication.Services.AWSService
import no.sindre.barapplication.Services.CSVService
import no.sindre.barapplication.Services.CocktailService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.*
import java.io.IOException
import java.net.URL
import java.nio.file.Files
import java.nio.file.Paths
import javax.servlet.http.HttpServletResponse
import org.springframework.core.io.ClassPathResource
import org.springframework.http.MediaType
import org.springframework.util.StreamUtils
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File


@RestController
@RequestMapping("/api")
class CocktailController(
        val cocktailService: CocktailService,
        val csvService: CSVService,
        val awsService: AWSService
) {


    val LOG = LoggerFactory.getLogger(CocktailController::class.java.name)

    @RequestMapping("/")
    fun home(): String {
        return "This is the home"
    }


    @PostMapping("/addDrink")
    fun addDrink(@RequestBody cocktail: Cocktail) {
        if (cocktail.name.contains('*')) {
            cocktail.name = "Quick Fuck"
        }
        if (cocktail.name.contains("\"")) {
            cocktail.name = cocktail.name.replace("\"", "")
        }

        LOG.info(cocktail.image_link)
        LOG.info("" + cocktail.image_link.isNullOrBlank())
        downloadImage(cocktail.image_link, cocktail.name.replace(' ', '_'))
        //   cocktailService.addCocktail(cocktail)
    }


    fun downloadImage(url: String?, name: String) {
        var fileName = name
        if (url.isNullOrBlank()) {
            return
        }
        if (name.contains("/")) {
            fileName = name.replace("/", "_")
        }

        if (System.getenv("AWS_ACCESS_KEY_ID").isNullOrBlank()) {
            try {
                val image = URL(url).openStream().use({ input -> Files.copy(input, Paths.get("C:/Users/sindre.flood/Documents/CocktailApplication/barapplication/src/main/resources/public/images/drinks/$fileName.jpg")) })
            } catch (e: IOException) {
                LOG.error("image failed: ${e.message}")
            }
        } else {
            awsService.putObject("drinks/$fileName.jpg",File(URL(url).file))
        }
    }


    @GetMapping("/random")
    fun index(): Cocktail {
        cocktailService.updateRandomCocktail()
        return cocktailService.randomCocktail
    }

    @GetMapping("/allDrinks")
    fun getDrinks(): List<Cocktail> = cocktailService.getCocktails()


    @GetMapping("/filteredDrinks")
    fun getFiltered(@RequestParam(required = false) category: String, @RequestParam(required = false) glass: String): List<Cocktail>{
        if(category.isNullOrBlank() && glass.isNullOrBlank()){
            return cocktailService.getCocktails()
        }else if (category.isNullOrBlank()){
            return cocktailService.getFilteredDrinkList(Category(""), Glass.valueOf(glass))
        }else if (glass.isNullOrBlank()){
            return cocktailService.getFilteredDrinkList(Category(category))
        }
        else{
            return cocktailService.getFilteredDrinkList(Category(category), Glass.valueOf(glass))
        }
    }

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
    fun getIngredients(): List<Ingredient> = cocktailService.getIngredients()

    @RequestMapping("/cocktails.csv")
    fun getCocktailsAsCsv(response: HttpServletResponse) {
        response.contentType = ("text/csv")
        response.setHeader("Content-Disposition", "attachment; filename=\"cocktails.csv\"")
        csvService.writeCocktails(response.writer, cocktailService.getCocktails());
        response.writer.flush()
        response.writer.close()
    }

    @GetMapping("/images/drinks", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getdrinkImage(@RequestParam path: String, response: HttpServletResponse) {
        if (System.getenv("AWS_ACCESS_KEY_ID").isNullOrBlank()) {
            try{
                val imgFile = ClassPathResource("/public/images/drinks/$path")
                response.setHeader("Content-type", MediaType.IMAGE_JPEG_VALUE )
                StreamUtils.copy(imgFile.inputStream, response.outputStream)
            }catch(e: IOException){
                Log.info("IOException thrown")
                Log.info(e.message)
            }

        } else {
            Log.info("aws run")
                val obj = awsService.getObject("drinks/$path")
                response.contentType = MediaType.IMAGE_JPEG_VALUE
                StreamUtils.copy(obj.objectContent, response.outputStream)
            }
    }

    @GetMapping("/images/categories", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getcatImage(@RequestParam path: String, response: HttpServletResponse) {

        if (System.getenv("AWS_ACCESS_KEY").isNullOrBlank()) {
            try{
                val imgFile = ClassPathResource("/public/images/categories/$path")
                response.contentType = MediaType.IMAGE_JPEG_VALUE
                StreamUtils.copy(imgFile.inputStream, response.outputStream)
            }catch(e: IOException){
                Log.info("IOException")
                Log.info(e.message)
            }

        } else {
            Log.info("aws run")
            val obj = awsService.getObject("categories/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(obj.objectContent, response.outputStream)
        }
    }

    @GetMapping("/images/glass", produces = [MediaType.IMAGE_JPEG_VALUE])
    fun getglassImage(@RequestParam path: String, response: HttpServletResponse) {

        //if (System.getenv("AWS_ACCESS_KEY_ID").isNullOrBlank()) {
        try{
            val imgFile = ClassPathResource("/public/images/glass/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(imgFile.inputStream, response.outputStream)
        }catch (e: IOException){
            LOG.info("IOEXCEPTION THROWN")
            LOG.info(e.message)
        }
        /*
        } else {
            val obj = awsService.getObject("glass/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(obj.objectContent, response.outputStream)
        }
        */
    }
}