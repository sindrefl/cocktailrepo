package no.sindre.barapplication.Services


import no.sindre.barapplication.Models.*
import no.sindre.barapplication.Repositories.CocktailRepository
import no.sindre.barapplication.Repositories.IngredientsRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import sun.misc.IOUtils
import java.io.File
import java.io.FileInputStream
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*


@Service
class CocktailService(val cocktailRepository: CocktailRepository,
                      val ingredientsRepository: IngredientsRepository) {


    private val LOG = LoggerFactory.getLogger(CocktailService::class.java)

    var randomCocktail : Cocktail = Cocktail("jsaf",Glass.BALLOON, Category("ds"), emptyList(), emptyList(),",","")

    fun updateRandomCocktail() : Unit {
        val range = cocktailRepository.getMinMax()
        val rand : Random = Random()
        randomCocktail = getCocktail(rand.nextInt(range.second - range.first + 1) + range.first)
    }

    //prevent sql injection
    private fun filterSqlQueries(string: String):Boolean {
        val illegals = listOf<String>("join","select","drop","insert")
        for(ill in illegals){
            if(string.contains(ill)) return true
        }
        return false
    }

    fun getPageCount(glass: String, category: String) : Int = cocktailRepository.getPageCount(glass, category)

    fun getFilteredDrinkList(category: Category, glass: Glass) : List<Cocktail>{
        return getCocktails(cocktailRepository.getIdsFromFilter(category, glass))
    }

    fun getFilteredDrinkList(category: Category) : List<Cocktail>{
        return getCocktails(cocktailRepository.getIdsFromFilter(category))
    }

    val regex = Regex("[^a-zA-Z0-9\\/\\s]")
    fun addCocktail(cocktail: Cocktail){
        cocktail.name = cocktail.name.replace(regex,"")
        cocktail.ingredients = cocktail.ingredients.map { Ingredient(it.name.replace(regex,""), it.description.replace(regex,""), it.type.replace(regex,""), it.isBattery) }.toList()
        cocktail.category = Category(cocktail.category.name.replace(regex,""))
        cocktail.recipe = cocktail.recipe.replace(regex,"")
        cocktail.description = cocktail.description.replace(regex,"")
        cocktail.amounts = cocktail.amounts.map { it.replace(regex,"") }

        val cocktailIds = cocktailRepository.addCocktail(cocktail)
        val ingredientIds = ingredientsRepository.addIngredients(cocktail.ingredients)
        ingredientsRepository.addCocktailIngredients(cocktail.amounts, cocktailIds, ingredientIds)
    }

    fun getCocktail(id :Int) : Cocktail {
        val cocktailPair = cocktailRepository.getCocktail(id)
        cocktailPair.first.ingredients = getIngredients(cocktailPair.second)
        return cocktailPair.first
    }

    fun getCocktails() : List<Cocktail> {
        val cocktailPairs = cocktailRepository.getAll()

        val res = emptyList<Cocktail>().toMutableList()

        for (pair in cocktailPairs) {
            pair.first.ingredients = getIngredients(pair.second)
            res.add(pair.first)
        }
        return res
    }

    fun getCocktails(ids : List<Int>) : List<Cocktail> {
        val cocktailPairs = cocktailRepository.getCocktails(ids)
        val res = emptyList<Cocktail>().toMutableList()

        for (pair in cocktailPairs) {
            pair.first.ingredients = getIngredients(pair.second)
            res.add(pair.first)
        }
        return res
    }

    fun getIngredient(id : Int) : Ingredient{
        return ingredientsRepository.getIngredient(id)
    }

    fun getIngredients(ids :List<Int>) : List<Ingredient> {
        return ingredientsRepository.getIngredients(ids)
    }
    fun getIngredients() : List<Ingredient> {
        return ingredientsRepository.getAll()
    }

    fun getCategories() : List<Category>{
        return cocktailRepository.getCategories()
    }


    fun storeImageScript(){
        val sqlFile = File("C:/Users/sindre.flood/Documents/CocktailApplication/temp.txt")
        val cocktails = getCocktails()
        val cocktail = cocktails[0]
        //for(cocktail:Cocktail in cocktails){
            val imageName = cocktail.name.replace(' ', '_').replace(Regex("[\\/]"), "_")
        try{
            val file = Files.readAllBytes(Paths.get("C:/Users/sindre.flood/Documents/CocktailApplication/barapplication/src/main/resources/public/images/drinks/$imageName.jpg") )
            //cocktailRepository.storeCocktailImage(file, cocktail.name, sqlFile)
            //cocktailRepository.storeCocktailImage(file,cocktail.name)
        }catch (e: NoSuchFileException){
            LOG.info(cocktail.name)
        }
        //}
    }

    //fun storeCocktailImage(bytes: ByteArray, cocktailId: Int, fileName: String){
    fun storeCocktailImage(bytes: ByteArray, cocktailName: String, fileName: String){
        val cocktailId = cocktailRepository.getIdFromName(cocktailName.replace('_', ' ' ))
        cocktailRepository.storeCocktailImage(bytes, cocktailId,fileName, "/api/images/drinks?id=$cocktailId")
    }

    fun getCocktailImage(id: Int): ByteArray{
        return cocktailRepository.getCocktailImage(id)
    }

    companion object {
        private val LOG = LoggerFactory.getLogger(CocktailService::class.java)
    }

}