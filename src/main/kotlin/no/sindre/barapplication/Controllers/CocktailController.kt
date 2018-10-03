package no.sindre.barapplication.Controllers


import no.sindre.barapplication.Models.Category
import no.sindre.barapplication.Models.Cocktail
import no.sindre.barapplication.Models.Glass
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
import java.util.logging.Logger
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


    @GetMapping("/filteredDrinks/{searchString}")
    fun getFiltered(@PathVariable searchString: String) = cocktailService.getFilteredDrinkList(searchString)

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

    @RequestMapping("/cocktails.csv")
    fun getCocktailsAsCsv(response: HttpServletResponse) {
        response.contentType = ("text/csv")
        response.setHeader("Content-Disposition", "attachment; filename=\"cocktails.csv\"")
        csvService.writeCocktails(response.writer, cocktailService.getCocktails());
        response.writer.flush()
        response.writer.close()
    }

    @GetMapping("/images/drinks/{path}", produces = [MediaType.IMAGE_JPEG_VALUE])
    @Throws(IOException::class)
    fun getdrinkImage(@PathVariable path: String, response: HttpServletResponse) {

        if (System.getenv("AWS_ACCESS_KEY_ID").isNullOrBlank()) {
            val imgFile = ClassPathResource("/public/images/drinks/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(imgFile.inputStream, response.outputStream)
        } else {
            val obj = awsService.getObject("/drinks/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(obj.objectContent, response.outputStream)
        }
    }

    @GetMapping("/images/categories/{path}", produces = [MediaType.IMAGE_JPEG_VALUE])
    @Throws(IOException::class)
    fun getcatImage(@PathVariable path: String, response: HttpServletResponse) {

        if (System.getenv("AWS_ACCESS_KEY").isNullOrBlank()) {
            val imgFile = ClassPathResource("/public/images/categories/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(imgFile.inputStream, response.outputStream)
        } else {
            val obj = awsService.getObject("/categories/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(obj.objectContent, response.outputStream)
        }
    }

    @GetMapping("/images/glass/{path}", produces = [MediaType.IMAGE_JPEG_VALUE])
    @Throws(IOException::class)
    fun getglassImage(@PathVariable path: String, response: HttpServletResponse) {

        if (System.getenv("AWS_ACCESS_KEY_ID").isNullOrBlank()) {
            val imgFile = ClassPathResource("/public/images/glass/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(imgFile.inputStream, response.outputStream)

        } else {
            val obj = awsService.getObject("/glass/$path")
            response.contentType = MediaType.IMAGE_JPEG_VALUE
            StreamUtils.copy(obj.objectContent, response.outputStream)
        }
    }
}