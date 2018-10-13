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
import org.springframework.jdbc.support.lob.DefaultLobHandler
import java.io.ByteArrayInputStream
import org.springframework.jdbc.core.support.SqlLobValue
import java.io.BufferedWriter
import java.io.File
import java.sql.Types


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

    fun getIdFromName(name:String): Int{
        val list = namedParameterJdbcTemplate.queryForList("SELECT COCKTAIL_ID FROM COCKTAIL_DB.COCKTAIL WHERE name=\'$name\'", MapSqlParameterSource(hashMapOf("name" to name))).map { it["cocktail_id"] }
        return list[0].toString().toInt()
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

    fun storeCocktailImage(bytes: ByteArray, cocktailId: Int, fileName: String, imageUrl: String): Int {
        val parameters = MapSqlParameterSource()
        parameters.addValue("id", cocktailId)
        parameters.addValue("image", SqlLobValue(ByteArrayInputStream(bytes), bytes.size, DefaultLobHandler()), Types.BLOB)
        parameters.addValue("image_filename", fileName)
        parameters.addValue("image_link", imageUrl)
        //f.bufferedWriter().use{ out -> out.writeLn("update cocktail_db.cocktail set image=\'\\x${bytes.joinToString("") { "${String.format("%02X", it).toLowerCase()}" }}\' where name=\'$cocktailName\';")}
        return namedParameterJdbcTemplate.update("update cocktail_db.cocktail set image=:image, image_filename=:image_filename, img_link=:image_link where cocktail_id=:id", parameters)
    }

    fun getCocktailImage(id:Int): ByteArray{
        val sql="SELECT image FROM COCKTAIL_DB.COCKTAIL WHERE cocktail_id=:cocktail_id"
        return namedParameterJdbcTemplate.queryForObject(sql, MapSqlParameterSource(hashMapOf("cocktail_id" to id)), { rs, rowNum -> rs.getBytes(1) })!!
    }

    fun BufferedWriter.writeLn(line: String) {
        this.write(line)
        this.newLine()
    }
}