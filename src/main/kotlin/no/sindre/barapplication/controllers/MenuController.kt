package no.sindre.barapplication.controllers

import no.sindre.barapplication.models.Cocktail
import no.sindre.barapplication.services.CocktailService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/menu")
class MenuController(val cocktailService: CocktailService) {

    @GetMapping
    fun menuIndex(): List<Cocktail> {
        return cocktailService.getCocktails(listOf(45,515,95,180,311,601,600))

    }
}