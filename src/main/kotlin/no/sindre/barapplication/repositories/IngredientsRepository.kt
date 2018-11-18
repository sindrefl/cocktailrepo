package no.sindre.barapplication.repositories

import no.sindre.barapplication.models.Ingredient
import no.sindre.barapplication.models.Log
import org.slf4j.LoggerFactory
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.stereotype.Repository

@Repository
class IngredientsRepository(val namedParameterJdbcTemplate: NamedParameterJdbcTemplate) {

    val LOG = LoggerFactory.getLogger("com.example.IngredientRepository")
    val INSERT_INGREDIENT_SQL = """
        INSERT INTO COCKTAIL_DB.INGREDIENT
        (name,ing_description,type,isBattery)
        VALUES
        (:name,:description,:type,:battery)
        """.trimIndent().regexReplace()
    val SELECTBYNAMESQL = """
        SELECT INGREDIENT_ID
        FROM COCKTAIL_DB.INGREDIENT
        WHERE INGREDIENT.NAME=:name
        """.trimIndent().regexReplace()

    fun addIngredient(ingredient: Ingredient): Int {

        val already = namedParameterJdbcTemplate.queryForList(SELECTBYNAMESQL, MapSqlParameterSource(hashMapOf("name" to ingredient.name)))

        if(!already.isEmpty()){
            return already[0]["INGREDIENT_ID"].toString().toInt()
        }

        val keyHolder = GeneratedKeyHolder()

        val namedParameters = MapSqlParameterSource(
                hashMapOf(
                        "name" to ingredient.name,
                        "description" to ingredient.description,
                        "battery" to ingredient.isBattery,
                        "type" to ingredient.type
                )
        )

        namedParameterJdbcTemplate.update(INSERT_INGREDIENT_SQL, namedParameters, keyHolder)

        return keyHolder.key!!.toInt()
    }

    //not optimal.. could be done with a batch insert instead:
    fun addIngredients(list: List<Ingredient>): List<Int> {
        val res = emptyList<Int>().toMutableList()
        for (ingredient in list) {
            res.add(addIngredient(ingredient))
        }
        return res
    }

    val INSERTINGREDIENTSSQL = """
        INSERT INTO COCKTAIL_DB.COCKTAILHASINGREDIENT
        (COCKTAIL_ID, INGREDIENT_ID, AMOUNT)
        VALUES
        (:cid,:iid,:amount)
        """.trimIndent().regexReplace()


    fun addCocktailIngredients(amounts: List<String>, cocktail_id: Int, ingredient_ids: List<Int>) {
        if (amounts.size != ingredient_ids.size) throw IllegalStateException("Ingredient length and amounts do not match with ${amounts.size} and ${ingredient_ids.size}")
        for (i in 0..amounts.size - 1) {
            namedParameterJdbcTemplate.update(INSERTINGREDIENTSSQL, mapOf("cid" to cocktail_id, "iid" to ingredient_ids.get(i), "amount" to amounts.get(i)))
        }
    }

    val SELECT_INGREDIENT_SQL = """
        SELECT NAME,ING_DESCRIPTION,TYPE,ISBATTERY
        FROM COCKTAIL_DB.INGREDIENT
        WHERE INGREDIENT.INGREDIENT_ID=(:id)
        """.trimIndent().regexReplace()

    fun getIngredient(id : Int) : Ingredient {
        return namedParameterJdbcTemplate.queryForObject(SELECT_INGREDIENT_SQL, MapSqlParameterSource(hashMapOf("id" to id)), {rs, _ -> Ingredient(rs.getString("name").toString(), rs.getString("ing_description"), rs.getString("type"), rs.getBoolean("isBattery"))})!!
    }

    fun getIngredients(ids : List<Int>) : List<Ingredient>{
        val res = emptyList<Ingredient>().toMutableList()
        for(id in ids){
            res.add(getIngredient(id))
        }
        return res
    }

    fun getAll() : List<Ingredient> {
        val res = emptyList<Ingredient>().toMutableList()
        val ingredientsMap = namedParameterJdbcTemplate.queryForList("SELECT NAME FROM COCKTAIL_DB.INGREDIENT", MapSqlParameterSource())
        for (row in ingredientsMap){
            res.add(Ingredient(row["name"].toString(),row["ing_description"].toString(), row["type"].toString(), row["isBattery"].toString() == "1"))
        }
        return res
    }

    fun getIngredientSuggestions(ingredient: String): List<String> {
        val namedParameters = MapSqlParameterSource(hashMapOf(
                "ingredient" to "%$ingredient%"
        ))
        val sql = """
            SELECT DISTINCT name
            FROM cocktail_db.ingredient
            WHERE name ILIKE :ingredient
            LIMIT 10
            """.trimIndent().regexReplace()
        return namedParameterJdbcTemplate.queryForList(sql, namedParameters).map { it["name"].toString() }
    }

    fun getFilteredCocktailIds(ingredients: Array<String>): List<Int>{
        /*
        val sql = """
            SELECT COCKTAIL_ID
            FROM COCKTAIL_DB.INGREDIENT JOIN COCKTAIL_DB.COCKTAILHASINGREDIENT
            ON COCKTAIL_DB.COCKTAILHASINGREDIENT.INGREDIENT_ID=COCKTAIL_DB.INGREDIENT.INGREDIENT_ID
            WHERE COCKTAIL_DB.INGREDIENT.NAME ILIKE ${ingredients.map{item ->"('%$item%')"}.joinToString(" OR COCKTAIL_DB.INGREDIENT.NAME ILIKE ")}
            """.trimIndent().regexReplace()
        return namedParameterJdbcTemplate.queryForList(sql, MapSqlParameterSource()).map { it["cocktail_id"].toString().toInt() }.toList().groupingBy { it }.eachCount().filter { it.value >= ingredients.size }.keys.toList()
    */
        val ids = ingredients.map { it ->
            namedParameterJdbcTemplate.queryForList(
                    """
            SELECT COCKTAIL_ID
            FROM COCKTAIL_DB.INGREDIENT JOIN COCKTAIL_DB.COCKTAILHASINGREDIENT
            ON COCKTAIL_DB.COCKTAILHASINGREDIENT.INGREDIENT_ID=COCKTAIL_DB.INGREDIENT.INGREDIENT_ID
            WHERE COCKTAIL_DB.INGREDIENT.NAME ILIKE :it
            """.trimIndent().regexReplace()
                    , MapSqlParameterSource(hashMapOf("it" to "%$it%"))).map {it["cocktail_id"].toString().toInt()
             }}.toList()

        var res = ids[0].toSet()
        for(idList in ids){
            res = res.intersect(idList)
        }
        Log.info(res.toString())

        return res.toList()

    }

    fun String.regexReplace() :String {
        val nRegex = Regex("\\\n")
        return this.replace(nRegex," ")
    }

}