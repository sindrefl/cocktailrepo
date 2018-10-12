package no.sindre.barapplication.Repositories

import no.sindre.barapplication.Controllers.CocktailController
import no.sindre.barapplication.Models.Category
import no.sindre.barapplication.Models.Cocktail
import no.sindre.barapplication.Models.Glass
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.RowMapper
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.support.GeneratedKeyHolder


@Repository
class CocktailRepository(val namedParameterJdbcTemplate: NamedParameterJdbcTemplate) {


    final val INSERT_COCKTAIL_SQL = "INSERT INTO COCKTAIL_DB.COCKTAIL (name,description,glass,category,alcoholic,img_link, recipe) VALUES (:name,:description,:glass,:category, :alcoholic, :image_link,:recipe) "

    fun addCocktail(cocktail: Cocktail): Int {

        //holds IDs generated by mysql:
        val keyHolder: GeneratedKeyHolder = GeneratedKeyHolder()

        val namedParameters = MapSqlParameterSource(hashMapOf(
                "recipe" to cocktail.recipe,
                "image_link" to cocktail.image_link,
                "alcoholic" to cocktail.alcoholic,
                "category" to cocktail.category.name,
                "name" to cocktail.name,
                "description" to cocktail.description,
                "glass" to cocktail.glass.toString())
        )

        namedParameterJdbcTemplate.update(INSERT_COCKTAIL_SQL, namedParameters, keyHolder)

        return keyHolder.key!!.toInt()
    }

    val GET_COCKTAIL_SQL = "SELECT COCKTAIL.NAME  AS COCKTAILNAME,DESCRIPTION,GLASS,CATEGORY,INGREDIENT.INGREDIENT_ID AS INGREDIENTID, AMOUNT,IMG_LINK,RECIPE FROM COCKTAIL_DB.COCKTAIL JOIN COCKTAIL_DB.COCKTAILHASINGREDIENT ON COCKTAIL_DB.COCKTAIL.COCKTAIL_ID=COCKTAIL_DB.COCKTAILHASINGREDIENT.COCKTAIL_ID JOIN COCKTAIL_DB.INGREDIENT ON COCKTAIL_DB.COCKTAILHASINGREDIENT.INGREDIENT_ID=COCKTAIL_DB.INGREDIENT.INGREDIENT_ID WHERE COCKTAIL_DB.COCKTAIL.COCKTAIL_ID=:cocktailid"


    fun getCocktail(id: Int): Pair<Cocktail,List<Int>> {
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "cocktailid" to id
        ))
        val res = namedParameterJdbcTemplate.queryForList(GET_COCKTAIL_SQL, namedParameters)

        /*val ingredients = hashMapOf<Ingredient,String>()
        for(row in res){
            ingredients.put(Ingredient(row.get("ingredientname").toString()), row.get("amount").toString())
        }
        */

        val ingredients = res.map { it.get("ingredientid").toString().toInt() }.toList()
        val amounts = res.map { it.get("amount").toString() }.toList()

        val row = res.get(0)
        val cocktail = Cocktail(row.get("cocktailname").toString(),Glass.valueOf(row.get("glass").toString()), Category( row.get("category").toString()), emptyList(), amounts, row.get("description").toString(), row.get("recipe").toString())
        cocktail.image_link = row.get("img_link").toString()
        return Pair(cocktail,ingredients)
    }

    val LOG = LoggerFactory.getLogger(CocktailRepository::class.java)

    //Todo optimize:
    fun getCocktails(ids: List<Int>) : List<Pair<Cocktail,List<Int>>> {
        val res = emptyList<Pair<Cocktail,List<Int>>>().toMutableList()
        for(id in ids){
            res.add(getCocktail(id))
        }
        return res
    }

    //extremely shitty:

    val shittysql = "SELECT COCKTAIL_ID FROM COCKTAIL_DB.COCKTAIL"
    fun getAll() : List<Pair<Cocktail,List<Int>>>{

        val ids = namedParameterJdbcTemplate.queryForList(shittysql, MapSqlParameterSource()).map { it.get("cocktail_id").toString().toInt() }

        return getCocktails(ids)
    }

    fun getMinMax() : Pair<Int,Int> {
        val ids = namedParameterJdbcTemplate.queryForList(shittysql, MapSqlParameterSource()).map { it.get("cocktail_id").toString().toInt() }

        return Pair(ids[0], ids.size)
    }

    val Categorysql = """
        SELECT DISTINCT CATEGORY
        FROM COCKTAIL_DB.COCKTAIL
        """.trimIndent()
    fun getCategories() : List<Category>  {
        return namedParameterJdbcTemplate.queryForList(Categorysql, MapSqlParameterSource()).map { Category(name=it.get("category").toString()) }

    }


    fun getIdsFromFilter(category: Category, glass: Glass) : List<Int>{
        val sql = "SELECT COCKTAIL_ID FROM COCKTAIL_DB.COCKTAIL WHERE category ILIKE ('%" + category.name + "%') AND glass ILIKE ('%" + glass +"%')"
        val ids = namedParameterJdbcTemplate.queryForList(sql, MapSqlParameterSource()).map { it.get("cocktail_id").toString().toInt()}
        return ids
    }

    fun getIdsFromFilter(category: Category) : List<Int>{
        val sql = "SELECT COCKTAIL_ID FROM COCKTAIL_DB.COCKTAIL WHERE category ILIKE ('%" + category.name + "%')"
        LOG.info(sql)
        val ids = namedParameterJdbcTemplate.queryForList(sql, MapSqlParameterSource()).map { it.get("cocktail_id").toString().toInt()}
        return ids
    }

    val nRegex = Regex("\\\n")

    fun getPageCount(glass: String,category: String): Int {
        val sql = """
            SELECT COUNT(COCKTAIL_ID)
            FROM COCKTAIL_DB.COCKTAIL
            WHERE category ILIKE ('%$category%') AND glass ILIKE ('%$glass%')
            """.trimIndent().replace(nRegex," ")
        val totalCount = namedParameterJdbcTemplate.queryForObject(sql, MapSqlParameterSource(), Int::class.java)!!
        return if (totalCount == 0){
            0
        }else{
            totalCount / CocktailController.PAGE_SIZE + 1
        }
    }
}