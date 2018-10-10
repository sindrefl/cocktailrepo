package no.sindre.barapplication.Repositories

import no.sindre.barapplication.Models.Ingredient
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.BadSqlGrammarException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.core.simple.SimpleJdbcInsert
import org.springframework.jdbc.support.GeneratedKeyHolder
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Repository
class IngredientsRepository(val namedParameterJdbcTemplate: NamedParameterJdbcTemplate) {

    val LOG = LoggerFactory.getLogger("com.example.IngredientRepository")
    final val INSERT_INGREDIENT_SQL = "INSERT INTO COCKTAIL_DB.INGREDIENT (name,ing_description,type,isBattery) VALUES (:name,:description,:type,:battery) "
    val SELECTBYNAMESQL = " SELECT INGREDIENT_ID FROM COCKTAIL_DB.INGREDIENT WHERE INGREDIENT.NAME=:name"

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

    val INSERTINGREDIENTSSQL = "INSERT INTO COCKTAIL_DB.COCKTAILHASINGREDIENT (COCKTAIL_ID, INGREDIENT_ID, AMOUNT) VALUES (:cid,:iid,:amount)"


    fun addCocktailIngredients(amounts: List<String>, cocktail_id: Int, ingredient_ids: List<Int>) {
        if (amounts.size != ingredient_ids.size) throw IllegalStateException("Ingredient length and amounts do not match with ${amounts.size} and ${ingredient_ids.size}")
        for (i in 0..amounts.size - 1) {
            namedParameterJdbcTemplate.update(INSERTINGREDIENTSSQL, mapOf("cid" to cocktail_id, "iid" to ingredient_ids.get(i), "amount" to amounts.get(i)))
        }
    }

    val SELECT_INGREDIENT_SQL = "SELECT NAME,ING_DESCRIPTION,TYPE,ISBATTERY FROM COCKTAIL_DB.INGREDIENT WHERE INGREDIENT.INGREDIENT_ID=(:id)"

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
            res.add(Ingredient(row.get("name").toString(),row.get("ing_description").toString(), row.get("type").toString(), row.get("isBattery").toString().equals("1")))
        }
        return res
    }

}