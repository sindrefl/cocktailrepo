package no.sindre.barapplication.repositories

import no.sindre.barapplication.controllers.CocktailController
import no.sindre.barapplication.models.Category
import no.sindre.barapplication.models.Cocktail
import no.sindre.barapplication.models.Glass
import no.sindre.barapplication.payload.CocktailChangeRequest
import org.slf4j.LoggerFactory
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.stereotype.Repository
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.jdbc.support.lob.DefaultLobHandler
import java.io.ByteArrayInputStream
import org.springframework.jdbc.core.support.SqlLobValue
import org.springframework.transaction.annotation.Transactional
import java.sql.Types


@Repository
class CocktailRepository(val namedParameterJdbcTemplate: NamedParameterJdbcTemplate) {

    fun addCocktail(cocktail: Cocktail): Int {
        //holds IDs generated by mysql:
        val keyHolder: GeneratedKeyHolder = GeneratedKeyHolder()

        val INSERT_COCKTAIL_SQL = """
       INSERT INTO COCKTAIL_DB.COCKTAIL
       (name,description,glass,category,alcoholic,img_link, recipe)
       VALUES (:name,:description,:glass,:category, :alcoholic, :image_link,:recipe)
       """.trimIndent().regexReplace()

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

    val GET_COCKTAIL_SQL = """
        SELECT COCKTAIL.NAME AS COCKTAILNAME, DESCRIPTION, GLASS,
        CATEGORY,INGREDIENT.INGREDIENT_ID AS INGREDIENTID,
        AMOUNT,IMG_LINK,RECIPE
        FROM COCKTAIL_DB.COCKTAIL JOIN COCKTAIL_DB.COCKTAILHASINGREDIENT
        ON COCKTAIL_DB.COCKTAIL.COCKTAIL_ID=COCKTAIL_DB.COCKTAILHASINGREDIENT.COCKTAIL_ID
        JOIN COCKTAIL_DB.INGREDIENT
        ON COCKTAIL_DB.COCKTAILHASINGREDIENT.INGREDIENT_ID=COCKTAIL_DB.INGREDIENT.INGREDIENT_ID
        WHERE COCKTAIL_DB.COCKTAIL.COCKTAIL_ID=:cocktailid
        """.trimIndent().regexReplace()


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

        val ingredients = res.map { it["ingredientid"].toString().toInt() }.toList()
        val amounts = res.map { it["amount"].toString() }.toList()

        val row = res[0]
        val cocktail = Cocktail(row["cocktailname"].toString(),Glass.valueOf(row["glass"].toString()), Category( row["category"].toString()), emptyList(), amounts, row["description"].toString(), row["recipe"].toString())
        cocktail.image_link = row["img_link"].toString()
        cocktail.cocktail_id=id
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

    val shittysql = """
        SELECT COCKTAIL_ID
        FROM COCKTAIL_DB.COCKTAIL
        """.trimIndent().regexReplace()

    fun getAll() : List<Pair<Cocktail,List<Int>>>{
        val ids = namedParameterJdbcTemplate.queryForList(shittysql, MapSqlParameterSource()).map { it["cocktail_id"].toString().toInt() }

        return getCocktails(ids)
    }

    fun getMinMax() : Pair<Int,Int> {
        val ids = namedParameterJdbcTemplate.queryForList(shittysql, MapSqlParameterSource()).map { it["cocktail_id"].toString().toInt() }

        return Pair(ids[0], ids.size)
    }

    val Categorysql = """
        SELECT DISTINCT CATEGORY
        FROM COCKTAIL_DB.COCKTAIL
        """.trimIndent()
    fun getCategories() : List<Category>  {
        return namedParameterJdbcTemplate.queryForList(Categorysql, MapSqlParameterSource()).map { Category(name=it.get("category").toString()) }

    }

    fun getIdFromName(name:String): Int{
        val sql = """
            SELECT COCKTAIL_ID FROM COCKTAIL_DB.COCKTAIL
            WHERE name=:name
            """.trimIndent().regexReplace()

        val namedParameters = MapSqlParameterSource(hashMapOf(
          "name" to name
        ))

        val list = namedParameterJdbcTemplate.queryForList(sql, namedParameters).map { it["cocktail_id"] }
        return list[0].toString().toInt()
    }

    fun getIdsFromFilter(category: Category, glass: Glass) : List<Int>{
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "category" to "%${category.name}%",
                "glass" to "%$glass%"
        ))

