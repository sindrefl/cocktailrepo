package no.sindre.barapplication.Services

import no.sindre.barapplication.Controllers.CocktailController
import no.sindre.barapplication.Repositories.CocktailRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.File
import java.io.IOException
import java.net.URL
import java.nio.file.Files
import java.nio.file.Paths

@Service
class ImageService(val cocktailService: CocktailService,
                   val cocktailRepository: CocktailRepository) {
    //fun storeCocktailImage(bytes: ByteArray, cocktailId: Int, fileName: String){
    fun storeCocktailImage(bytes: ByteArray, cocktailName: String, fileName: String) {
        val cocktailId = cocktailRepository.getIdFromName(cocktailName.replace('_', ' '))
        cocktailRepository.storeCocktailImage(bytes, cocktailId, fileName, "/api/images/drinks?id=$cocktailId")
    }

    fun getCocktailImage(id: Int): ByteArray {
        return cocktailRepository.getCocktailImage(id)
    }

    private fun storeImageScript() {
        val cocktails = cocktailService.getCocktails()
        val cocktail = cocktails[0]
        //for(cocktail:Cocktail in cocktails){
        val imageName = cocktail.name.replace(' ', '_').replace(Regex("[\\/]"), "_")
        try {
            val file = Files.readAllBytes(Paths.get("C:/Users/sindre.flood/Documents/CocktailApplication/barapplication/src/main/resources/public/images/drinks/$imageName.jpg"))
            //cocktailRepository.storeCocktailImage(file, cocktail.name, sqlFile)
            //cocktailRepository.storeCocktailImage(file,cocktail.name)
        } catch (e: NoSuchFileException) {
            LOG.info(cocktail.name)
        }
        //}
    }

    /*fun downloadImage(url: String?, name: String) {
        var fileName = name
        if (url.isNullOrBlank()) {
            return
        }
        if (name.contains("/")) {
            fileName = name.replace("/", "_")
        }

        if (System.getenv("MODE") == "local") {
            try {
                val image = URL(url).openStream().use({ input -> Files.copy(input, Paths.get("C:/Users/sindre.flood/Documents/CocktailApplication/barapplication/src/main/resources/public/images/drinks/$fileName.jpg")) })
            } catch (e: IOException) {
                CocktailController.LOG.error("image failed: ${e.message}")
            }
        } else {
            awsService.putObject("drinks/$fileName.jpg", File(URL(url).file))
        }
    }*/

    companion object {
        val LOG = LoggerFactory.getLogger(ImageService::class.java)
    }
}