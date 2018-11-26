package no.sindre.barapplication.controllers

import no.sindre.barapplication.models.Category
import no.sindre.barapplication.models.Cocktail
import no.sindre.barapplication.models.Glass
import no.sindre.barapplication.repositories.UserRepository
import no.sindre.barapplication.services.CocktailService
import no.sindre.barapplication.services.ImageService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin")
class AdminController(
        private val userRepository: UserRepository,
        private val cocktailService: CocktailService,
        private val imageService: ImageService
) {

    @PostMapping("cocktail/updateImage/{id}")
    fun upd(
            @PathVariable id: Int,
            @RequestPart image : ByteArray,
            @RequestPart fileName: String
            ){
        imageService.storeCocktailImage(image,fileName, id)
    }

    @PostMapping("/cocktail/update/{id}")
    fun store(
            @PathVariable id: Int,
            @RequestParam amounts: List<String>,
            @RequestParam map : Map<String, Any>
    ){
        val newCocktail = Cocktail(
                name = map["name"]!!.toString(),
                glass = Glass.valueOf(map["glass"].toString()),
                amounts = amounts,
                category = Category(""),
                description = "",
                ingredients = emptyList(),
                recipe = map["recipe"].toString()
        )
        cocktailService.updateCocktail(newCocktail, id)

    }

    @PostMapping("/cocktail/delete/{id}")
    fun deleteCocktail(@PathVariable id: Int): ResponseEntity<Map<String,String>>{
        try{
            cocktailService.deleteById(id)
        }catch (e: Exception){
            e.printStackTrace()
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok(mapOf("ok" to "ok"))
    }
    companion object {
        private val Logger = LoggerFactory.getLogger(AdminController::class.java)
    }
}