        val sql = """
            SELECT COCKTAIL_ID
            FROM COCKTAIL_DB.COCKTAIL
            WHERE category ILIKE :category AND glass ILIKE :glass
            """.trimIndent().regexReplace()
        val ids = namedParameterJdbcTemplate.queryForList(sql, namedParameters).map { it["cocktail_id"].toString().toInt()}
        return ids
    }

    fun getIdsFromFilter(category: Category) : List<Int>{
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "category" to "%${category.name}%"
        ))
        val sql = """
            SELECT COCKTAIL_ID
            FROM COCKTAIL_DB.COCKTAIL
            WHERE category ILIKE :category
            """
        val ids = namedParameterJdbcTemplate.queryForList(sql, namedParameters).map { it["cocktail_id"].toString().toInt()}
        return ids
    }

    fun getIdsFromFilter(drinkName: String) : List<Int>{
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "name" to "%$drinkName%"
        ))
        val sql = """
            SELECT COCKTAIL_ID
            FROM COCKTAIL_DB.COCKTAIL
            WHERE name ILIKE :name
            """
        val ids = namedParameterJdbcTemplate.queryForList(sql, namedParameters).map { it["cocktail_id"].toString().toInt()}
        return ids
    }


    fun getPageCount(glass: String,category: String): Int {
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "category" to "%$category%",
                "glass" to "%$glass%"
        ))
        val sql = """
            SELECT COUNT(COCKTAIL_ID)
            FROM COCKTAIL_DB.COCKTAIL
            WHERE category ILIKE :category AND glass ILIKE :glass
            """.trimIndent().regexReplace()
        val totalCount = namedParameterJdbcTemplate.queryForObject(sql, namedParameters, Int::class.java)!!
        return if (totalCount == 0){
            0
        }else{
            totalCount / CocktailController.PAGE_SIZE + 1
        }
    }

    fun storeCocktailImage(bytes: ByteArray, cocktailId: Int, fileName: String, imageUrl: String): Int {
        val parameters = MapSqlParameterSource()
        parameters.addValue("id", cocktailId)
        parameters.addValue("image", SqlLobValue(ByteArrayInputStream(bytes), bytes.size, DefaultLobHandler()), Types.BLOB)
        parameters.addValue("image_filename", fileName)
        parameters.addValue("image_link", imageUrl)
        val sql = """
            update cocktail_db.cocktail
            set image=:image, image_filename=:image_filename, img_link=:image_link
            where cocktail_id=:id
            """.trimIndent().regexReplace()
        return namedParameterJdbcTemplate.update(sql, parameters)
    }

    fun getCocktailImage(id:Int): ByteArray{
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "cocktail_id" to id
        ))
        val sql="""
            SELECT image
            FROM COCKTAIL_DB.COCKTAIL
            WHERE cocktail_id=:cocktail_id
            """.trimIndent().regexReplace()
        return namedParameterJdbcTemplate.queryForObject(sql, namedParameters , { rs, rowNum -> rs.getBytes(1) })!!
    }

    fun getSpecificDrinkSuggestions(drink: String): List<String> {
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "name" to "%$drink%"
        ))

        val sql = """
            SELECT DISTINCT name
            FROM cocktail_db.cocktail
            WHERE name ILIKE :name
            LIMIT 10
            """.trimIndent().regexReplace()
        return namedParameterJdbcTemplate.queryForList(sql, namedParameters).map { it["name"].toString() }
    }

    fun getCategorySuggestions(category: String): List<String> {
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "category" to "%$category%"
        ))
        val sql = """
            SELECT DISTINCT category
            FROM cocktail_db.cocktail
            WHERE category ILIKE :category
            LIMIT 10
            """.trimIndent().regexReplace()
        return namedParameterJdbcTemplate.queryForList(sql, namedParameters).map { it["category"].toString() }
    }

    @Transactional
    fun deleteCocktail(id: Int){
        val sql1 = """
            DELETE FROM cocktail_db.cocktailhasingredient
            WHERE cocktail_id=:cocktailId
            """.trimIndent().regexReplace()
        val map = MapSqlParameterSource(
                hashMapOf(
                        "cocktailId" to id
                )
        )
        namedParameterJdbcTemplate.update(sql1, map)
        val sql2 = """
            DELETE FROM cocktail_db.cocktail
            WHERE cocktail_id=:cocktailId
            """.trimIndent().regexReplace()
        namedParameterJdbcTemplate.update(sql2, map)
    }

    fun updateCocktail(newCocktail: CocktailChangeRequest){
        val sql = """
            UPDATE cocktail_db.cocktail
            SET name=:name, recipe=:recipe, glass=:glass
            WHERE cocktail_id=:id
            """.trimIndent().regexReplace()
        val map = MapSqlParameterSource(hashMapOf(
                "name" to newCocktail.name,
                "recipe" to newCocktail.recipe,
                "glass" to newCocktail.glass.toString(),
                "id" to newCocktail.drinkId
        ))
        namedParameterJdbcTemplate.update(sql, map)
    }

    fun String.regexReplace() :String {
        val nRegex = Regex("\\\n")
        return this.replace(nRegex," ")
    }
}