package no.sindre.barapplication

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource

@Repository
class TestRepo(@Autowired var namedParameterJdbcTemplate: NamedParameterJdbcTemplate) {


    fun getAll() : List<String> {
        val res = emptyList<String>().toMutableList()
        val ingredientsMap = namedParameterJdbcTemplate.queryForList("SELECT NAME FROM COCKTAIL_DB.INGREDIENT", MapSqlParameterSource())
        for (row in ingredientsMap){
            res.add(row.get("name").toString())
        }
        return res
    }

   val GET_COCKTAIL_SQL = "SELECT COCKTAIL.NAME FROM COCKTAIL_DB.COCKTAIL;"

    fun get() : List<String> {

        return namedParameterJdbcTemplate.queryForList(GET_COCKTAIL_SQL, MapSqlParameterSource()).map { it.get("name").toString()}
    }
}
