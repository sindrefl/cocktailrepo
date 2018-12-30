package no.sindre.barapplication.controllers

import no.sindre.barapplication.models.Cocktail
import no.sindre.barapplication.services.CocktailService
import no.sindre.barapplication.services.MailService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/menu")
class MenuController(val cocktailService: CocktailService,
                     val mailService: MailService) {

    @GetMapping
    fun menuIndex(): List<Cocktail> {
        return cocktailService.getCocktails(listOf(45,515,95,180,311,601,600))
        //return cocktailService.getCocktails(listOf(45,515,95))
    }

    @GetMapping("/order")
    fun order(@RequestParam cocktailName: String, @RequestParam orderName: String): ResponseEntity<Map<String,String>>{
        mailService.sendOrderMail(cocktailName, orderName)
        return ResponseEntity.ok(mapOf("ok" to "ok"))
    }
}