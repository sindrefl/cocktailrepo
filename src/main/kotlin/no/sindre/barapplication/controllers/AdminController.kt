package no.sindre.barapplication.controllers

import no.sindre.barapplication.models.Category
import no.sindre.barapplication.models.Cocktail
import no.sindre.barapplication.models.Glass
import no.sindre.barapplication.payload.CocktailChangeRequest
import no.sindre.barapplication.repositories.UserRepository
import no.sindre.barapplication.services.CocktailService
import no.sindre.barapplication.services.ImageService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

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
            @RequestParam image: MultipartFile,
            @RequestParam fileName: String
            ){

        imageService.storeCocktailImage(image.bytes,fileName, id)
    }

    @PostMapping("/cocktail/update")
    fun store(
            @RequestBody cocktail: CocktailChangeRequest
    ){
//        val newCocktail = Cocktail(
//                name = map["name"]!!.toString(),
//                glass = Glass.valueOf(map["glass"].toString()),
//                amounts = amounts,
//                category = Category(""),
//                description = "",
//                ingredients = emptyList(),
//                recipe = map["recipe"].toString()
//        )
//        cocktailService.updateCocktail(newCocktail, id)
        cocktailService.updateCocktail(cocktail)
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