package no.sindre.barapplication.services

import no.sindre.barapplication.models.Ingredient
import no.sindre.barapplication.repositories.IngredientsRepository
import org.springframework.stereotype.Service

@Service
class IngredientsService(val ingredientsRepository: IngredientsRepository){

    fun getIngredient(id : Int) : Ingredient {
        return ingredientsRepository.getIngredient(id)
    }

    fun getIngredients(ids :List<Int>) : List<Ingredient> {
        return ingredientsRepository.getIngredients(ids)
    }
    fun getIngredients() : List<Ingredient> {
        return ingredientsRepository.getAll()
    }
}

